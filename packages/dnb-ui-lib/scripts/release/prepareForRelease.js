/**
 * In case we want to remove some info from the package.json before we publish
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'

function prepareForRelease() {
  new Promise(async (resolve, reject) => {
    const filepath = path.resolve(packpath.self(), './package.json')
    const packageJson = JSON.parse(
      (await fs.readFile(filepath)).toString()
    )

    try {
      delete packageJson.scripts
      delete packageJson.devDependencies
    } catch (e) {
      reject(e)
    }

    const prettierrc = JSON.parse(
      await fs.readFile(
        path.resolve(packpath.self(), '.prettierrc'),
        'utf-8'
      )
    )

    const newPackageJson = JSON.stringify(packageJson, null, 2)
    const formattedPackageJson = prettier.format(newPackageJson, {
      ...prettierrc,
      filepath
    })

    await fs.writeFile(filepath, formattedPackageJson)

    resolve()
  })
}

export default prepareForRelease
