/**
 * Copy additional files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import globby from 'globby'

if (require.main === module) {
  copyTypeScriptFiles(process.env.OUT_DIR)
}

async function copyTypeScriptFiles(dist) {
  const globbyFiles = ['./src/**/*.d.ts']

  if (!process.env.ONLY_DEFINITION_FILES) {
    globbyFiles.push(['./src/**/*.ts', './src/**/*.tsx'])
  }

  const files = await globby(globbyFiles)

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/src/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
