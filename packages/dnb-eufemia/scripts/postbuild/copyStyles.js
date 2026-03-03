/**
 * Copy .css files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { glob } from 'tinyglobby'

if (require.main === module) {
  copyCSSFiles(process.env.OUT_DIR)
}

async function copyCSSFiles(dist) {
  const files = await glob([
    './build/**/*.css',
    '!./build/es/',
    '!./build/esm/',
    '!./build/cjs/',
    '!./build/umd/',
  ])

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/build/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
