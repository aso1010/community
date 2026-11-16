#!/usr/bin/env bash
set -euo pipefail

# Resolve paths relative to this script, regardless of the caller's directory.
cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
test -s community-nyc/public/index.html
rm -rf -- dist
mkdir -p dist
cp -a community-nyc/public/. dist/

# Advanced-mode Pages output keeps Functions available from a root-level build.
npx --yes wrangler@4.163.0 pages functions build community-nyc/functions \
  --outdir dist/_worker.js \
  --output-routes-path dist/_routes.json \
  --compatibility-date 2026-11-01

for artifact in index.html _worker.js/index.js _routes.json fonts/Archivo-Variable.ttf fonts/Archivo-Italic-Variable.ttf; do
  if [ ! -s "dist/$artifact" ]; then
    echo "FATAL: dist/$artifact missing or empty" >&2
    exit 1
  fi
done
