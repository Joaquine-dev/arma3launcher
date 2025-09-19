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
