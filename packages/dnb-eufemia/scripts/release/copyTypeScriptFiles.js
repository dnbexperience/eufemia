/**
 * Copy .d.ts files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import globby from 'globby'

if (require.main === module) {
  copyTypeScriptFiles(process.env.OUT_DIR)
}

async function copyTypeScriptFiles(dist) {
  const files = await globby([
    './src/**/*.ts',
    './src/**/*.tsx',
    './src/**/*.d.ts',
  ])

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/src/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
