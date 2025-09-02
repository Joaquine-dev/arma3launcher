#!/bin/bash

# Script d'installation pour le serveur de mods AR3URL
# Usage: sudo ./install-server.sh

set -e

echo "🚀 Installation du serveur de mods AR3URL..."

# Vérification des permissions root
if [ "$EUID" -ne 0 ]; then
  echo "❌ Ce script doit être exécuté en tant que root"
  echo "Usage: sudo ./install-server.sh"
  exit 1
fi

# Création du répertoire mods
MODS_DIR="/usr/share/caddy/mods"
echo "📁 Création du répertoire: $MODS_DIR"
mkdir -p "$MODS_DIR"

# Installation de Node.js si nécessaire
if ! command -v node &> /dev/null; then
    echo "📦 Installation de Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
    apt-get install -y nodejs
fi

# Copie des fichiers nécessaires
echo "📋 Copie des fichiers de configuration..."
cp setup-server-manifest.js "$MODS_DIR/"
cp server-package.json "$MODS_DIR/package.json"

# Installation des dépendances
echo "⬇️ Installation des dépendances Node.js..."
cd "$MODS_DIR"
npm install

# Configuration des permissions
echo "🔒 Configuration des permissions..."
chown -R www-data:www-data "$MODS_DIR"
chmod 755 "$MODS_DIR"
chmod 644 "$MODS_DIR"/*

# Configuration Caddy
CADDY_CONFIG="/etc/caddy/Caddyfile"
if [ -f "$CADDY_CONFIG" ]; then
    echo "⚙️ Sauvegarde de la configuration Caddy existante..."
    cp "$CADDY_CONFIG" "$CADDY_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Création de la configuration Caddy
cat > "$CADDY_CONFIG" << 'EOF'
# Configuration pour serveur de mods AR3URL
your-domain.com {
    # Répertoire racine pour les mods
    root * /usr/share/caddy/mods

    # Configuration CORS pour permettre les requêtes cross-origin
    header {
        Access-Control-Allow-Origin *
        Access-Control-Allow-Methods "GET, POST, OPTIONS"
        Access-Control-Allow-Headers "Content-Type"
    }

    # Gestion des requêtes OPTIONS (preflight)
    @options method OPTIONS
    respond @options 204

            # Configuration pour les fichiers PBO et BISIGN
    @mods path *.pbo *.bisign
    handle @mods {
        header Content-Type application/octet-stream
        header Content-Disposition "attachment"
        file_server {
            precompressed gzip br
        }
    }

    # Configuration pour le manifest.json uniquement
    @manifest path /manifest.json
    handle @manifest {
        header Content-Type application/json
        header Cache-Control "no-cache, must-revalidate"
        file_server
    }

    # Bloquer TOUS les autres fichiers (autoriser seulement .pbo, .bisign et manifest.json)
    @blocked path * !*.pbo !*.bisign !*/manifest.json
    handle @blocked {
        respond "Accès interdit" 403
    }

    # Configuration par défaut
    file_server {
        index manifest.json
    }

    # Logs
    log {
        output file /var/log/caddy/mods.log {
            roll_size 100mb
            roll_keep 5
        }
        format json
    }
}
EOF

echo "📝 Configuration Caddy créée. N'oubliez pas de remplacer 'your-domain.com' par votre domaine !"

# Redémarrage de Caddy
echo "🔄 Redémarrage de Caddy..."
systemctl restart caddy
systemctl enable caddy

echo ""
echo "✅ Installation terminée !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Modifiez /etc/caddy/Caddyfile et remplacez 'your-domain.com' par votre domaine"
echo "2. Copiez vos fichiers de mods dans $MODS_DIR"
echo "3. Générez le manifest : cd $MODS_DIR && npm run generate-manifest"
echo "4. Redémarrez Caddy : sudo systemctl restart caddy"
echo ""
echo "🌐 Vos mods seront accessibles à : https://your-domain.com/mods/"
echo "📄 Le manifest sera à : https://your-domain.com/mods/manifest.json"
