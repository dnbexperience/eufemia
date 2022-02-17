/**
 * Copy production files over to be the main/default files
 *
 * Before we have used both rsync and cp
 * but rsync does not work in the CI and
 * cp does not have the option to ignore existing files.
 * We then overwrite /styles – but then the font/assets path is not correct anymore (-n does not work on mac)
 *
 * "build:copy": "rsync -r --ignore-existing --exclude=dnb-ui-*.min.* ./build/esm/* ./build",
 * "build:copy": "cp -r build/esm/* ./build",
 *
 */

import fs from 'fs-extra'

if (require.main === module) {
  copyFinaleBuild()
}

async function copyFinaleBuild() {
  const filter = (file) => {
    if (file.includes('__tests__')) {
      return false
    }
    if (/dnb-ui-.*\.min\.*/.test(file)) {
      return false
    }
    return true
  }
  await fs.copy('./build/esm/', './build/', {
    filter,
    overwrite: false,
    errorOnExist: false,
  })
}
