#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Postbuild started ...'

yarn build:types
yarn build:cjs
yarn build:es
yarn build:esm
yarn build:umd
echo 'Can be enabled in future if needed -> yarn build:resources'
yarn build:copy
yarn prettier:other

echo 'Testing the postbuild ...'

yarn test:build

echo 'Postbuild done!'
