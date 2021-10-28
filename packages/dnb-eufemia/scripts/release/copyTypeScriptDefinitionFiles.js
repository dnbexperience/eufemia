/**
 * Copy .d.ts files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import globby from 'globby'

if (require.main === module) {
  copyDefinitonFiles(process.env.OUT_DIR)
}

async function copyDefinitonFiles(dist) {
  const files = await globby('./src/**/*.d.ts')

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/src/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
