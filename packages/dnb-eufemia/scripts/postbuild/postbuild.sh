#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Postbuild started ...'

yarn build:types:definitions
yarn prettier:other:write

# The cjs/es/esm Babel passes only read ./src and each writes to its own
# ./build/<target> dir, so run them concurrently to cut build time. set -e does
# not catch background failures, so wait on every PID and let a non-zero exit
# propagate.
babel_pids=()
yarn build:cjs & babel_pids+=($!)
yarn build:esm & babel_pids+=($!)
if [ -z "$BUILD_MINI" ]; then
  yarn build:es & babel_pids+=($!)
fi
for pid in "${babel_pids[@]}"; do
  wait "$pid"
done

if [ -z "$BUILD_MINI" ]; then
  yarn build:docs
fi
yarn build:lebab
yarn build:skills
# yarn build:resources # Can be enabled in future if needed
yarn build:copy
rm -rf build/esm
yarn build:packages

if [ -z "$BUILD_MINI" ]; then
  echo 'Testing the postbuild ...'
  yarn test:postbuild
fi

echo 'Postbuild done!'
