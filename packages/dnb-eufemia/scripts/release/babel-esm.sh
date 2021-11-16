#!/bin/bash

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
--ignore 'src/cjs,src/esm,src/umd,src/core,**/*.test.js,**/__tests__/**/*,**/*.d.ts'

echo 'Building esm bundle done!'

echo 'Copy additional files to esm ...'

OUT_DIR=./build/esm babel-node ./scripts/release/copyTypeScriptFiles.js
OUT_DIR=./build/esm babel-node ./scripts/release/copyStyles.js
