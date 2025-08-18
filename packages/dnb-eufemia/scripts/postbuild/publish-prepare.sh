#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Prepare before publish has started ...'

babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/prepareForRelease.js

echo 'Testing the postbuild before publish ...'

NODE_OPTIONS=--experimental-vm-modules jest ./scripts/postbuild/__tests__/prepareForRelease.test.ts --ci --testPathIgnorePatterns=[]

echo 'Prepare before publish is done!'
