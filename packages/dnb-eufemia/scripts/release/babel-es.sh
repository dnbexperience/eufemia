#!/bin/bash

echo 'Building es bundle ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=es \
babel ./src \
--extensions '.js,.ts,.tsx' \
--config-file ./babel.config.js \
--out-dir ./build/es \
--copy-files \
--no-copy-ignored \
--ignore 'src/cjs,src/esm,src/umd,src/core,**/*.test.js,**/__tests__/**/*,**/*.d.ts'

echo 'Building es bundle done!'

echo 'Copy additional files to es ...'

OUT_DIR=./build/es babel-node ./scripts/release/copyTypeScriptFiles.js
OUT_DIR=./build/es babel-node ./scripts/release/copyStyles.js
