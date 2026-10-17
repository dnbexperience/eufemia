#!/usr/bin/env bash

set -euo pipefail

script_dir=$(cd "$(dirname "$0")" && pwd)
scripts_dir=$(cd "$script_dir/.." && pwd)
guardrails=$(cd "$script_dir/../.." && pwd)/guardrails.json
report=$(mktemp)
trap 'rm -f "$report"' EXIT

printf '%s' '{"title":"Test <report>","summary":"Summary #1\nnext","status":"ok","findings":[],"metrics":[{"name":"Files","value":"2"}]}' > "$report"

node "$scripts_dir/validate-report.mjs" "$report" "$guardrails"
rendered=$(node "$scripts_dir/render-report.mjs" "$report")
grep -Fq '# Test &lt;report&gt;' <<< "$rendered"
grep -Fq 'Summary \#1' <<< "$rendered"
grep -Fq '<br>next' <<< "$rendered"

printf '%s' '{"title":"Invalid","summary":"Summary","status":"unknown","findings":[],"metrics":[]}' > "$report"
if node "$scripts_dir/validate-report.mjs" "$report" "$guardrails" > /dev/null 2>&1; then
  echo 'Expected an invalid report status to be rejected.' >&2
  exit 1
fi

echo 'report tests passed'
