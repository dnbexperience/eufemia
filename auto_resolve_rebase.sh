#!/bin/bash
set -e

MAX_ITERATIONS=200
i=0

while [ $i -lt $MAX_ITERATIONS ]; do
  i=$((i + 1))

  # Handle all conflicted files
  conflicted=$(git diff --name-only --diff-filter=U 2>/dev/null || true)
  if [ -z "$conflicted" ]; then
    echo "No conflicts found, trying to continue..."
    output=$(GIT_EDITOR=true git rebase --continue 2>&1 || true)
    echo "$output" | tail -3
    if echo "$output" | grep -q "Successfully rebased"; then
      echo "REBASE COMPLETE after $i iterations!"
      exit 0
    fi
    continue
  fi

  for f in $conflicted; do
    # Check if HEAD has this file
    if git show HEAD:"$f" > /dev/null 2>&1; then
      git checkout --ours "$f" 2>/dev/null || true
    else
      git rm "$f" 2>/dev/null || true
    fi
  done

  git add -A 2>/dev/null || true
  output=$(GIT_EDITOR=true git rebase --continue 2>&1 || true)
  echo "Iteration $i: $(echo "$output" | grep -o 'could not apply [^ ]*' | head -1)"

  if echo "$output" | grep -q "Successfully rebased"; then
    echo "REBASE COMPLETE after $i iterations!"
    exit 0
  fi

  if ! echo "$output" | grep -qE "CONFLICT|error: could not apply"; then
    echo "UNEXPECTED STATE:"
    echo "$output" | tail -10
    exit 1
  fi
done

echo "Exceeded max iterations ($MAX_ITERATIONS)"
exit 1
