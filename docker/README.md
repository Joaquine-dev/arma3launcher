# Arma 3 Manifest Server - Docker

Ce dossier contient tous les services Docker pour le serveur de manifests Arma 3.

## Structure

```
docker/
├── docker-compose.yml      # Configuration des services
├── nginx/                  # Configuration nginx
├── manifest-service/       # Service de génération de manifests
├── file-watcher/          # Service de surveillance des fichiers
├── data/                  # Données (mods, ressources, actualités)
└── generated/             # Manifests générés
```

## Utilisation

```bash
# Démarrer tous les services
docker-compose up -d

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## URLs d'accès

- **Serveur principal** : `http://localhost/`
- **Manifest des mods** : `http://localhost/mods/manifest.json`
- **Fichiers mods** : `http://localhost/mods/[nom].pbo`
- **Ressources** : `http://localhost/ressources/`
- **Actualités** : `http://localhost/news/`

## Configuration

Les mods se trouvent dans `data/mods/` et sont automatiquement détectés par le file-watcher.


## Gérer les heures de checks

Le système utilise le fichier `manifest-config.env` pour contrôler quand et comment les manifests sont générés.

### Configuration des heures de vérification

```env
# Heures de vérification (format: HH:MM, séparées par des virgules)
CHECK_TIMES=0:00,6:00,12:00,18:00

# Activer la vérification périodique (true/false)
ENABLE_PERIODIC_CHECK=true

# Activer la surveillance des fichiers (true/false)
ENABLE_FILE_WATCHING=true

# Intervalle de vérification en millisecondes (60000 = 1 minute)
GENERATE_INTERVAL=60000
```

### Paramètres disponibles

- **`CHECK_TIMES`** : Heures auxquelles le système vérifie les changements
- **`ENABLE_PERIODIC_CHECK`** : Active/désactive la vérification automatique
- **`ENABLE_FILE_WATCHING`** : Active/désactive la surveillance en temps réel
- **`GENERATE_INTERVAL`** : Fréquence de vérification des heures configurées

### Exemples de configuration

**Production** (vérifications 4 fois par jour) :
```env
CHECK_TIMES=0:00,6:00,12:00,18:00
ENABLE_PERIODIC_CHECK=true
ENABLE_FILE_WATCHING=true
GENERATE_INTERVAL=300000
```

**Développement** (surveillance en temps réel) :
```env
CHECK_TIMES=0:00,12:00
ENABLE_PERIODIC_CHECK=false
ENABLE_FILE_WATCHING=true
GENERATE_INTERVAL=60000
```

### Appliquer les changements

```bash
# Redémarrer les services après modification
docker-compose down && docker-compose up -d

# Vérifier les logs
docker-compose logs -f manifest-generator
```
