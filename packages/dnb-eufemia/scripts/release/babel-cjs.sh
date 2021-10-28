#!/bin/bash

echo 'Building cjs ...'

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

echo 'Building cjs done!'

echo 'Copy .d.ts files ...'

OUT_DIR=./build/cjs babel-node ./scripts/release/copyTypeScriptDefinitionFiles.js
