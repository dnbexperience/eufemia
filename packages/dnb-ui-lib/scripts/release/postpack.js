/**
 * In case we want to remove some info from the package.json before we publish
 *
 */

import fs from 'fs-extra'
import tar from 'tar'

export default function() {
  // Read development version of package.json.
  const packageJson = JSON.parse(
    fs.readFileSync('./package.json').toString()
  )

  // Extract package made by `yarn pack`.
  tar.extract({
    file: `./dnb-ui-lib-v${packageJson.version}.tgz`,
    sync: true
  })

  // Remove unnecessary entries and reformat.
  delete packageJson.scripts
  delete packageJson.devDependencies
  const simplifiedPackageJson = JSON.stringify(packageJson, null, 2)

  // Update the extracted version of package.json with simplified one.
  fs.writeFileSync('package/package.json', simplifiedPackageJson, {
    encoding: 'utf-8'
  })

  // Recreate package archive.
  tar.create(
    {
      gzip: true,
      sync: true,
      file: `./dnb-ui-lib-v${packageJson.version}.tgz`
    },
    ['package/']
  )

  fs.removeSync('package')
}
