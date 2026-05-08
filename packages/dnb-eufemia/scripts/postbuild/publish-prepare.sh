#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Prepare before publish has started ...'

babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/prepareForRelease.js

if [ -z "$BUILD_MINI" ]; then
  echo 'Testing the postbuild before publish ...'
  yarn test:postbuild:publish
fi

echo 'Prepare before publish is done!'
