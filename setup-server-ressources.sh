#!/usr/bin/env bash
set -euo pipefail

# Dépendance (Ubuntu) :
# sudo apt-get update && sudo apt-get install -y jq

DIR="${1:-.}"                 # Répertoire des ressources (par défaut: courant)
OUT="${OUT:-$DIR/index.json}" # Chemin de sortie

echo "[" > "$OUT"
first=1

# Parcourt récursivement et gère les espaces dans les noms
find "$DIR" -type f \( -iname "*.dll" -o -iname "*.ts3_plugin" \) -printf '%P\0' \
| while IFS= read -r -d '' rel; do
  size=$(stat -c%s "$DIR/$rel")
  hash=$(sha256sum "$DIR/$rel" | awk '{print $1}')
  json=$(jq -n --arg name "$rel" --arg hash "$hash" --argjson size "$size" '{name:$name, hash:$hash, size:$size}')
  if [ $first -eq 1 ]; then
    first=0
    printf "%s" "$json" >> "$OUT"
  else
    printf ",\n%s" "$json" >> "$OUT"
  fi
done

echo -e "\n]" >> "$OUT"
echo "Généré: $OUT"
