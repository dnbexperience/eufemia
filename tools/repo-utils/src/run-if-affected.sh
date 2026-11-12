#!/usr/bin/env bash
# Usage: run-if-affected.sh <workspace> <script>, with AFFECTED_WORKSPACES from detect-changes.mjs
set -euo pipefail

if [[ "${AFFECTED_WORKSPACES:-all}" == all || " $AFFECTED_WORKSPACES " == *" $1 "* ]]; then
  exec yarn workspace "$@"
fi

echo "Skip $1: not affected by this branch"
