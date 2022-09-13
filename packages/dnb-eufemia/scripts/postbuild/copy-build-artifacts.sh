#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Copy build artifacts ...'

rm -rf build/**/{__tests__,cjs}
cp -r ./assets/ ./build/assets
cp .npmignore ./build/.npmignore
cp README README.md LICENSE ./build
babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/copyFinaleBuild.js

echo 'Copy build artifacts done!'