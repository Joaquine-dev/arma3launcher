export const config = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Arma 3 Launcher",
    shortName: "A3 Launcher",
    version: "5.0.0",
    description: "Launcher pour serveur Arma 3 Roleplay",
    author: "Équipe Arma 3",
    website: "https://Arma.com",
    discord: "https://discord.gg/Arma",
    github: "https://github.com/Joaquinee/AR3URL-Launcher"
  },

  // 🖥️ Configuration des serveurs
  servers: [
    {
      id: "unreallife-main",
      name: "UnRealLife • Serveur Principal",
      shortName: "UnRealLife",
      description: "Serveur Roleplay français • Map Altis • Semi-RP",
      ip: "188.165.200.136",
      port: 2302,
      queryPort: 2303,
      steamPort: 2304,
      maxSlots: 64,
      map: "Altis",
      gameMode: "Roleplay",
      difficulty: "Vétéran",
      perspective: "1ère/3ème personne",
      whitelist: false,
      community: "UnRealLife Community",
      website: "https://unreallife.fr",
      isDefault: true,
      status: "RolePLay", // production, beta, maintenance
      tags: ["Semi-RP", "Français", "AltisLife"]
    },
  ],

  // 🖥️ Serveur par défaut (pour compatibilité)
  server: {
    name: "UnRealLife • Serveur Principal",
    shortName: "UnRealLife",
    description: "Serveur Roleplay français • Map Altis • Semi-RP",
    ip: "188.165.200.136",
    port: 2302,
    queryPort: 2303,
    steamPort: 2304,
    maxSlots: 64,
    map: "Altis",
    gameMode: "Roleplay",
    difficulty: "Vétéran",
    perspective: "1ère/3ème personne",
    whitelist: false,
    community: "UnRealLife Community",
    website: "https://unreallife.fr"
  },

  // 📁 Configuration des mods
  mods: {
    folderName: "@Arma",
    urlMods: "http://82.29.170.30/mods",
    urlRessources: "http://82.29.170.30/ressources",
    manifestUrl: "http://82.29.170.30/mods/manifest.json",
  },

  // 🌐 Steam Query (DÉSACTIVÉ - timeout)
  steamQuery: {
    enabled: true, // ❌ Port Query 2303 non accessible depuis l'extérieur
    refreshInterval: 30000,
    timeout: 12000,
  },

  // 📰 Configuration des nouvelles (JSON moderne)
  news: {
    url: "http://82.29.170.30/news/news.json", // ⚠️ Vide = actualités désactivées temporairement
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
  },

  // 🔗 Liens utiles
  // Pour ajouter/modifier des liens, ajoutez-les dans les catégories appropriées
  // Catégories disponibles: principal, communaute, communication, vote, information, support
  // Chaque lien doit avoir: title, description, url, icon (emoji)
  links: {
    principal: [
      {
        title: 'Site Principal',
        description: 'Site officiel du serveur UnRealLife',
        url: 'https://unreallife.fr/',
        icon: '🌐'
      },
      {
        title: 'Intranet',
        description: 'Accès à l\'intranet du serveur',
        url: 'https://unreallife.fr/intranet',
        icon: '🔐'
      }
    ],
    communaute: [
      {
        title: 'Discord',
        description: 'Rejoignez notre communauté Discord',
        url: 'https://discord.gg/Arma',
        icon: '💬'
      }
    ],
    communication: [
      {
        title: 'TeamSpeak 3',
        description: 'Serveur vocal pour la communication en jeu',
        url: 'ts3server://ts.unreallife.fr',
        icon: '🎤'
      }
    ],
    vote: [
      {
        title: 'Vote Serveur #1',
        description: 'Votez pour le serveur sur ArmaList',
        url: 'https://www.armalist.com/server/12345',
        icon: '⭐'
      },
    ],
    information: [
      {
        title: 'Règlement',
        description: 'Consultez le règlement du serveur',
        url: 'https://unreallife.fr/reglement',
        icon: '📋'
      }
    ],
    support: [
      {
        title: 'Support',
        description: 'Besoin d\'aide ? Contactez le support',
        url: 'https://unreallife.fr/support',
        icon: '🆘'
      }
    ]
  }
};
