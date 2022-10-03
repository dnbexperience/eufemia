#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

echo 'Building cjs bundle ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=cjs \
babel ./src \
--extensions '.cjs,.js,.ts,.tsx,.png,.snap' \
--config-file ./babel.config.js \
--out-dir ./build/cjs \
--copy-files \
--no-copy-ignored \
--ignore 'src/esm,src/umd,src/core,**/*.test.*,**/__tests__/**/*,**/*.stories.*,**/stories,**/*.d.ts'

echo 'Building cjs bundle done!'

echo 'Copy additional files to cjs ...'

OUT_DIR=./build/cjs babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/copyTypeScriptFiles.js
OUT_DIR=./build/cjs babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/copyStyles.js

echo 'Copy extra cjs package.json ...'

cp ./src/cjs/package.json ./build/cjs/package.json
