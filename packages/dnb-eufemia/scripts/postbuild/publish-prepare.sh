#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Prepare before publish has started ...'

babel-node ./scripts/postbuild/prepareForRelease.js

echo 'Testing the postbuild before publish ...'

jest ./prepareForRelease.test.js --ci --testPathIgnorePatterns=[]

echo 'Prepare before publish is done!'
