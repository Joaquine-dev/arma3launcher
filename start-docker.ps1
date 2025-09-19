# Script PowerShell pour démarrer le serveur Arma 3 Manifest
# Usage: .\start-docker.ps1

Write-Host "🚀 Démarrage du serveur Arma 3 Manifest avec Docker Compose" -ForegroundColor Green
Write-Host ""

# Vérifier si Docker est installé
try {
  $dockerVersion = docker --version 2>$null
  if ($LASTEXITCODE -ne 0) {
    throw "Docker non trouvé"
  }
  Write-Host "✅ Docker détecté : $dockerVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Docker n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
  Write-Host "Veuillez installer Docker Desktop et réessayer" -ForegroundColor Yellow
  Read-Host "Appuyez sur Entrée pour quitter"
  exit 1
}

# Vérifier si Docker Compose est disponible
try {
  $composeVersion = docker-compose --version 2>$null
  if ($LASTEXITCODE -ne 0) {
    throw "Docker Compose non trouvé"
  }
  Write-Host "✅ Docker Compose détecté : $composeVersion" -ForegroundColor Green
}
catch {
  Write-Host "❌ Docker Compose n'est pas disponible" -ForegroundColor Red
  Write-Host "Veuillez installer Docker Compose et réessayer" -ForegroundColor Yellow
  Read-Host "Appuyez sur Entrée pour quitter"
  exit 1
}

Write-Host ""

# Créer le fichier .env s'il n'existe pas
if (-not (Test-Path ".env")) {
  Write-Host "📝 Création du fichier .env à partir de env.example" -ForegroundColor Yellow
  Copy-Item "env.example" ".env"
  Write-Host "✅ Fichier .env créé" -ForegroundColor Green
  Write-Host "⚠️  N'oubliez pas de modifier les paramètres dans .env si nécessaire" -ForegroundColor Yellow
  Write-Host ""
}

# Créer les répertoires nécessaires
Write-Host "📁 Création des répertoires nécessaires..." -ForegroundColor Yellow
$directories = @("data\mods", "data\ressources", "data\news", "generated")
foreach ($dir in $directories) {
  if (-not (Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
    Write-Host "  ✅ Créé : $dir" -ForegroundColor Green
  }
  else {
    Write-Host "  ✓ Existe : $dir" -ForegroundColor Gray
  }
}
Write-Host ""

# Démarrer les services
Write-Host "🐳 Démarrage des services Docker..." -ForegroundColor Yellow
docker-compose up -d

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "✅ Services démarrés avec succès !" -ForegroundColor Green
  Write-Host ""
  Write-Host "📋 URLs importantes :" -ForegroundColor Cyan
  Write-Host "  - Serveur principal : http://localhost" -ForegroundColor White
  Write-Host "  - Manifest des mods : http://localhost/mods/manifest.json" -ForegroundColor White
  Write-Host "  - Index des ressources : http://localhost/ressources/index.json" -ForegroundColor White
  Write-Host "  - Actualités : http://localhost/news/news.json" -ForegroundColor White
  Write-Host "  - Monitoring : http://localhost:9090" -ForegroundColor White
  Write-Host "  - API de statut : http://localhost:3000/status" -ForegroundColor White
  Write-Host ""
  Write-Host "📝 Commandes utiles :" -ForegroundColor Cyan
  Write-Host "  - Voir les logs : docker-compose logs -f" -ForegroundColor White
  Write-Host "  - Arrêter : docker-compose down" -ForegroundColor White
  Write-Host "  - Redémarrer : docker-compose restart" -ForegroundColor White
  Write-Host "  - Statut : docker-compose ps" -ForegroundColor White
  Write-Host ""

  # Proposer d'ouvrir le navigateur
  $response = Read-Host "Voulez-vous ouvrir le serveur dans votre navigateur ? (o/N)"
  if ($response -eq "o" -or $response -eq "O" -or $response -eq "oui") {
    Start-Process "http://localhost"
  }
}
else {
  Write-Host "❌ Erreur lors du démarrage des services" -ForegroundColor Red
  Write-Host "Vérifiez les logs avec : docker-compose logs" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Appuyez sur Entrée pour quitter"
