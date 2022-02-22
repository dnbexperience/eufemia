#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Postbuild started ...'

yarn build:types
yarn prettier:other
yarn build:cjs
yarn build:es
yarn build:esm
# yarn build:resources # Can be enabled in future if needed
yarn build:copy
rm -rf build/esm
yarn build:packages

echo 'Testing the postbuild ...'

jest --ci --rootDir ./scripts/postbuild ./postbuild.test.js

echo 'Postbuild done!'
