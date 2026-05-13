/**
 * Copy additional files recursively
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { globFiles } from '../tools/globFiles'

if (require.main === module) {
  copyTypeScriptFiles(process.env.OUT_DIR)
}

async function copyTypeScriptFiles(dist) {
  const filePatterns = ['./src/**/*.d.ts']

  const files = await globFiles(filePatterns)

  for await (const file of files) {
    const src = path.resolve(file)
    const dest = path.resolve(dist, file.replace('/src/', '/'))

    await fs.copy(src, dest, {
      overwrite: false,
      errorOnExist: false,
    })
  }
}
