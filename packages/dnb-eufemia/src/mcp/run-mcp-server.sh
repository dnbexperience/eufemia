#!/bin/bash

# Wrapper script to run the MCP server (stdio transport).
# This ensures babel-node is found and the environment is set correctly.

set -euo pipefail

# Resolve the @dnb/eufemia package root from this script's location so the
# default EUFEMIA_DOCS_ROOT does not depend on the caller's cwd.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PACKAGE_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PACKAGE_ROOT"

# Set docs root if not already set. Always resolve to an absolute path so the
# server fails fast with a clear error if the docs have not been built yet.
export EUFEMIA_DOCS_ROOT="${EUFEMIA_DOCS_ROOT:-$PACKAGE_ROOT/build/docs}"

# Run with yarn to ensure babel-node is found
exec yarn babel-node --extensions .js,.ts,.tsx src/mcp/mcp-stdio.ts
