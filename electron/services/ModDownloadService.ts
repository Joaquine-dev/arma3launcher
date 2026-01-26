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

export type FileToDownload = {
  name: string;
  url: string;
  destination: string;
  size: number;
  hash?: string;
};

export type ParallelProgressInfo = {
  totalProgress: number;
  currentFile: string;
  fileProgress: number;
  downloadedBytes: number;
  totalBytes: number;
  timeRemaining: string;
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

/**
 * Télécharge plusieurs fichiers en parallèle avec un pool de workers
 * Version simplifiée et robuste
 * @param files Liste des fichiers à télécharger
 * @param concurrency Nombre de téléchargements simultanés (défaut: 3)
 * @param onProgress Callback de progression globale
 */
export async function downloadFilesInParallel(
  files: FileToDownload[],
  concurrency: number = 3,
  onProgress?: (info: ParallelProgressInfo) => void
): Promise<void> {
  if (files.length === 0) return;

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  const startTime = Date.now();

  // État partagé pour le suivi de progression
  let completedBytes = 0;
  let completedFiles = 0;
  const activeDownloads = new Map<string, number>();

  const updateProgress = (currentFileName: string) => {
    if (!onProgress) return;

    // Calculer le total téléchargé
    let totalDownloaded = completedBytes;
    for (const bytes of activeDownloads.values()) {
      totalDownloaded += bytes;
    }

    const elapsedTime = (Date.now() - startTime) / 1000;
    const downloadSpeed = totalDownloaded / Math.max(elapsedTime, 0.001);
    const remainingSize = Math.max(0, totalBytes - totalDownloaded);
    const estimatedTimeRemaining = Math.round(remainingSize / Math.max(downloadSpeed, 1));

    const minutes = Math.floor(estimatedTimeRemaining / 60);
    const seconds = Math.round(estimatedTimeRemaining % 60);
    const timeRemaining = `${minutes}m ${seconds}s`;

    const totalProgress = totalBytes > 0
      ? Math.min(100, Math.round((totalDownloaded / totalBytes) * 100))
      : 0;

    const fileBytes = activeDownloads.get(currentFileName) || 0;
    const fileInfo = files.find(f => f.name === currentFileName);
    const fileProgress = fileInfo && fileInfo.size > 0
      ? Math.min(100, Math.round((fileBytes / fileInfo.size) * 100))
      : 0;

    onProgress({
      totalProgress,
      currentFile: currentFileName,
      fileProgress,
      downloadedBytes: totalDownloaded,
      totalBytes,
      timeRemaining,
    });
  };

  // Créer une fonction worker qui télécharge un fichier
  const downloadOne = async (file: FileToDownload): Promise<void> => {
    activeDownloads.set(file.name, 0);

    try {
      await downloadFileWithResume(
        file.url,
        file.destination,
        (p) => {
          activeDownloads.set(file.name, p.downloadedBytes);
          updateProgress(file.name);
        },
        file.hash
      );

      // Fichier complété
      completedBytes += file.size;
      completedFiles++;
      activeDownloads.delete(file.name);
      updateProgress(file.name);
    } catch (error) {
      activeDownloads.delete(file.name);
      throw error;
    }
  };

  // Utiliser un pool simple avec Promise.all par lots
  const errors: Error[] = [];

  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    const results = await Promise.allSettled(batch.map(f => downloadOne(f)));

    // Collecter les erreurs
    for (const result of results) {
      if (result.status === 'rejected') {
        errors.push(result.reason instanceof Error ? result.reason : new Error(String(result.reason)));
      }
    }
  }

  // Vérifier les erreurs
  if (errors.length > 0) {
    throw new Error(`${errors.length} fichier(s) ont échoué: ${errors.map(e => e.message).join(', ')}`);
  }
}
