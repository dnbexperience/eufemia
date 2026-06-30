#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Postbuild started ...'

yarn build:types:definitions
yarn prettier:other:write

# Build the cjs/es/esm bundles in parallel. Each pass is independent: it only
# reads from ./src (and the shared compiled CSS) and writes to its own
# ./build/<format> directory, so running them concurrently cuts this phase from
# the sum of all three down to roughly the slowest single pass. The background
# PIDs are collected and waited on individually so a failure in any pass still
# fails the build (set -e turns the non-zero `wait` into an exit).
babel_pids=()
yarn build:cjs &
babel_pids+=($!)
if [ -z "$BUILD_MINI" ]; then
  yarn build:es &
  babel_pids+=($!)
fi
yarn build:esm &
babel_pids+=($!)
for pid in "${babel_pids[@]}"; do
  wait "$pid"
done

if [ -z "$BUILD_MINI" ]; then
  yarn build:docs
fi
yarn build:lebab
# yarn build:resources # Can be enabled in future if needed
yarn build:copy
rm -rf build/esm
yarn build:packages

if [ -z "$BUILD_MINI" ]; then
  echo 'Testing the postbuild ...'
  yarn test:postbuild
fi

echo 'Postbuild done!'
