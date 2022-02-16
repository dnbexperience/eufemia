#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Prebuild started ...'

yarn build:prebuild
yarn build:esm
yarn build:types:esm
yarn build:copy
rm -rf build/esm

echo 'Prebuild done!'