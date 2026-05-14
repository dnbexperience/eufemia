#!/bin/bash

# Wrapper script to run the Eufemia MCP HTTP server (SSE + Streamable HTTP).
# Use this for hosting the MCP server behind a public URL (e.g. Fly.io,
# a Claude flair / proxy server).

set -euo pipefail

# Resolve the @dnb/eufemia package root from this script's location so the
# default EUFEMIA_DOCS_ROOT does not depend on the caller's cwd.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PACKAGE_ROOT"

# Set defaults if not already set. Always use an absolute path for
# EUFEMIA_DOCS_ROOT so the server fails fast with a clear error if the docs
# have not been built yet.
export EUFEMIA_DOCS_ROOT="${EUFEMIA_DOCS_ROOT:-$PACKAGE_ROOT/build/docs}"
export PORT="${PORT:-8787}"
export HOST="${HOST:-0.0.0.0}"

# Run with yarn so babel-node is resolved through the workspace
exec yarn babel-node --extensions .js,.ts,.tsx src/mcp/mcp-http-server.ts
