#!/usr/bin/env bash

set -euo pipefail

endpoint=${1:?Pass the MCP endpoint as the first argument}
shift

if (( $# == 0 )); then
  echo 'Pass at least one required MCP tool.' >&2
  exit 1
fi

if [[ -n "${MCP_TOOLS_RESPONSE_FILE:-}" ]]; then
  response=$(<"$MCP_TOOLS_RESPONSE_FILE")
else
  response=$(curl --fail-with-body --silent --show-error \
    --request POST \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json, text/event-stream' \
    --header 'mcp-protocol-version: 2026-07-28' \
    --header 'mcp-method: tools/list' \
    --data '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{"_meta":{"io.modelcontextprotocol/protocolVersion":"2026-07-28","io.modelcontextprotocol/clientInfo":{"name":"eufemia-automation","version":"1.0.0"},"io.modelcontextprotocol/clientCapabilities":{}}}}' \
    "$endpoint")
fi

for tool in "$@"; do
  if ! jq --exit-status --arg tool "$tool" \
    'any(.result.tools[]?; .name == $tool)' <<< "$response" > /dev/null; then
    echo "::error::The Eufemia MCP server is missing the required $tool tool."
    exit 1
  fi
done
