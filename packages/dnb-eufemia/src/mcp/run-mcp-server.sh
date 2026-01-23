#!/bin/bash

# Wrapper script to run the MCP server
# This ensures babel-node is found and the environment is set correctly

cd "$(dirname "$0")/../.." || exit 1

# Set docs root if not already set
export EUFEMIA_DOCS_ROOT="${EUFEMIA_DOCS_ROOT:-./build/docs}"

# Run with yarn to ensure babel-node is found
exec yarn babel-node --extensions .js,.ts,.tsx src/mcp/mcp-docs-server.ts
