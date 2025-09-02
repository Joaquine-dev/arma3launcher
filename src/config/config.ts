export const config = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Arma 3 Launcher",
    shortName: "A3 Launcher",
    version: "5.0.0",
    description: "Launcher pour serveur Arma 3 Roleplay",
    author: "Équipe Arma 3",
    website: "https://a3url.com",
    discord: "https://discord.gg/a3url",
    github: "https://github.com/Joaquinee/AR3URL-Launcher"
  },

  // 🖥️ Informations serveur (selon votre LGSM)
  server: {
    name: "Arma 3 Roleplay Server",
    shortName: "A3URL RP",
    description: "Serveur Roleplay français • Map Altis",
    ip: "82.29.170.30",
    port: 2302,        // Port de jeu
    queryPort: 2303,   // Port Steam Query
    steamPort: 2304,   // Port Steam
    maxSlots: 64,
    map: "Altis",
    gameMode: "Roleplay",
    difficulty: "Vétéran",
    perspective: "1ère/3ème personne",
    whitelist: false,
    community: "A3URL Community",
    website: "https://a3url.com"
  },

  // 📁 Configuration des mods
  mods: {
    folderName: "@A3URL",
    urlMods: "http://82.29.170.30/mods",
    urlRessources: "https://your-server.com/resources",
    manifestUrl: "http://82.29.170.30/mods/manifest.json",
  },

  // 🔌 Configuration RCON (DÉSACTIVÉ - ports non accessibles)
  rcon: {
    enabled: true, // ❌ Ports 2303/2304 bloqués par firewall/réseau
    host: "82.29.170.30",
    port: 2303,
    password: "votre-mot-de-passe-rcon",
    timeout: 5000,
    reconnectInterval: 30000,
  },

  // 🌐 Steam Query (DÉSACTIVÉ - timeout)
  steamQuery: {
    enabled: false, // ❌ Port Query 2303 non accessible depuis l'extérieur
    refreshInterval: 15000,
    timeout: 5000,
  },

  // 📰 Configuration des nouvelles (JSON moderne)
  news: {
    url: "", // ⚠️ Vide = actualités désactivées temporairement
    refreshInterval: 300000, // 5 minutes
  },

  // 🔧 Mode maintenance
  maintenance: false,

  // ⚡ Optimisations
  performance: {
    chunkSize: 1024 * 1024, // 1MB chunks pour téléchargement
    concurrentDownloads: 3, // 3 téléchargements simultanés
    quickCheckSampleSize: 5, // Vérifier seulement 5 fichiers au démarrage
  },

  // 🎨 Personnalisation UI
  ui: {
    primaryColor: "#ff6b35", // Orange Arma 3
    secondaryColor: "#dc2626", // Rouge Arma 3
    accentColor: "#10b981", // Vert succès
    particleCount: 30,
    animationDuration: 300,
  }
};
