#!/usr/bin/env bash
# Per-boot start for UPCHAR auth (:4000) + public website (:3001).
# Auth uses embedded Mongo by default; set MONGODB_URI + USE_MEMORY_MONGO=false to use Atlas.
set -euo pipefail
cd "$(dirname "$0")/.."

if [ ! -f services/auth/.env ]; then
  cp services/auth/.env.example services/auth/.env
fi

export JWT_SECRET="${JWT_SECRET:-upchar-dev-jwt-secret-change-me}"
export USE_MEMORY_MONGO="${USE_MEMORY_MONGO:-true}"
export ALLOW_MEMORY_FALLBACK="${ALLOW_MEMORY_FALLBACK:-true}"
export PORT="${PORT:-4000}"

if ! curl -sf "http://127.0.0.1:${PORT}/auth/health" >/dev/null 2>&1; then
  (
    cd services/auth
    npm run start:prod
  ) >/tmp/upchar-auth.log 2>&1 &

  ready=0
  for _ in $(seq 1 90); do
    if curl -sf "http://127.0.0.1:${PORT}/auth/health" >/dev/null 2>&1; then
      ready=1
      break
    fi
    sleep 1
  done
  if [ "$ready" -ne 1 ]; then
    echo "auth failed to become healthy on :${PORT}" >&2
    tail -n 80 /tmp/upchar-auth.log >&2 || true
    exit 1
  fi
fi

if curl -sf "http://127.0.0.1:3001/" >/dev/null 2>&1; then
  echo "UPCHAR services ready (auth:${PORT}, website:3001)"
  exec sleep infinity
fi

cd apps/public-website
exec npx next start -p 3001
