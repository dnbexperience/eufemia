/**
 * Copy .css files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { glob } from 'node:fs/promises'

if (require.main === module) {
  copyCSSFiles(process.env.OUT_DIR)
}

async function copyCSSFiles(dist) {
  const files = []
  for await (const file of glob('./build/**/*.css')) {
    if (!file.includes('/es/') && !file.includes('/esm/') && 
        !file.includes('/cjs/') && !file.includes('/umd/')) {
      files.push(file)
    }
  }

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/build/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
