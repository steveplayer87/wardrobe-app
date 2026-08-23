#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-4173}"
cd "$(dirname "$0")"
echo "Wardrobe App 正在 http://localhost:${PORT}/index.html"
echo "按 Ctrl+C 可停止本機伺服器。"
python3 -m http.server "$PORT"
