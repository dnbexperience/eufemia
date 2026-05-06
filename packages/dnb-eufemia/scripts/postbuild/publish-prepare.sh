#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Prepare before publish has started ...'

babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/prepareForRelease.js

echo 'Testing the postbuild before publish ...'

yarn test:postbuild:publish

echo 'Prepare before publish is done!'
