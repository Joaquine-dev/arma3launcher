import fs from "fs-extra";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { calculateFileSha256 } from "../utils/hashUtils";

export type ProgressInfo = {
  downloadedBytes: number;
  totalBytes: number;
  percent: number;
  fileName?: string;
};

export async function downloadFileWithResume(
  url: string,
  destinationPath: string,
  onProgress?: (p: ProgressInfo) => void,
  expectedSha256?: string,
  maxRetries = 3
): Promise<void> {
  const tempPath = `${destinationPath}.partial`;

  await fs.ensureDir(path.dirname(destinationPath));

  let attempt = 0;
  let lastError: Error | null = null;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const existingSize = (await fs.pathExists(tempPath))
        ? (await fs.stat(tempPath)).size
        : 0;

      const headers: Record<string, string> = {};
      if (existingSize > 0) {
        headers["Range"] = `bytes=${existingSize}-`;
        console.log(`📥 Reprise du téléchargement à ${existingSize} bytes`);
      }

      const response = await fetch(url, { headers });
      if (!response.ok && response.status !== 206) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const isPartial = response.status === 206;
      const contentLengthHeader = response.headers.get("content-length") || "0";
      const receivedLength = parseInt(contentLengthHeader, 10) || 0;
      const totalBytes = isPartial ? existingSize + receivedLength : receivedLength;

      const fileHandle = await fs.open(tempPath, isPartial ? "a" : "w");
      try {
        const reader = response.body?.getReader();
        if (!reader) throw new Error("No readable stream from response.body");

        let downloadedBytes = existingSize;
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            await fs.write(fileHandle, Buffer.from(value));
            downloadedBytes += value.length;
            if (onProgress && totalBytes > 0) {
              onProgress({
                downloadedBytes,
                totalBytes,
                percent: Math.max(0, Math.min(100, (downloadedBytes / totalBytes) * 100)),
              });
            }
          }
        }
      } finally {
        await fs.close(fileHandle);
      }

      // Vérification d'intégrité si fournie
      if (expectedSha256) {
        const computed = await calculateFileSha256(tempPath);
        if (computed.toLowerCase() !== expectedSha256.toLowerCase()) {
          // Mauvais hash, on supprime le fichier partiel et on relance
          console.warn(`⚠️ Hash mismatch pour ${path.basename(destinationPath)}, nouvelle tentative...`);
          await fs.remove(tempPath);
          throw new Error("SHA256 mismatch");
        }
      }

      await fs.move(tempPath, destinationPath, { overwrite: true });
      console.log(`✅ Téléchargé: ${path.basename(destinationPath)}`);
      return;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      attempt += 1;

      if (attempt >= maxRetries) {
        console.error(`❌ Échec après ${maxRetries} tentatives: ${lastError.message}`);
        // Nettoyer le fichier partiel en cas d'échec définitif
        if (await fs.pathExists(tempPath)) {
          await fs.remove(tempPath);
        }
        throw new Error(`Échec du téléchargement de ${path.basename(destinationPath)}: ${lastError.message}`);
      }

      // Backoff exponentiel avec jitter
      const backoffTime = 500 * attempt + Math.random() * 500;
      console.warn(`⚠️ Tentative ${attempt}/${maxRetries} échouée, nouvelle tentative dans ${Math.round(backoffTime)}ms...`);
      await delay(backoffTime);
    }
  }
}

// Note: Fonction downloadManyFiles supprimée car jamais utilisée
// La logique de téléchargement séquentiel dans ipcHandler.ts est plus robuste
