#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Generating type definitions ...'

babel-node ./scripts/prepub/generateTypes.js
yarn build:types:definitions
yarn test:auto-generated-types

echo 'Generating type definitions done!'