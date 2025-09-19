# Utiliser Node.js 18 Alpine pour un conteneur léger
FROM node:18-alpine

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
  bash \
  curl \
  && rm -rf /var/cache/apk/*

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nodejs -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --only=production && \
  npm cache clean --force

# Copier le code source
COPY . .

# Créer les répertoires nécessaires
RUN mkdir -p /app/data /app/generated && \
  chown -R nodejs:nodejs /app

# Changer vers l'utilisateur non-root
USER nodejs

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV WATCH_DIR=/app/data
ENV OUTPUT_DIR=/app/generated
ENV MANIFEST_GENERATOR_URL=http://manifest-generator:3000

# Commande de démarrage
CMD ["node", "watcher.js"]
