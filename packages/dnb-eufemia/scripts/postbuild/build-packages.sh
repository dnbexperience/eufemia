#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Building umd and esm (mjs) bundles ...'

cross-env \
NODE_ENV=production \
tsdown -c ./tsdown.config.ts

echo 'Building umd and esm (mjs) bundles done!'
