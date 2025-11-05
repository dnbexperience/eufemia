#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Copy build artifacts ...'

rm -rf build/**/{__tests__,cjs}
cp -r ./assets/ ./build/assets
cp .npmignore ./build/.npmignore
# Copy README.md as the source of truth
cp README.md LICENSE ./build
# Also provide an extensionless README for compatibility
cp README.md ./build/README
babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/copyFinaleBuild.js

echo 'Copy build artifacts done!'