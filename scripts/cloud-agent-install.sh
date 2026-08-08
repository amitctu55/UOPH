#!/usr/bin/env bash
# Idempotent Cloud Agent install for UPCHAR auth + public website.
set -euo pipefail
cd "$(dirname "$0")/.."

npm install --ignore-scripts
npm rebuild bcryptjs --workspace=services/auth 2>/dev/null || true

if [ ! -f services/auth/.env ]; then
  cp services/auth/.env.example services/auth/.env
fi

npm run build --workspace=services/auth
npm run build --workspace=apps/public-website
