import express from 'express';
import cors from 'cors';
import chokidar from 'chokidar';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateManifest, generateRessourcesIndex, generateNewsIndex } from './generators.js';
import {
  calculateModsHash,
  calculateRessourcesHash,
  calculateNewsHash,
  loadPreviousHashes,
  saveHashes,
  checkForChanges
} from './hash-utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration
const MODS_DIR = process.env.MODS_DIR || path.join(__dirname, 'mods');
const RESSOURCES_DIR = process.env.RESSOURCES_DIR || path.join(__dirname, 'ressources');
const NEWS_DIR = process.env.NEWS_DIR || path.join(__dirname, 'news');
const OUTPUT_DIR = process.env.OUTPUT_DIR || path.join(__dirname, 'generated');
const GENERATE_INTERVAL = parseInt(process.env.GENERATE_INTERVAL) || 300000; // 5 minutes

// Configuration des heures de vérification
const CHECK_TIMES = process.env.CHECK_TIMES ? process.env.CHECK_TIMES.split(',').map(t => t.trim()) : ['0:00', '6:00', '12:00', '18:00']; // Par défaut: minuit, 6h, midi, 18h
const ENABLE_PERIODIC_CHECK = process.env.ENABLE_PERIODIC_CHECK === 'true' || false;

// Cache des hashes
const HASH_CACHE_FILE = path.join(OUTPUT_DIR, '.hash-cache.json');
let previousHashes = {};

// Middleware
app.use(cors());
app.use(express.json());

// Créer les répertoires de sortie
await fs.ensureDir(OUTPUT_DIR);
await fs.ensureDir(path.join(OUTPUT_DIR, 'mods'));
await fs.ensureDir(path.join(OUTPUT_DIR, 'ressources'));
await fs.ensureDir(path.join(OUTPUT_DIR, 'news'));

// Fonction de génération complète avec détection de changements
async function generateAll(force = false) {
  console.log('🔄 Vérification des changements...');

  try {
    let hasAnyChanges = false;
    const currentHashes = {};

    // Vérifier les changements pour les mods
    if (await fs.pathExists(MODS_DIR)) {
      const modsCheck = await checkForChanges(MODS_DIR, previousHashes.mods, calculateModsHash);
      currentHashes.mods = modsCheck.currentHash;

      if (modsCheck.hasChanged || force) {
        console.log('📦 Changements détectés dans les mods, génération...');
        const modsManifest = await generateManifest(MODS_DIR);
        await fs.writeJson(path.join(OUTPUT_DIR, 'mods', 'manifest.json'), modsManifest, { spaces: 2 });
        console.log('✅ Manifest des mods généré');
        hasAnyChanges = true;
      } else {
        console.log('⏭️ Aucun changement dans les mods, ignoré');
      }
    }

    // Vérifier les changements pour les ressources
    if (await fs.pathExists(RESSOURCES_DIR)) {
      const ressourcesCheck = await checkForChanges(RESSOURCES_DIR, previousHashes.ressources, calculateRessourcesHash);
      currentHashes.ressources = ressourcesCheck.currentHash;

      if (ressourcesCheck.hasChanged || force) {
        console.log('📁 Changements détectés dans les ressources, génération...');
        const ressourcesIndex = await generateRessourcesIndex(RESSOURCES_DIR);
        await fs.writeJson(path.join(OUTPUT_DIR, 'ressources', 'index.json'), ressourcesIndex, { spaces: 2 });
        console.log('✅ Index des ressources généré');
        hasAnyChanges = true;
      } else {
        console.log('⏭️ Aucun changement dans les ressources, ignoré');
      }
    }

    // Vérifier les changements pour les actualités
    if (await fs.pathExists(NEWS_DIR)) {
      const newsCheck = await checkForChanges(NEWS_DIR, previousHashes.news, calculateNewsHash);
      currentHashes.news = newsCheck.currentHash;

      if (newsCheck.hasChanged || force) {
        console.log('📰 Changements détectés dans les actualités, génération...');
        const newsIndex = await generateNewsIndex(NEWS_DIR);
        await fs.writeJson(path.join(OUTPUT_DIR, 'news', 'news.json'), newsIndex, { spaces: 2 });
        console.log('✅ Index des actualités généré');
        hasAnyChanges = true;
      } else {
        console.log('⏭️ Aucun changement dans les actualités, ignoré');
      }
    }

    // Mettre à jour le cache des hashes
    previousHashes = currentHashes;
    await saveHashes(HASH_CACHE_FILE, currentHashes);

    if (hasAnyChanges || force) {
      console.log('🎉 Génération terminée !');
    } else {
      console.log('✅ Aucun changement détecté, génération ignorée');
    }

    return hasAnyChanges;

  } catch (error) {
    console.error('❌ Erreur lors de la génération:', error);
    throw error;
  }
}

// Routes API
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/status', async (req, res) => {
  const status = {
    mods: {
      directory: MODS_DIR,
      exists: await fs.pathExists(MODS_DIR),
      manifestExists: await fs.pathExists(path.join(OUTPUT_DIR, 'mods', 'manifest.json'))
    },
    ressources: {
      directory: RESSOURCES_DIR,
      exists: await fs.pathExists(RESSOURCES_DIR),
      indexExists: await fs.pathExists(path.join(OUTPUT_DIR, 'ressources', 'index.json'))
    },
    news: {
      directory: NEWS_DIR,
      exists: await fs.pathExists(NEWS_DIR),
      indexExists: await fs.pathExists(path.join(OUTPUT_DIR, 'news', 'news.json'))
    },
    output: OUTPUT_DIR,
    lastGenerated: new Date().toISOString()
  };
  res.json(status);
});

app.post('/generate', async (req, res) => {
  try {
    const force = req.body.force || false;
    const hasChanges = await generateAll(force);

    res.json({
      message: hasChanges ? 'Manifests générés avec succès' : 'Aucun changement détecté',
      hasChanges,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/force-generate', async (req, res) => {
  try {
    await generateAll(true);
    res.json({ message: 'Manifests forcés générés avec succès', timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Configuration du watcher de fichiers
function setupFileWatcher() {
  console.log('👀 Configuration du watcher de fichiers...');

  const watcher = chokidar.watch([MODS_DIR, RESSOURCES_DIR, NEWS_DIR], {
    ignored: /(^|[\/\\])\../, // ignorer les fichiers cachés
    persistent: true,
    ignoreInitial: true
  });

  watcher.on('add', (filePath) => {
    console.log(`📁 Nouveau fichier détecté: ${filePath}`);
    generateAll();
  });

  watcher.on('change', (filePath) => {
    console.log(`📝 Fichier modifié: ${filePath}`);
    generateAll();
  });

  watcher.on('unlink', (filePath) => {
    console.log(`🗑️ Fichier supprimé: ${filePath}`);
    generateAll();
  });

  watcher.on('error', (error) => {
    console.error('❌ Erreur du watcher:', error);
  });
}

// Fonction pour vérifier si on est dans une heure de vérification
function isCheckTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour}:${currentMinute.toString().padStart(2, '0')}`;

  // Vérifier si l'heure actuelle correspond à une des heures configurées
  return CHECK_TIMES.some(time => {
    const [hour, minute] = time.split(':').map(Number);
    return currentHour === hour && currentMinute === minute;
  });
}

// Génération périodique avec vérification des heures
function setupPeriodicGeneration() {
  if (!ENABLE_PERIODIC_CHECK) {
    console.log('⏰ Génération périodique désactivée');
    return;
  }

  console.log(`⏰ Configuration de la génération périodique (${GENERATE_INTERVAL}ms)`);
  console.log(`🕐 Heures de vérification configurées: ${CHECK_TIMES.join(', ')}`);

  setInterval(() => {
    const now = new Date();
    const currentTime = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (isCheckTime()) {
      console.log(`🕐 Heure de vérification (${currentTime}) - Déclenchement de la génération`);
      generateAll();
    } else {
      console.log(`⏭️ Heure actuelle (${currentTime}) - Pas d'heure de vérification`);
    }
  }, GENERATE_INTERVAL);
}

// Démarrage du serveur
app.listen(PORT, async () => {
  console.log(`🚀 Serveur de génération de manifests démarré sur le port ${PORT}`);
  console.log(`📁 Répertoire des mods: ${MODS_DIR}`);
  console.log(`📁 Répertoire des ressources: ${RESSOURCES_DIR}`);
  console.log(`📁 Répertoire des actualités: ${NEWS_DIR}`);
  console.log(`📁 Répertoire de sortie: ${OUTPUT_DIR}`);

  // Charger les hashes précédents
  console.log('📋 Chargement du cache des hashes...');
  previousHashes = await loadPreviousHashes(HASH_CACHE_FILE);
  console.log('✅ Cache des hashes chargé');

  // Génération initiale
  await generateAll();

  // Configuration du watcher et de la génération périodique
  setupFileWatcher();
  setupPeriodicGeneration();
});

// Gestion des signaux d'arrêt
process.on('SIGTERM', () => {
  console.log('🛑 Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🛑 Arrêt du serveur...');
  process.exit(0);
});
