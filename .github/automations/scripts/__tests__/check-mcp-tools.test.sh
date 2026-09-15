#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
check_script=$(cd "$script_dir/.." && pwd)/check-mcp-tools.sh
response_file=$(mktemp)
trap 'rm -f "$response_file"' EXIT

printf '%s' '{"result":{"tools":[{"name":"docs_search"},{"name":"docs_read"}]}}' > "$response_file"

MCP_TOOLS_RESPONSE_FILE="$response_file" bash "$check_script" \
  https://example.test/mcp \
  docs_search \
  docs_read

if MCP_TOOLS_RESPONSE_FILE="$response_file" bash "$check_script" \
  https://example.test/mcp \
  docs_meta > /dev/null 2>&1; then
  echo 'Expected a missing MCP tool to be rejected.' >&2
  exit 1
fi

echo 'MCP tool checks passed'
