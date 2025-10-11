export const config = {
  // 🎮 Informations du launcher et serveur
  launcher: {
    name: "Unreallife launcher",
    version: "1.0.0",
  },
  servers: [
    {
      id: "1",
      name: "Arma 3 Roleplay Server",
      ip: "91.134.62.7",
      port: 2302,
      queryPort: 2303,
      maxSlots: 64,
      isDefault: true
    }
  ],

  mods: {
    folderName: "@Arma",
    urlMods: "http://localhost:8080/mods",
    urlRessources: "http://localhost:8080/ressources",
    manifestUrl: "http://localhost:8080/mods/manifest.json",
  },

  // 📰 Configuration des nouvelles (JSON moderne)
  news: {
    url: "http://localhost:8080/news/news.json",
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
