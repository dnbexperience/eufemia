#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Building umd bundles ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=umd \
rollup -c ./rollup.config.js

echo 'Building umd bundles done!'
