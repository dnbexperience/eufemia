#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Building es bundle ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=es \
babel ./src \
--extensions '.js,.ts,.tsx,.png,.snap' \
--config-file ./babel.config.js \
--out-dir ./build/es \
--copy-files \
--no-copy-ignored \
--ignore 'src/cjs,src/esm,src/umd,src/core,**/*.test.*,**/__tests__/**/*,**/*.stories.*,**/stories,**/*.d.ts'

echo 'Building es bundle done!'

echo 'Copy additional files to es ...'

OUT_DIR=./build/es babel-node ./scripts/postbuild/copyTypeScriptFiles.js
OUT_DIR=./build/es babel-node ./scripts/postbuild/copyStyles.js
