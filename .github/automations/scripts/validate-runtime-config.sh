#!/usr/bin/env bash

set -euo pipefail

gateway=${1:?Pass API_GATEWAY as the first argument}
model=${2:?Pass MODEL as the second argument}
guardrails_path=${3:?Pass the guardrails path as the third argument}

jq --exit-status '.schemaVersion == 1' "$guardrails_path" > /dev/null

# shellcheck disable=SC2016
gateway_parts=$(node -e '
  const url = new URL(process.argv[1])
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    process.exit(1)
  }
  process.stdout.write(`${url.hostname}\n${url.pathname}`)
' "$gateway") || {
  echo "::error::API_GATEWAY must be an HTTPS URL without credentials, query parameters, or a fragment."
  exit 1
}

gateway_path=${gateway_parts#*$'\n'}

allowed_path=$(jq --raw-output '.runtime.allowedGatewayPath' "$guardrails_path")
if [[ "$gateway_path" != "$allowed_path" ]]; then
  echo "::error::API_GATEWAY path must be $allowed_path."
  exit 1
fi

if ! jq --exit-status --arg model "$model" \
  '.runtime.allowedModels | index($model) != null' \
  "$guardrails_path" > /dev/null; then
  echo "::error::MODEL is not allowed by the automation guardrails: $model"
  exit 1
fi
