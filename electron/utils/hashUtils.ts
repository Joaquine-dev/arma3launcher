import crypto from "node:crypto";
import fs from "fs-extra";

/**
 * Calcule le hash SHA-256 d'un fichier de manière optimisée avec streaming
 * @param filePath Chemin du fichier à hasher
 * @param highWaterMark Taille des chunks (par défaut 64KB)
 * @returns Hash SHA-256 en hexadécimal
 */
export async function calculateFileSha256(
  filePath: string,
  highWaterMark = 64 * 1024
): Promise<string> {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath, { highWaterMark });

    stream.on("data", (data) => hash.update(data));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}
