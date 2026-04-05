#!/bin/bash
set -e

branches=(
  "refactor/form-status-to-functional"
  "refactor/global-status-controller-to-functional"
  "refactor/number-format-to-functional"
  "refactor/pagination-tier2-to-functional"
  "refactor/radio-to-functional"
  "refactor/toggle-button-to-functional"
  "refactor/button-to-functional"
  "refactor/pagination-simple-to-functional"
)

for branch in "${branches[@]}"; do
  echo "=== Processing $branch ==="
  git checkout "$branch" 2>&1 || git checkout -b "$branch" "origin/$branch" 2>&1
  git reset --hard "origin/$branch" 2>&1
  FORK=$(git merge-base origin/v11 "origin/$branch")
  UNIQUE=$(git log --oneline "$FORK".."origin/$branch" | wc -l | tr -d ' ')
  echo "Fork: $FORK | Unique commits: $UNIQUE"
  
  if ! git rebase --onto origin/v11 "$FORK" "$branch" 2>&1; then
    echo "!!! CONFLICT in $branch - needs manual resolution !!!"
    exit 1
  fi
  
  git push --force-with-lease 2>&1
  echo "=== Done with $branch ==="
  echo ""
done

echo "All branches processed successfully!"
