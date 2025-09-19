# 🐳 Arma 3 Manifest Server - Docker Compose

Ce Docker Compose configure automatiquement un serveur complet pour héberger les manifests et fichiers de votre launcher Arma 3.

## 🚀 Démarrage rapide

### 1. Prérequis
- Docker et Docker Compose installés
- Ports 80 et 443 disponibles (ou modifiez dans docker-compose.yml)

### 2. Configuration
```bash
# Copier le fichier de configuration
cp env.example .env

# Modifier les paramètres selon vos besoins
nano .env
```

### 3. Démarrage
```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## 📁 Structure des répertoires

```
Arma3Launcher/
├── data/                    # Données à servir
│   ├── mods/               # Fichiers .pbo et .bisign
│   ├── ressources/         # DLL et plugins
│   └── news/               # Fichiers JSON d'actualités
├── generated/              # Manifests générés automatiquement
├── nginx/                  # Configuration Nginx
├── manifest-service/       # Service de génération de manifests
├── file-watcher/          # Service de surveillance des fichiers
└── monitoring/            # Configuration Prometheus
```

## 🔧 Services inclus

### 1. **Nginx** (Port 80/443)
- Serveur web principal
- Configuration CORS pour les requêtes cross-origin
- Compression gzip
- Rate limiting
- Cache optimisé pour les fichiers de mods

### 2. **Manifest Generator** (Port 3000)
- Service Node.js pour générer les manifests
- Surveillance automatique des changements de fichiers
- Génération périodique (configurable)
- API REST pour déclencher la génération

### 3. **File Watcher** (Port 3001)
- Surveillance en temps réel des répertoires
- Déclenchement automatique de la régénération
- Debounce pour éviter les générations multiples

### 4. **Prometheus** (Port 9090)
- Monitoring des services
- Métriques de performance
- Interface web de monitoring

## 📋 Configuration

### Variables d'environnement principales

| Variable | Description | Défaut |
|----------|-------------|---------|
| `MODS_DIR` | Répertoire des mods | `./data/mods` |
| `RESSOURCES_DIR` | Répertoire des ressources | `./data/ressources` |
| `NEWS_DIR` | Répertoire des actualités | `./data/news` |
| `GENERATE_INTERVAL` | Intervalle de génération (ms) | `300000` (5 min) |
| `RATE_LIMIT_API` | Limite de taux pour l'API | `10r/s` |
| `RATE_LIMIT_FILES` | Limite de taux pour les fichiers | `50r/s` |

### Configuration Nginx

Le fichier `nginx/conf.d/default.conf` contient la configuration complète :
- CORS configuré pour tous les domaines
- Compression gzip activée
- Cache optimisé pour les fichiers statiques
- Rate limiting par type de contenu

## 🎯 Utilisation

### 1. Ajouter des mods
```bash
# Copier vos fichiers .pbo et .bisign dans le répertoire
cp /path/to/your/mods/*.pbo ./data/mods/
cp /path/to/your/mods/*.bisign ./data/mods/

# Les manifests seront générés automatiquement
```

### 2. Ajouter des ressources
```bash
# Copier vos DLL et plugins
cp /path/to/your/dlls/*.dll ./data/ressources/
cp /path/to/your/plugins/*.ts3_plugin ./data/ressources/
```

### 3. Ajouter des actualités
```bash
# Créer un fichier JSON d'actualité
echo '{"title":"Nouvelle mise à jour","content":"Description...","timestamp":1640995200000}' > ./data/news/update-1.json
```

### 4. Vérifier le statut
```bash
# Vérifier les services
docker-compose ps

# Voir les logs
docker-compose logs manifest-generator

# Tester l'API
curl http://localhost/health
```

## 🔍 Monitoring

### Interface Prometheus
- URL : http://localhost:9090
- Métriques disponibles pour tous les services

### Logs
```bash
# Logs de tous les services
docker-compose logs

# Logs d'un service spécifique
docker-compose logs nginx
docker-compose logs manifest-generator
docker-compose logs file-watcher
```

### API de statut
```bash
# Statut du générateur de manifests
curl http://localhost:3000/status

# Santé du système
curl http://localhost:3000/health
```

## 🛠️ Commandes utiles

### Gestion des services
```bash
# Démarrer en arrière-plan
docker-compose up -d

# Redémarrer un service
docker-compose restart manifest-generator

# Mettre à jour et redémarrer
docker-compose up -d --build

# Voir l'utilisation des ressources
docker-compose top
```

### Maintenance
```bash
# Nettoyer les conteneurs arrêtés
docker-compose down --remove-orphans

# Nettoyer les images inutilisées
docker system prune -a

# Sauvegarder les données
tar -czf backup-$(date +%Y%m%d).tar.gz data/ generated/
```

## 🔒 Sécurité

### Configuration recommandée
1. **Changer les ports par défaut** si exposé sur Internet
2. **Configurer un reverse proxy** (Traefik, Caddy) pour HTTPS
3. **Limiter l'accès** aux répertoires sensibles
4. **Surveiller les logs** régulièrement

### Exemple avec Traefik
```yaml
# Ajouter dans docker-compose.yml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.arma3.rule=Host(`your-domain.com`)"
  - "traefik.http.routers.arma3.tls=true"
  - "traefik.http.routers.arma3.tls.certresolver=letsencrypt"
```

## 🐛 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Vérifier les ports utilisés
   netstat -tulpn | grep :80

   # Modifier le port dans docker-compose.yml
   ports:
     - "8080:80"
   ```

2. **Manifests non générés**
   ```bash
   # Vérifier les logs du générateur
   docker-compose logs manifest-generator

   # Forcer la génération
   curl -X POST http://localhost:3000/generate
   ```

3. **Permissions de fichiers**
   ```bash
   # Corriger les permissions
   sudo chown -R 1001:1001 data/ generated/
   ```

4. **Service non accessible**
   ```bash
   # Vérifier le statut des conteneurs
   docker-compose ps

   # Redémarrer tous les services
   docker-compose restart
   ```

## 📚 URLs importantes

- **Serveur principal** : http://localhost
- **Manifest des mods** : http://localhost/mods/manifest.json
- **Index des ressources** : http://localhost/ressources/index.json
- **Actualités** : http://localhost/news/news.json
- **Monitoring** : http://localhost:9090
- **API de statut** : http://localhost:3000/status

## 🤝 Support

Pour toute question ou problème :
1. Vérifiez les logs : `docker-compose logs`
2. Consultez la documentation des services individuels
3. Vérifiez la configuration dans `.env`
4. Testez l'API de statut

---

**Note** : Ce Docker Compose est conçu pour un environnement de développement et de test. Pour la production, configurez HTTPS, un reverse proxy et des sauvegardes régulières.
