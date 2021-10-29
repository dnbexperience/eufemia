#!/bin/bash

echo 'Postbuild started ...'

yarn build:types
yarn build:cjs
yarn build:es
yarn build:esm
yarn build:umd
echo 'Can be enabled in future if needed -> yarn build:resources'
yarn build:copy
yarn prettier:other
yarn test:build

echo 'Postbuild done!'
