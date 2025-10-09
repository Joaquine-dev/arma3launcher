# Utiliser Node.js 18 Alpine pour un conteneur léger
FROM node:18-alpine

# Installer les dépendances système nécessaires
RUN apk add --no-cache \
  bash \
  curl \
  && rm -rf /var/cache/apk/*

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --only=production && \
  npm cache clean --force

# Copier le code source
COPY . .

# Créer les répertoires nécessaires avec les bonnes permissions
RUN mkdir -p /app/mods /app/ressources /app/news /app/generated && \
  chmod -R 777 /app/generated

# Exposer le port
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000
ENV MODS_DIR=/app/mods
ENV RESSOURCES_DIR=/app/ressources
ENV NEWS_DIR=/app/news
ENV OUTPUT_DIR=/app/generated
ENV GENERATE_INTERVAL=300000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Commande de démarrage
CMD ["node", "index.js"]
