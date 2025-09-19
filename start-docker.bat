@echo off
echo 🚀 Démarrage du serveur Arma 3 Manifest avec Docker Compose
echo.

REM Vérifier si Docker est installé
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker n'est pas installé ou n'est pas dans le PATH
    echo Veuillez installer Docker Desktop et réessayer
    pause
    exit /b 1
)

REM Vérifier si Docker Compose est disponible
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose n'est pas disponible
    echo Veuillez installer Docker Compose et réessayer
    pause
    exit /b 1
)

echo ✅ Docker et Docker Compose détectés
echo.

REM Créer le fichier .env s'il n'existe pas
if not exist .env (
    echo 📝 Création du fichier .env à partir de env.example
    copy env.example .env
    echo ✅ Fichier .env créé
    echo ⚠️  N'oubliez pas de modifier les paramètres dans .env si nécessaire
    echo.
)

REM Créer les répertoires nécessaires
echo 📁 Création des répertoires nécessaires...
if not exist data\mods mkdir data\mods
if not exist data\ressources mkdir data\ressources
if not exist data\news mkdir data\news
if not exist generated mkdir generated
echo ✅ Répertoires créés
echo.

REM Démarrer les services
echo 🐳 Démarrage des services Docker...
docker-compose up -d

if %errorlevel% equ 0 (
    echo.
    echo ✅ Services démarrés avec succès !
    echo.
    echo 📋 URLs importantes :
    echo   - Serveur principal : http://localhost
    echo   - Manifest des mods : http://localhost/mods/manifest.json
    echo   - Index des ressources : http://localhost/ressources/index.json
    echo   - Actualités : http://localhost/news/news.json
    echo   - Monitoring : http://localhost:9090
    echo   - API de statut : http://localhost:3000/status
    echo.
    echo 📝 Pour voir les logs : docker-compose logs -f
    echo 🛑 Pour arrêter : docker-compose down
    echo.
) else (
    echo ❌ Erreur lors du démarrage des services
    echo Vérifiez les logs avec : docker-compose logs
)

pause
