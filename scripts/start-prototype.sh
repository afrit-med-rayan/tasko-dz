#!/usr/bin/env bash
# Tasko v0 — Prototype launcher (macOS / Linux)
# Usage: npm run prototype:unix

set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

WEB_URL="http://localhost:3000"
API_URL="http://localhost:4000"

echo ""
echo "  ========================================="
echo "   TASKO v0 — Prototype de presentation"
echo "  ========================================="
echo ""

command -v node >/dev/null 2>&1 || { echo "ERREUR: Node.js requis."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "ERREUR: npm requis."; exit 1; }

[ -d node_modules ] || npm install
node scripts/link-web-deps.js 2>/dev/null || true

echo "  Demarrage API + Web..."
npm run dev &
DEV_PID=$!

wait_for() {
  local url=$1
  local max=${2:-45}
  local i=0
  while [ $i -lt $max ]; do
    if curl -sf "$url" >/dev/null 2>&1; then return 0; fi
    sleep 2
    i=$((i + 2))
  done
  return 1
}

wait_for "$API_URL/api/v1/health" || { echo "API timeout"; kill $DEV_PID 2>/dev/null; exit 1; }
wait_for "$WEB_URL" || { echo "Web timeout"; kill $DEV_PID 2>/dev/null; exit 1; }

echo "  Serveurs prets!"
echo ""
echo "  Accueil:           $WEB_URL/"
echo "  Demo freelancer:   $WEB_URL/freelancer/dashboard"
echo "  Demo client:       $WEB_URL/client/dashboard"
echo "  Documentation:     docs/TASKO_PAGES_GUIDE.md"
echo ""

command -v xdg-open >/dev/null && xdg-open "$WEB_URL" 2>/dev/null || \
command -v open >/dev/null && open "$WEB_URL" 2>/dev/null || true

wait $DEV_PID
