export const config = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Unreallife launcher",
    shortName: "Unrealife Launcher",
    version: "1.0.8",
    description: "Launcher pour serveur Unrealife Roleplay",
    author: "Équipe Unrealife",
    website: "https://unreallife.com",
    discord: "https://discord.gg/Arma",
    github: "https://github.com/Joaquinee/AR3URL-Launcher"
  },

  servers: [
    {
      id: "1",
      name: "Arma 3 Roleplay Server",
      shortName: "Arma RP",
      description: "Serveur Roleplay français • Map Altis",
      ip: "188.165.200.136",
      port: 2302,
      maxSlots: 64,
      status: "production",
      tags: ["Roleplay", "Français", "Semi-RP"],
      whitelist: false,
      isDefault: true
    }
  ],



  // 🖥️ Informations serveur (selon votre server)
  server: {
    name: "Arma 3 Roleplay Server",
    shortName: "Arma RP",
    description: "Serveur Roleplay français • Map Altis",
    ip: "188.165.200.136",
    port: 2302,        // Port de jeu
    queryPort: 2303,   // Port Steam Query
    steamPort: 2304,   // Port Steam
    maxSlots: 64,
    map: "Altis",
    gameMode: "Roleplay",
    difficulty: "Vétéran",
    perspective: "1ère/3ème personne",
    whitelist: false,
    community: "Arma Community",
    website: "https://Arma.com"
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

  // 🔗 Liens utiles
  links: {
    principal: [
      {
        title: "Site Web Officiel",
        description: "Accédez au site web principal du serveur",
        url: "https://Arma.com",
        icon: "🌐"
      },
      {
        title: "Forum Communauté",
        description: "Discussions et annonces officielles",
        url: "https://forum.Arma.com",
        icon: "💬"
      }
    ],
    communaute: [
      {
        title: "Discord",
        description: "Rejoignez notre serveur Discord",
        url: "https://discord.gg/Arma",
        icon: "💬"
      },
      {
        title: "Steam Group",
        description: "Groupe Steam de la communauté",
        url: "https://steamcommunity.com/groups/Arma",
        icon: "🎮"
      }
    ],
    communication: [
      {
        title: "TeamSpeak 3",
        description: "Serveur vocal pour la communication en jeu",
        url: "ts3server://ts.Arma.com",
        icon: "🎤"
      },
      {
        title: "Guide TFAR",
        description: "Guide d'utilisation de Task Force Arrowhead Radio",
        url: "https://Arma.com/guide-tfar",
        icon: "📡"
      }
    ],
    information: [
      {
        title: "Règlement",
        description: "Règles et conditions d'utilisation du serveur",
        url: "https://Arma.com/reglement",
        icon: "📋"
      },
      {
        title: "Guide Débutant",
        description: "Guide pour bien commencer sur le serveur",
        url: "https://Arma.com/guide",
        icon: "📖"
      }
    ],
    support: [
      {
        title: "Ticket Support",
        description: "Créer un ticket de support",
        url: "https://Arma.com/support",
        icon: "🎫"
      },
      {
        title: "FAQ",
        description: "Questions fréquemment posées",
        url: "https://Arma.com/faq",
        icon: "❓"
      }
    ]
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
