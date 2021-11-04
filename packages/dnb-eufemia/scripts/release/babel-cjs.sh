#!/bin/bash

echo 'Building cjs bundle ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=cjs \
babel ./src \
--extensions '.cjs,.js,.ts,.tsx' \
--keep-file-extension \
--config-file ./babel.config.js \
--out-dir ./build/cjs \
--copy-files \
--no-copy-ignored \
--ignore 'src/esm,src/umd,src/core,**/*.test.js,**/__tests__/**/*,**/*.d.ts'

echo 'Building cjs bundle done!'

echo 'Copy .d.ts files to cjs ...'

OUT_DIR=./build/cjs babel-node ./scripts/release/copyTypeScriptDefinitionFiles.js
OUT_DIR=./build/cjs babel-node ./scripts/release/copyStyles.js

echo 'Copy extra cjs package.json ...'

cp ./src/cjs/package.json ./build/cjs/package.json
