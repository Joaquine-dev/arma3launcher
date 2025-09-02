# 🎮 A3URL Launcher - Serveur Roleplay Arma 3

Un launcher moderne et optimisé pour votre serveur Roleplay Arma 3 avec synchronisation intelligente des mods.

## 🚀 Installation et Configuration

### 📋 Prérequis
- Node.js 18+
- pnpm (gestionnaire de paquets)
- Serveur HTTPS pour héberger les mods

### ⚡ Installation rapide
```bash
# Cloner le projet
git clone https://github.com/Joaquinee/AR3URL-Launcher.git
cd AR3URL-Launcher

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev

# Build pour production
pnpm build
```

## ⚙️ Configuration Serveur

### 1. 📁 Structure du serveur HTTPS
```
https://your-server.com/mods/
├── manifest.json          (5KB - ESSENTIEL!)
├── @CBA_A3.pbo           (45MB)
├── @ace.pbo              (120MB)
├── @rhsusf.pbo           (2.1GB)
├── @rhsafrf.pbo          (1.8GB)
└── @a3url_custom.pbo     (350MB)

https://your-server.com/resources/
├── task_force_radio.dll
├── custom_addon.cpp
└── server_textures.paa
```

### 2. 🔧 Configuration du launcher

**Éditez `src/config/config.ts` :**
```typescript
export const config = {
  // 🎮 Informations du launcher (PERSONNALISEZ TOUT)
  launcher: {
    name: "Votre Launcher",                    // ⚠️ CHANGEZ ÇA
    shortName: "Votre RP",                     // ⚠️ CHANGEZ ÇA
    description: "Launcher pour votre serveur", // ⚠️ CHANGEZ ÇA
    author: "Votre équipe",                    // ⚠️ CHANGEZ ÇA
    website: "https://votre-site.com",        // ⚠️ CHANGEZ ÇA
  },

  // 🖥️ Informations serveur (PERSONNALISEZ TOUT)
  server: {
    name: "Votre Serveur Roleplay",           // ⚠️ CHANGEZ ÇA
    shortName: "Votre RP",                    // ⚠️ CHANGEZ ÇA
    ip: "votre-serveur.com",                  // ⚠️ CHANGEZ ÇA
    port: 2302,                               // ⚠️ CHANGEZ ÇA
    maxSlots: 64,                             // ⚠️ CHANGEZ ÇA
  },

  // 📁 Configuration des mods (PERSONNALISEZ)
  mods: {
    folderName: "@VotreServeur",              // ⚠️ CHANGEZ ÇA
    urlMods: "https://your-server.com/mods",  // ⚠️ CHANGEZ ÇA
    manifestUrl: "https://your-server.com/mods/manifest.json", // ⚠️ CHANGEZ ÇA
  },

  // 🔌 Configuration RCON (PERSONNALISEZ)
  rcon: {
    enabled: true,                            // ⚠️ ACTIVEZ/DÉSACTIVEZ
    host: "your-server.com",                  // ⚠️ CHANGEZ ÇA
    password: "your-rcon-password",           // ⚠️ CHANGEZ ÇA
  },
}
```

### 3. 📊 Génération du manifest (OBLIGATOIRE)

**Sur votre serveur, exécutez :**
```bash
# Copier le script sur votre serveur
scp setup-server-manifest.js user@your-server.com:/path/to/

# Sur le serveur
cd /path/to/your/mods/directory
node setup-server-manifest.js .

# Upload du manifest.json généré
# Le fichier manifest.json DOIT être accessible via HTTPS
```

**⚠️ IMPORTANT :** Régénérez le manifest à chaque modification des mods !

## 🔄 Workflow de Mise à Jour des Mods

### 📝 Checklist à chaque update :
- [ ] 1. Modifier/Ajouter les fichiers .pbo sur le serveur
- [ ] 2. **OBLIGATOIRE** : Régénérer le manifest.json
- [ ] 3. Vérifier que manifest.json est accessible via HTTPS
- [ ] 4. Tester avec le launcher

### 🤖 Script automatique recommandé :
```bash
#!/bin/bash
# update-mods.sh - À exécuter après chaque modification

cd /path/to/your/mods/
echo "🔄 Génération du nouveau manifest..."
node setup-server-manifest.js .

echo "📡 Upload du manifest..."
# Votre méthode d'upload (rsync, scp, etc.)

echo "✅ Mods mis à jour !"
```

## 🏗️ Build et Distribution

### 📦 Build de production
```bash
# Build de développement (credentials en clair)
pnpm build:dev

# Build de production (credentials chiffrés automatiquement)
pnpm build

# Build avec publication GitHub (credentials chiffrés)
pnpm release
```

### 🔐 Sécurité des Credentials

#### **🔒 Chiffrement Automatique**
- ✅ **Développement** : Credentials en clair pour debug
- ✅ **Production** : Credentials chiffrés automatiquement
- ✅ **Clé unique** : Basée sur app + machine + version
- ✅ **Algorithme** : AES-256-GCM (standard militaire)

#### **🛡️ Protection RCON**
```bash
# Avant build (config.ts)
rcon: {
  password: "mon-super-password"  // ⚠️ En clair
}

# Après build (dans l'executable)
rcon: {
  password: "a1b2c3d4e5f6..."     // ✅ Chiffré
}
```

#### **⚙️ Commandes Utiles**
```bash
# Chiffrer manuellement la config
pnpm encrypt-config

# Restaurer la config originale
pnpm restore-config

# Vérifier le chiffrement
cat src/config/config.ts | grep password
```

### 🔧 Configuration electron-builder

**Dans `electron-builder.json5` :**
- `appId` : Changez pour votre serveur
- `productName` : Nom de votre launcher
- `publish.repo` : Votre repo GitHub

## 🐛 Résolution des Problèmes

### ❌ "Could not resolve config"
```bash
# Vérifiez que le fichier existe
ls src/config/config.ts

# Redémarrez le dev server
pnpm dev
```

### ❌ "Manifest fetch failed"
- ✅ Vérifiez l'URL dans `config.ts`
- ✅ Testez l'URL dans un navigateur
- ✅ Vérifiez les CORS sur votre serveur

### ❌ "Téléchargement lent"
- ✅ Augmentez `concurrentDownloads` (max 5)
- ✅ Vérifiez la bande passante serveur
- ✅ Utilisez un CDN si possible

### ❌ "Toasts en doublon"
- ✅ Déjà corrigé avec le système de debounce
- ✅ Redémarrez l'application

## 📈 Optimisations Avancées

### 🚀 Pour serveurs à fort trafic :

1. **CDN recommandé** : CloudFlare, AWS CloudFront
2. **Compression** : Activez gzip sur votre serveur
3. **HTTP/2** : Activez pour les téléchargements simultanés
4. **Cache headers** : Configurez pour les .pbo

### ⚡ Configuration serveur web optimale :
```nginx
# nginx.conf
location /mods/ {
    # Cache pour les gros fichiers
    expires 1d;
    add_header Cache-Control "public, immutable";

    # Support des Range requests (reprise)
    add_header Accept-Ranges bytes;

    # CORS si nécessaire
    add_header Access-Control-Allow-Origin "*";

    # Compression
    gzip on;
    gzip_types application/json;
}
```

## 🎯 Fonctionnalités du Launcher

### ✅ Interface utilisateur :
- 🎨 **Design Arma 3** authentique avec thème RP
- 🖱️ **Fenêtre draggable** avec contrôles personnalisés
- 📊 **Progression en temps réel** avec ETA
- 🔔 **Notifications toast** sans doublons
- 📑 **Navigation par onglets** (Accueil, Serveur, Mods, Config)

### ✅ Gestion des mods :
- ⚡ **Vérification ultra-rapide** (<5s pour 20GB)
- 🔄 **Synchronisation sélective** (seulement les différences)
- 📥 **Reprise de téléchargement** automatique
- 🔐 **Vérification d'intégrité** SHA-256
- 🗑️ **Nettoyage automatique** des anciens mods

### ✅ Auto-updates :
- 🔄 **Launcher auto-update** via GitHub Releases
- 📡 **Détection automatique** d'Arma 3 et TeamSpeak
- 🎯 **Installation TFAR** automatique

## 📅 Maintenance Régulière

### 🔄 Hebdomadaire :
- [ ] Vérifier les logs du serveur web
- [ ] Régénérer le manifest si mods modifiés
- [ ] Tester le launcher sur différents PC

### 🔄 Mensuelle :
- [ ] Mettre à jour les dépendances (`pnpm update`)
- [ ] Vérifier les performances de téléchargement
- [ ] Backup de la configuration

### 🔄 À chaque mise à jour majeure :
- [ ] Tester sur Windows/macOS/Linux
- [ ] Vérifier la compatibilité Arma 3
- [ ] Publier une nouvelle release GitHub

## 🆘 Support et Debug

### 📊 Logs utiles :
- **Launcher** : Console DevTools (F12 en dev)
- **Electron** : Logs dans la console
- **Serveur** : Access logs HTTPS

### 🔍 Debug mode :
```bash
# Activer les logs détaillés
set DEBUG=*
pnpm dev
```

### 📞 Contacts :
- **Développeur** : Joaquine
- **Repo GitHub** : https://github.com/Joaquinee/AR3URL-Launcher
- **Issues** : Utilisez GitHub Issues

## 🎖️ Crédits

- **Framework** : Electron + React + CSS
- **Icons** : Lucide React
- **Thème** : Inspiré d'Arma 3 officiel
- **Optimisations** : Manifest system custom

---

## 📰 Gestion Complète des Actualités

### 👨‍💼 Panel Admin Ultra-Intuitif

**1. Ouvrez `admin-news-panel.html` dans votre navigateur :**
```bash
# Ouvrir directement le fichier
start admin-news-panel.html
# ou
open admin-news-panel.html
```

**2. Interface moderne avec :**
- ✅ **Formulaire simple** : Titre, contenu, type, priorité
- ✅ **Types d'actualités** :
  - 📢 **Info** (informations générales)
  - 🔄 **Mise à jour** (patches, nouveautés)
  - 🎉 **Événement** (events RP, concours)
  - ⚠️ **Attention** (règles, avertissements)
  - 🔧 **Maintenance** (serveur hors ligne)
- ✅ **Priorités visuelles** :
  - 🔵 **Faible** (info standard)
  - 🟡 **Moyenne** (mise à jour normale)
  - 🟠 **Élevée** (événement important)
  - 🔴 **Critique** (maintenance urgente, affiché en rouge)

### 🔄 Workflow Admin Complet

#### **Étape 1 : Créer l'actualité**
1. **Ouvrir** `admin-news-panel.html`
2. **Remplir le formulaire** :
   ```
   Titre : "Mise à jour 2.1.0"
   Type : Mise à jour
   Priorité : Moyenne
   Contenu : "Ajout de nouveaux véhicules et amélioration des performances..."
   Auteur : "Admin A3URL"
   Tags : "update, véhicules, performance"
   ```

#### **Étape 2 : Prévisualisation**
3. **Cliquer** "👁️ Aperçu" pour voir le rendu final
4. **Vérifier** l'affichage, couleurs, badges

#### **Étape 3 : Publication**
5. **Cliquer** "📄 Générer JSON"
6. **Copier** le JSON généré
7. **Créer/Modifier** `news.json` sur votre serveur :
   ```bash
   # Sur votre serveur
   nano /var/www/html/news.json
   # Coller le JSON généré
   ```

#### **Étape 4 : Vérification**
8. **Tester l'URL** : `https://your-server.com/news.json`
9. **Redémarrer** le launcher pour voir les actualités
10. **Les joueurs** voient instantanément les nouvelles actualités

### 📋 Types d'Actualités et Usages

#### **📢 Info (Priorité Faible/Moyenne)**
```json
{
  "title": "Nouveau système économique",
  "type": "info",
  "priority": "medium",
  "content": "Le système d'économie a été revu pour plus de réalisme..."
}
```
**Usage** : Informations générales, changements de règles

#### **🔄 Mise à jour (Priorité Moyenne/Élevée)**
```json
{
  "title": "Patch 2.1.0 - Nouveaux véhicules",
  "type": "update",
  "priority": "high",
  "content": "Ajout de 15 nouveaux véhicules civils et militaires...",
  "actionButton": {
    "text": "Voir le changelog",
    "url": "https://your-server.com/changelog"
  }
}
```
**Usage** : Mises à jour serveur, nouveaux mods, patches

#### **🎉 Événement (Priorité Élevée)**
```json
{
  "title": "Event Spécial - Opération Tempête",
  "type": "event",
  "priority": "high",
  "content": "Grand événement RP ce weekend ! Inscription obligatoire...",
  "expiresAt": 1672531200000,
  "tags": ["event", "weekend", "inscription"]
}
```
**Usage** : Événements RP, concours, animations

#### **⚠️ Attention (Priorité Élevée)**
```json
{
  "title": "Nouvelle règle - Zones interdites",
  "type": "warning",
  "priority": "high",
  "content": "Attention : Les zones militaires sont désormais strictement interdites aux civils..."
}
```
**Usage** : Avertissements, nouvelles règles importantes

#### **🔧 Maintenance (Priorité Critique)**
```json
{
  "title": "Maintenance serveur - 2h",
  "type": "maintenance",
  "priority": "critical",
  "content": "Le serveur sera hors ligne de 14h à 16h pour maintenance...",
  "expiresAt": 1672531200000
}
```
**Usage** : Maintenance serveur, problèmes techniques

### 🎨 Rendu Côté Utilisateur

#### **🚨 Actualités Critiques**
- **Affichage** : Bannière rouge en haut
- **Animation** : Icône clignotante
- **Visibilité** : Impossible de rater

#### **📋 Actualités Normales**
- **Couleurs** : Badge selon le type
- **Tri** : Par priorité puis date
- **Limite** : 5 actualités affichées
- **Tags** : Catégorisation visuelle

### 🔧 Configuration Avancée

#### **Expiration automatique**
```json
{
  "title": "Event limité",
  "expiresAt": 1672531200000,  // Timestamp Unix
  "content": "Cet événement expire automatiquement"
}
```

#### **Boutons d'action**
```json
{
  "actionButton": {
    "text": "S'inscrire à l'event",
    "url": "https://your-server.com/inscription"
  }
}
```

#### **Images (optionnel)**
```json
{
  "imageUrl": "https://your-server.com/images/event.jpg"
}
```

### 📊 Bonnes Pratiques

#### **✅ À faire :**
- **Titres courts** et accrocheurs (max 50 caractères)
- **Contenu clair** et concis (max 200 caractères)
- **Tags pertinents** pour catégoriser
- **Priorité critique** seulement pour urgences
- **Dates d'expiration** pour événements temporaires

#### **❌ À éviter :**
- Trop d'actualités critiques (spam)
- Contenu trop long (illisible)
- Tags inutiles ou trop nombreux
- Actualités obsolètes sans expiration

### 🚀 Automatisation (Avancé)

#### **Script de publication automatique :**
```bash
#!/bin/bash
# publish-news.sh

# Générer depuis une base de données
curl -X POST "https://your-api.com/generate-news" > news.json

# Upload sur le serveur
scp news.json user@your-server.com:/var/www/html/

echo "✅ Actualités publiées !"
```

#### **Webhook Discord (optionnel) :**
```javascript
// Notifier Discord lors de nouvelles actualités
fetch('YOUR_DISCORD_WEBHOOK', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    content: `📢 Nouvelle actualité : ${newsTitle}`
  })
});
```

### 📄 Exemple Complet de `news.json`

**Fichier `news.json` final à uploader sur votre serveur :**
```json
{
  "version": "1.0",
  "lastUpdated": 1672531200000,
  "items": [
    {
      "id": "1672531200001",
      "title": "🔧 Maintenance Serveur - 2h",
      "content": "Le serveur sera hors ligne de 14h à 16h pour mise à jour majeure. Merci de votre patience.",
      "author": "Admin A3URL",
      "type": "maintenance",
      "priority": "critical",
      "publishedAt": 1672531200000,
      "expiresAt": 1672538400000,
      "tags": ["maintenance", "urgent"]
    },
    {
      "id": "1672444800001",
      "title": "🎉 Event Spécial - Opération Tempête",
      "content": "Grand événement RP ce weekend ! Inscription obligatoire sur le Discord. Récompenses exclusives à gagner.",
      "author": "Staff Event",
      "type": "event",
      "priority": "high",
      "publishedAt": 1672444800000,
      "expiresAt": 1672617600000,
      "tags": ["event", "weekend", "discord"],
      "actionButton": {
        "text": "S'inscrire sur Discord",
        "url": "https://discord.gg/a3url"
      }
    },
    {
      "id": "1672358400001",
      "title": "🔄 Mise à jour 2.1.0",
      "content": "Ajout de 15 nouveaux véhicules civils, amélioration des performances serveur et correction de bugs mineurs.",
      "author": "Dev Team",
      "type": "update",
      "priority": "medium",
      "publishedAt": 1672358400000,
      "tags": ["update", "véhicules", "performance"],
      "actionButton": {
        "text": "Voir le changelog",
        "url": "https://a3url.com/changelog"
      }
    },
    {
      "id": "1672272000001",
      "title": "📢 Nouvelle règle - Zones militaires",
      "content": "Les zones militaires sont désormais strictement interdites aux civils. Sanctions automatiques en cas d'intrusion.",
      "author": "Modération",
      "type": "warning",
      "priority": "high",
      "publishedAt": 1672272000000,
      "tags": ["règles", "zones", "militaire"]
    },
    {
      "id": "1672185600001",
      "title": "💰 Nouveau système économique",
      "content": "Le système d'économie a été revu pour plus de réalisme. Nouveaux jobs disponibles et salaires ajustés.",
      "author": "Game Design",
      "type": "info",
      "priority": "medium",
      "publishedAt": 1672185600000,
      "tags": ["économie", "jobs", "salaires"]
    }
  ]
}
```

### 🎯 Points Clés à Retenir

#### **🚨 Actualités Critiques :**
- **Usage** : Maintenance, problèmes urgents uniquement
- **Affichage** : Bannière rouge impossible à rater
- **Expiration** : Toujours définir une date de fin

#### **📅 Gestion des Dates :**
```javascript
// Générer un timestamp Unix (millisecondes)
const timestamp = Date.now();                    // Maintenant
const tomorrow = Date.now() + (24 * 60 * 60 * 1000); // Demain
```

#### **🏷️ Tags Recommandés :**
- **Types** : `update`, `event`, `maintenance`, `règles`
- **Catégories** : `véhicules`, `armes`, `économie`, `jobs`
- **Temporalité** : `weekend`, `urgent`, `nouveau`

#### **📱 Responsive :**
- **Mobile** : Titres courts (max 40 caractères)
- **Desktop** : Contenu détaillé possible
- **Toutes plateformes** : Émojis pour visibilité

## 📊 Infos Serveur RCON en Temps Réel

### 🔌 Configuration RCON

**Dans `src/config/config.ts` :**
```typescript
rcon: {
  enabled: true,                    // ⚠️ ACTIVEZ/DÉSACTIVEZ
  host: "your-server.com",          // ⚠️ IP de votre serveur Arma 3
  port: 2306,                       // ⚠️ Port RCON (généralement 2306)
  password: "your-rcon-password",   // ⚠️ Mot de passe RCON
  timeout: 5000,                    // Timeout connexion
  reconnectInterval: 30000,         // Reconnexion auto (30s)
}
```

### ⚙️ Configuration Serveur Arma 3

**Dans votre `server.cfg` :**
```cfg
// Activer RCON
RConPort = 2306;                    // Port RCON
RConPassword = "your-rcon-password"; // ⚠️ Même que config.ts
```

**Redémarrez votre serveur Arma 3** après modification.

### 📈 Données Récupérées Automatiquement

#### **👥 Joueurs :**
- **Nombre connecté** : Temps réel
- **Liste des noms** : Qui est en ligne
- **Slots max** : Configuration serveur

#### **🖥️ Performance Serveur :**
- **FPS serveur** : Performance temps réel
- **Ping launcher** : Latence de connexion
- **Uptime** : Temps de fonctionnement

#### **🌍 Informations Serveur :**
- **Nom du serveur** : Récupéré via RCON
- **Map actuelle** : Mission en cours
- **Mode de jeu** : Type de session

### 🔄 Mise à Jour Automatique

**Le launcher met à jour les infos toutes les 30 secondes :**
- ✅ **Connexion automatique** au démarrage
- ✅ **Reconnexion** si perte de connexion
- ✅ **Fallback** vers config si RCON indisponible
- ✅ **Interface responsive** avec animations

### 🐛 Dépannage RCON

#### **❌ "RCON non connecté" :**
1. **Vérifiez** que RCON est activé dans `server.cfg`
2. **Vérifiez** l'IP et port dans `config.ts`
3. **Vérifiez** le mot de passe RCON
4. **Testez** manuellement : `telnet your-server.com 2306`

#### **❌ "Connexion refusée" :**
- ✅ **Firewall** : Ouvrez le port 2306
- ✅ **IP** : Utilisez l'IP publique, pas localhost
- ✅ **Serveur** : Vérifiez qu'Arma 3 server tourne

#### **❌ "Infos incorrectes" :**
- ✅ **Redémarrez** le launcher
- ✅ **Vérifiez** les logs Electron (F12 en dev)
- ✅ **Testez** avec `execute-rcon-command` dans l'interface

## ⚠️ CHECKLIST AVANT PRODUCTION

### 🔧 Configuration obligatoire :
- [ ] ✅ **Launcher info** : nom, description, auteur dans `config.ts`
- [ ] ✅ **Serveur info** : nom, IP, port, slots dans `config.ts`
- [ ] ✅ **URLs mods** : urlMods, manifestUrl dans `config.ts`
- [ ] ✅ **RCON** : host, port, password dans `config.ts`
- [ ] ✅ **News URL** : news.url dans `config.ts`

### 📁 Fichiers serveur obligatoires :
- [ ] ✅ `manifest.json` généré et accessible
- [ ] ✅ `news.json` créé avec panel admin
- [ ] ✅ Fichiers `.pbo` uploadés
- [ ] ✅ RCON activé sur serveur Arma 3

### 🧪 Tests obligatoires :
- [ ] ✅ Test complet de synchronisation
- [ ] ✅ Test RCON (infos temps réel)
- [ ] ✅ Test actualités (affichage + panel admin)
- [ ] ✅ Build de production testé

**🎮 Votre launcher personnalisé est prêt !**
