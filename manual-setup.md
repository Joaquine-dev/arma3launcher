# Configuration manuelle du serveur Caddy pour AR3URL Launcher

## Solution rapide pour votre erreur actuelle

Votre erreur vient du fait que le package `fs-extra` n'est pas installé. Voici comment résoudre rapidement :

```bash
# Dans /usr/share/caddy/mods/
npm init -y
npm install fs-extra
node setup-server-manifest.js .
```

## Installation complète recommandée

### 1. Préparation des fichiers
Copiez ces fichiers sur votre serveur :
- `server-package.json` → `/usr/share/caddy/mods/package.json`
- `setup-server-manifest.js` → `/usr/share/caddy/mods/setup-server-manifest.js`
- `install-server.sh` → `/tmp/install-server.sh`

### 2. Installation automatique
```bash
chmod +x /tmp/install-server.sh
sudo /tmp/install-server.sh
```

### 3. Configuration manuelle

#### A. Installation des dépendances Node.js
```bash
cd /usr/share/caddy/mods
npm install
```

#### B. Configuration Caddy (/etc/caddy/Caddyfile)
```caddy
your-domain.com {
    root * /usr/share/caddy/mods

    header {
        Access-Control-Allow-Origin *
        Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Access-Control-Allow-Headers "Content-Type"
    }

    @options method OPTIONS
    respond @options 204

            @mods path *.pbo *.bisign
    handle @mods {
        header Content-Type application/octet-stream
        file_server
    }

    @blocked path * !*.pbo !*.bisign !*/manifest.json
    handle @blocked {
        respond "Accès interdit" 403
    }

    @manifest path /manifest.json
    handle @manifest {
        header Content-Type application/json
        header Cache-Control "no-cache, must-revalidate"
        file_server
    }

    file_server
}
```

#### C. Génération du manifest
```bash
cd /usr/share/caddy/mods
# Copiez vos fichiers .pbo ici
npm run generate-manifest
```

#### D. Redémarrage de Caddy
```bash
sudo systemctl restart caddy
```

## Structure finale
```
/usr/share/caddy/mods/
├── package.json
├── setup-server-manifest.js
├── manifest.json (généré)
├── node_modules/ (créé par npm install)
├── mod1.pbo
├── mod2.pbo
└── ...autres fichiers de mods
```

## URLs d'accès
- Mods : `https://your-domain.com/mod1.pbo`
- Manifest : `https://your-domain.com/manifest.json`
