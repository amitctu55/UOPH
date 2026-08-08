#!/usr/bin/env bash
set -euo pipefail

cd /workspace

# Monorepo install: lockfile may lag package.json; legacy-peer-deps matches .npmrc.
npm install --legacy-peer-deps --ignore-scripts
