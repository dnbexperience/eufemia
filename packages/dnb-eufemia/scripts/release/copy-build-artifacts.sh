#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Copy artifacts ...'

rm -rf build/**/{__tests__,cjs}
cp -r ./assets/ ./build/assets
cp .npmignore ./build/.npmignore
cp README README.md LICENSE ./build
babel-node ./scripts/release/copyFinaleBuild.js

echo 'Copy artifacts done!'