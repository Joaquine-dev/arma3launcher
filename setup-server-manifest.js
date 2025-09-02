#!/usr/bin/env node
/**
 * Script pour générer le manifest.json sur votre serveur HTTPS
 * À exécuter sur votre serveur dans le dossier des mods
 *
 * Usage: node setup-server-manifest.js /path/to/mods/directory
 */

import fs from "fs-extra";
import path from "node:path";
import crypto from "node:crypto";

async function calculateFileHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath, { highWaterMark: 1024 * 1024 }); // 1MB chunks
    stream.on('data', data => hash.update(data));
    stream.on('end', () => resolve(hash.digest('hex')));
    stream.on('error', reject);
  });
}

async function generateManifest(modsDirectory) {
  console.log(`📦 Génération du manifest pour: ${modsDirectory}`);

  const files = [];
  const allFiles = await fs.readdir(modsDirectory);
  let totalSize = 0;
  let processedFiles = 0;

  for (const fileName of allFiles) {
    // Ignorer les fichiers cachés, le manifest, et les dossiers système
    if (fileName.startsWith('.') ||
      fileName === 'manifest.json' ||
      fileName === 'node_modules' ||
      fileName === 'package.json' ||
      fileName === 'package-lock.json' ||
      fileName.endsWith('.js') ||
      fileName.endsWith('.md')) {
      continue;
    }

    const filePath = path.join(modsDirectory, fileName);
    const stats = await fs.stat(filePath);

    // Ne traiter que les fichiers .pbo et .bisign
    if (stats.isFile() && (fileName.endsWith('.pbo') || fileName.endsWith('.bisign'))) {
      console.log(`⏳ Processing ${fileName} (${(stats.size / 1024 / 1024).toFixed(1)} MB)...`);

      const hash = await calculateFileHash(filePath);
      files.push({
        name: fileName,
        size: stats.size,
        hash,
        lastModified: stats.mtime.getTime()
      });

      totalSize += stats.size;
      processedFiles++;

      console.log(`✅ ${processedFiles} - ${fileName}`);
    } else if (stats.isFile()) {
      console.log(`⚠️ Ignoré: ${fileName} (type non supporté)`);
    }
  }

  const manifest = {
    version: "1.0",
    timestamp: Date.now(),
    totalSize,
    files,
    deltaSupport: true
  };

  // Sauvegarder le manifest
  const manifestPath = path.join(modsDirectory, 'manifest.json');
  await fs.writeJson(manifestPath, manifest, { spaces: 2 });

  console.log(`\n🎉 Manifest généré avec succès !`);
  console.log(`📁 Fichiers: ${files.length}`);
  console.log(`💾 Taille totale: ${(totalSize / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`📄 Manifest sauvé: ${manifestPath}`);

  return manifest;
}

// Exécution du script
const modsDir = process.argv[2];
if (!modsDir) {
  console.error("❌ Usage: node setup-server-manifest.js /path/to/mods/directory");
  process.exit(1);
}

if (!fs.existsSync(modsDir)) {
  console.error(`❌ Le dossier ${modsDir} n'existe pas`);
  process.exit(1);
}

generateManifest(modsDir)
  .then(() => {
    console.log("\n🚀 Uploadez le manifest.json sur votre serveur HTTPS");
    console.log("📡 URL recommandée: https://your-server.com/mods/manifest.json");
    process.exit(0);
  })
  .catch(error => {
    console.error("❌ Erreur:", error);
    process.exit(1);
  });
