#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Prepare before publish has started ...'

babel-node ./scripts/release/prepareForRelease.js

echo 'Testing the postbuild before publish ...'

jest --ci --rootDir ./scripts/release ./prepareForRelease.test.js

echo 'Prepare before publish is done!'
