#!/usr/bin/env bash
set -euo pipefail

# Script pour générer manifest.json sur un serveur Ubuntu
# Usage: ./setup-server-manifest.sh /chemin/vers/dossier_mods /chemin/enregistrement/manifest.json

# Dépendances requises: jq, sha256sum, find, stat
if ! command -v jq >/dev/null 2>&1; then
  echo "❌ jq n'est pas installé. Installez-le : sudo apt-get update && sudo apt-get install -y jq"
  exit 1
fi
if ! command -v sha256sum >/dev/null 2>&1; then
  echo "❌ sha256sum n'est pas disponible. Installez coreutils: sudo apt-get update && sudo apt-get install -y coreutils"
  exit 1
fi

mods_dir=${1:-}
manifest_path=${2:-}
if [[ -z "${mods_dir}" ]]; then
  echo "❌ Usage: $0 /path/to/mods/directory"
  exit 1
fi
if [[ -z "${manifest_path}" ]]; then
  echo "❌ Usage: $0 /path/to/mods/directory /path/to/save/manifest.json"
  exit 1
fi

if [[ ! -d "${mods_dir}" ]]; then
  echo "❌ Le dossier ${mods_dir} n'existe pas"
  exit 1
fi

echo "📦 Génération du manifest pour: ${mods_dir}"

files_json="[]"
total_size=0
processed=0

# Lister les entrées du dossier (non récursif), compatible espaces via NUL
mapfile -d '' entries < <(find "${mods_dir}" -mindepth 1 -maxdepth 1 -printf '%P\0')

for file_name in "${entries[@]}"; do
  # Ignorer dotfiles et certains noms/extensions
  if [[ "${file_name}" == .* ]] || \
     [[ "${file_name}" == "manifest.json" ]] || \
     [[ "${file_name}" == "node_modules" ]] || \
     [[ "${file_name}" == "package.json" ]] || \
     [[ "${file_name}" == "package-lock.json" ]] || \
     [[ "${file_name}" == *.js ]] || \
     [[ "${file_name}" == *.md ]]; then
    continue
  fi

  file_path="${mods_dir}/${file_name}"

  if [[ -f "${file_path}" ]]; then
    if [[ "${file_name}" == *.pbo || "${file_name}" == *.bisign ]]; then
      size=$(stat -c %s -- "${file_path}")
      mb=$(awk "BEGIN { printf \"%.1f\", ${size}/1024/1024 }")
      echo "⏳ Traitement ${file_name} (${mb} MB)..."

      hash=$(sha256sum -- "${file_path}" | awk '{print $1}')
      mtime=$(stat -c %Y -- "${file_path}")
      mtime_ms=$(( mtime * 1000 ))

      files_json=$(jq -c \
        --arg name "${file_name}" \
        --arg hash "${hash}" \
        --argjson size "${size}" \
        --argjson lastModified "${mtime_ms}" \
        '. + [{name:$name, size:$size, hash:$hash, lastModified:$lastModified}]' \
        <<< "${files_json}")

      total_size=$(( total_size + size ))
      processed=$(( processed + 1 ))
      echo "✅ ${processed} - ${file_name}"
    else
      echo "⚠️ Ignoré: ${file_name} (type non supporté)"
    fi
  fi
done

# Timestamp en millisecondes
timestamp_ms=$(( $(date +%s%N) / 1000000 ))

manifest=$(jq -n \
  --arg version "1.0" \
  --argjson timestamp "${timestamp_ms}" \
  --argjson totalSize "${total_size}" \
  --argjson files "${files_json}" \
  --argjson deltaSupport true \
  '{version:$version, timestamp:$timestamp, totalSize:$totalSize, files:$files, deltaSupport:$deltaSupport}')

manifest_path="${manifest_path}/manifest.json"
printf "%s\n" "${manifest}" > "${manifest_path}"

gb=$(awk "BEGIN { printf \"%.2f\", ${total_size}/1024/1024/1024 }")
echo
echo "🎉 Manifest généré avec succès !"
echo "📁 Fichiers: ${processed}"
echo "💾 Taille totale: ${gb} GB"
echo "📄 Manifest sauvé: ${manifest_path}"
echo
echo "🚀 Uploadez le manifest.json sur votre serveur HTTPS"
echo "📡 URL recommandée: https://your-server.com/mods/manifest.json"
