/**
 * In case we want to remove some info from the package.json before we publish
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'

export const cleanupPackage = ({ packageJsonString, filepath }) =>
  new Promise(async (resolve, reject) => {
    try {
      const packageJson = JSON.parse(packageJsonString)
      delete packageJson.scripts
      delete packageJson.devDependencies

      const prettierrc = JSON.parse(
        await fs.readFile(
          path.resolve(packpath.self(), '.prettierrc'),
          'utf-8'
        )
      )

      const formattedPackageJson = prettier.format(
        JSON.stringify(packageJson),
        {
          ...prettierrc,
          filepath
        }
      )

      resolve(formattedPackageJson)
    } catch (e) {
      reject(e)
    }
  })

const prepareForRelease = () =>
  new Promise(async (resolve, reject) => {
    try {
      const filepath = path.resolve(packpath.self(), './package.json')
      const packageJsonString = await fs.readFile(filepath, 'utf-8')
      const formattedPackageJson = await cleanupPackage({
        packageJsonString,
        filepath
      })
      await fs.writeFile(filepath, formattedPackageJson)
    } catch (e) {
      reject(e)
    }
    resolve()
  })

export default prepareForRelease
