import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

/**
 * Génère le manifest des mods Arma 3
 * @param {string} modsDir - Répertoire contenant les mods
 * @returns {Object} Manifest JSON
 */
export async function generateManifest(modsDir) {
  console.log(`📦 Génération du manifest pour: ${modsDir}`);

  const files = [];
  let totalSize = 0;
  let processed = 0;

  try {
    const entries = await fs.readdir(modsDir, { withFileTypes: true });

    for (const entry of entries) {
      // Ignorer les fichiers cachés et certains types
      if (entry.name.startsWith('.')) continue;
      if (entry.name === 'manifest.json') continue;
      if (entry.name === 'node_modules') continue;
      if (entry.name.endsWith('.js')) continue;
      if (entry.name.endsWith('.md')) continue;
      if (entry.name.endsWith('.txt')) continue;
      if (entry.name.endsWith('.log')) continue;

      const filePath = path.join(modsDir, entry.name);

      if (entry.isFile()) {
        // Traiter seulement les fichiers .pbo et .bisign
        if (entry.name.endsWith('.pbo') || entry.name.endsWith('.bisign')) {
          const stats = await fs.stat(filePath);
          const size = stats.size;
          const mb = (size / 1024 / 1024).toFixed(1);

          console.log(`⏳ Traitement ${entry.name} (${mb} MB)...`);

          // Calculer le hash SHA256
          const fileBuffer = await fs.readFile(filePath);
          const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

          // Timestamp en millisecondes
          const lastModified = stats.mtime.getTime();

          files.push({
            name: entry.name,
            size: size,
            hash: hash,
            lastModified: lastModified
          });

          totalSize += size;
          processed++;
          console.log(`✅ ${processed} - ${entry.name}`);
        } else {
          console.log(`⚠️ Ignoré: ${entry.name} (type non supporté)`);
        }
      }
    }

    // Créer le manifest
    const manifest = {
      version: "1.0",
      timestamp: Date.now(),
      totalSize: totalSize,
      files: files,
      deltaSupport: true
    };

    const gb = (totalSize / 1024 / 1024 / 1024).toFixed(2);
    console.log(`🎉 Manifest des mods généré: ${processed} fichiers, ${gb} GB`);

    return manifest;

  } catch (error) {
    console.error('❌ Erreur lors de la génération du manifest des mods:', error);
    throw error;
  }
}

/**
 * Génère l'index des ressources (DLL, plugins, etc.)
 * @param {string} ressourcesDir - Répertoire contenant les ressources
 * @returns {Array} Index JSON des ressources
 */
export async function generateRessourcesIndex(ressourcesDir) {
  console.log(`📁 Génération de l'index des ressources pour: ${ressourcesDir}`);

  const ressources = [];
  let processed = 0;

  try {
    // Parcourir récursivement le répertoire
    const walkDir = async (dir, relativePath = '') => {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativePath, entry.name);

        if (entry.isDirectory()) {
          await walkDir(fullPath, relPath);
        } else if (entry.isFile()) {
          // Traiter seulement les fichiers .dll et .ts3_plugin
          if (entry.name.endsWith('.dll') || entry.name.endsWith('.ts3_plugin')) {
            const stats = await fs.stat(fullPath);
            const size = stats.size;

            console.log(`⏳ Traitement ressource ${relPath}...`);

            // Calculer le hash SHA256
            const fileBuffer = await fs.readFile(fullPath);
            const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

            ressources.push({
              name: relPath.replace(/\\/g, '/'), // Normaliser les séparateurs
              hash: hash,
              size: size
            });

            processed++;
            console.log(`✅ ${processed} - ${relPath}`);
          }
        }
      }
    };

    await walkDir(ressourcesDir);

    console.log(`🎉 Index des ressources généré: ${processed} fichiers`);
    return ressources;

  } catch (error) {
    console.error('❌ Erreur lors de la génération de l\'index des ressources:', error);
    throw error;
  }
}

/**
 * Génère l'index des actualités
 * @param {string} newsDir - Répertoire contenant les actualités
 * @returns {Array} Index JSON des actualités
 */
export async function generateNewsIndex(newsDir) {
  console.log(`📰 Génération de l'index des actualités pour: ${newsDir}`);

  const news = [];
  let processed = 0;

  try {
    const entries = await fs.readdir(newsDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.json')) {
        const filePath = path.join(newsDir, entry.name);

        console.log(`⏳ Traitement actualité ${entry.name}...`);

        try {
          const newsData = await fs.readJson(filePath);

          // Ajouter des métadonnées si elles n'existent pas
          if (!newsData.id) {
            newsData.id = path.parse(entry.name).name;
          }
          if (!newsData.timestamp) {
            const stats = await fs.stat(filePath);
            newsData.timestamp = stats.mtime.getTime();
          }

          news.push(newsData);
          processed++;
          console.log(`✅ ${processed} - ${entry.name}`);

        } catch (parseError) {
          console.warn(`⚠️ Impossible de parser ${entry.name}:`, parseError.message);
        }
      }
    }

    // Trier par timestamp décroissant
    news.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    console.log(`🎉 Index des actualités généré: ${processed} articles`);
    return news;

  } catch (error) {
    console.error('❌ Erreur lors de la génération de l\'index des actualités: ', error);
    throw error;
  }
}
