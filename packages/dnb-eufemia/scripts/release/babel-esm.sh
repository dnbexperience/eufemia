#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Building esm bundle ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=esm \
babel ./src \
--extensions '.js,.ts,.tsx' \
--config-file ./babel.config.js \
--out-dir ./build/esm \
--copy-files \
--no-copy-ignored \
--ignore 'src/cjs,src/esm,src/umd,src/core,**/*.test.*,**/__tests__/**/*,**/*.stories.*,**/stories,**/*.d.ts'

echo 'Building esm bundle done!'

echo 'Copy additional files to esm ...'

OUT_DIR=./build/esm babel-node ./scripts/release/copyTypeScriptFiles.js
OUT_DIR=./build/esm babel-node ./scripts/release/copyStyles.js
