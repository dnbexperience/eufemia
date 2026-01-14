/**
 * Copy additional files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { glob } from 'node:fs/promises'

if (require.main === module) {
  copyTypeScriptFiles(process.env.OUT_DIR)
}

async function copyTypeScriptFiles(dist) {
  const files = []
  for await (const file of glob('./src/**/*.d.ts')) {
    files.push(file)
  }

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/src/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
