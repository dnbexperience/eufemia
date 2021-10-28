#!/bin/bash

echo 'Building es ...'

cross-env \
NODE_ENV=production \
BABEL_ENV=es \
babel ./src \
--extensions '.js,.ts,.tsx' \
--keep-file-extension \
--config-file ./babel.config.js \
--out-dir ./build/es \
--copy-files \
--no-copy-ignored \
--ignore 'src/cjs,src/esm,src/umd,src/core,**/*.test.js,**/__tests__/**/*,**/*.d.ts'

echo 'Building es done!'

echo 'Copy .d.ts files ...'

cd ./src && find . -name '*.d.ts' | cpio -p -dumv ../build/es && cd ../
