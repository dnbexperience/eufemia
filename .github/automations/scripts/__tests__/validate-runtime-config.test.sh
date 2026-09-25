#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
validate_script=$(cd "$script_dir/.." && pwd)/validate-runtime-config.sh
guardrails=$(cd "$script_dir/../.." && pwd)/guardrails.json

bash "$validate_script" \
  https://gateway.example.test/v1/responses \
  gpt-5.6-terra \
  "$guardrails"

if bash "$validate_script" \
  http://gateway.example.test/v1/responses \
  gpt-5.6-terra \
  "$guardrails" > /dev/null 2>&1; then
  echo 'Expected a non-HTTPS gateway to be rejected.' >&2
  exit 1
fi

if bash "$validate_script" \
  https://gateway.example.test/v1/responses?target=other \
  gpt-5.6-terra \
  "$guardrails" > /dev/null 2>&1; then
  echo 'Expected a gateway URL with query parameters to be rejected.' >&2
  exit 1
fi

if bash "$validate_script" \
  https://gateway.example.test/v1/responses \
  unapproved-model \
  "$guardrails" > /dev/null 2>&1; then
  echo 'Expected an unapproved model to be rejected.' >&2
  exit 1
fi

echo 'runtime-config tests passed'
