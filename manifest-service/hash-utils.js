import fs from 'fs-extra';
import path from 'path';
import crypto from 'crypto';

/**
 * Calcule un hash SHA256 d'un répertoire en incluant tous les fichiers pertinents
 * @param {string} directory - Répertoire à analyser
 * @param {Array} extensions - Extensions de fichiers à inclure (optionnel)
 * @returns {Promise<string>} Hash SHA256 du contenu
 */
export async function calculateDirectoryHash(directory, extensions = null) {
  if (!await fs.pathExists(directory)) {
    return null;
  }

  const hash = crypto.createHash('sha256');
  const files = [];

  // Collecter tous les fichiers pertinents
  await collectFiles(directory, '', files, extensions);

  // Trier les fichiers pour un ordre cohérent
  files.sort((a, b) => a.relativePath.localeCompare(b.relativePath));

  // Calculer le hash basé sur les métadonnées des fichiers
  for (const file of files) {
    const stats = await fs.stat(file.fullPath);

    // Inclure le chemin relatif, la taille et la date de modification
    const fileInfo = `${file.relativePath}:${stats.size}:${stats.mtime.getTime()}`;
    hash.update(fileInfo);
  }

  return hash.digest('hex');
}

/**
 * Collecte récursivement tous les fichiers d'un répertoire
 * @param {string} dir - Répertoire à parcourir
 * @param {string} relativePath - Chemin relatif actuel
 * @param {Array} files - Tableau pour stocker les fichiers trouvés
 * @param {Array} extensions - Extensions à filtrer (optionnel)
 */
async function collectFiles(dir, relativePath, files, extensions) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    // Ignorer les fichiers cachés et certains types
    if (entry.name.startsWith('.')) continue;
    if (entry.name === 'manifest.json') continue;
    if (entry.name === 'index.json') continue;
    if (entry.name === 'news.json') continue;
    if (entry.name === 'node_modules') continue;
    if (entry.name.endsWith('.js')) continue;
    if (entry.name.endsWith('.md')) continue;
    if (entry.name.endsWith('.txt')) continue;
    if (entry.name.endsWith('.log')) continue;

    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    if (entry.isDirectory()) {
      await collectFiles(fullPath, relPath, files, extensions);
    } else if (entry.isFile()) {
      // Filtrer par extensions si spécifié
      if (extensions && extensions.length > 0) {
        const hasValidExtension = extensions.some(ext => entry.name.endsWith(ext));
        if (!hasValidExtension) continue;
      }

      files.push({
        fullPath,
        relativePath: relPath.replace(/\\/g, '/') // Normaliser les séparateurs
      });
    }
  }
}

/**
 * Calcule un hash spécifique pour les mods (.pbo et .bisign)
 * @param {string} modsDir - Répertoire des mods
 * @returns {Promise<string>} Hash SHA256
 */
export async function calculateModsHash(modsDir) {
  return calculateDirectoryHash(modsDir, ['.pbo', '.bisign']);
}

/**
 * Calcule un hash spécifique pour les ressources (.dll et .ts3_plugin)
 * @param {string} ressourcesDir - Répertoire des ressources
 * @returns {Promise<string>} Hash SHA256
 */
export async function calculateRessourcesHash(ressourcesDir) {
  return calculateDirectoryHash(ressourcesDir, ['.dll', '.ts3_plugin']);
}

/**
 * Calcule un hash spécifique pour les actualités (.json)
 * @param {string} newsDir - Répertoire des actualités
 * @returns {Promise<string>} Hash SHA256
 */
export async function calculateNewsHash(newsDir) {
  return calculateDirectoryHash(newsDir, ['.json']);
}

/**
 * Charge les hashes précédents depuis un fichier de cache
 * @param {string} cacheFile - Chemin du fichier de cache
 * @returns {Promise<Object>} Objet contenant les hashes précédents
 */
export async function loadPreviousHashes(cacheFile) {
  try {
    if (await fs.pathExists(cacheFile)) {
      return await fs.readJson(cacheFile);
    }
  } catch (error) {
    console.warn('⚠️ Impossible de charger le cache des hashes:', error.message);
  }

  return {
    mods: null,
    ressources: null,
    news: null,
    lastUpdated: null
  };
}

/**
 * Sauvegarde les hashes actuels dans un fichier de cache
 * @param {string} cacheFile - Chemin du fichier de cache
 * @param {Object} hashes - Objet contenant les hashes actuels
 */
export async function saveHashes(cacheFile, hashes) {
  try {
    await fs.ensureDir(path.dirname(cacheFile));
    await fs.writeJson(cacheFile, {
      ...hashes,
      lastUpdated: new Date().toISOString()
    }, { spaces: 2 });
  } catch (error) {
    console.warn('⚠️ Impossible de sauvegarder le cache des hashes:', error.message);
  }
}

/**
 * Vérifie si le contenu d'un répertoire a changé
 * @param {string} directory - Répertoire à vérifier
 * @param {string} previousHash - Hash précédent
 * @param {Function} hashCalculator - Fonction pour calculer le hash
 * @returns {Promise<Object>} Résultat de la vérification
 */
export async function checkForChanges(directory, previousHash, hashCalculator) {
  const currentHash = await hashCalculator(directory);

  return {
    hasChanged: currentHash !== previousHash,
    currentHash,
    previousHash
  };
}
