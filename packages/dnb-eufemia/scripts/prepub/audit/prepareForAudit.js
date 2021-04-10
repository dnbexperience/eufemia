/**
 * Because of an Yarn bug, where devDependencies do not get checked by audit,
 * we rename devDependencies to optionalDependencies and vice versa
 *
 * Issues: https://github.com/yarnpkg/yarn/issues/6632
 * PR: https://github.com/yarnpkg/yarn/pull/6724
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'

// if (require.main === module) {
//   renameDependencies('auto')
// }

function renameDependencies(direction = 'auto') {
  return async () => {
    const filepath = path.resolve(packpath.self(), './package.json')
    const packageJson = JSON.parse(
      (await fs.readFile(filepath)).toString()
    )

    if (direction === 'auto' && packageJson.devDependencies) {
      direction = 'fromDevToOpt'
    }

    try {
      switch (direction) {
        case 'fromDevToOpt':
          {
            if (packageJson.devDependencies) {
              packageJson.optionalDependencies =
                packageJson.devDependencies
              delete packageJson.devDependencies
            } else
              throw new Error(
                'Could not rename pkg key! There has to exist: devDependencies'
              )
          }
          break
        default:
        case 'fromOptToDev':
          {
            if (packageJson.optionalDependencies) {
              packageJson.devDependencies =
                packageJson.optionalDependencies
              delete packageJson.optionalDependencies
            } else
              throw new Error(
                'Could not rename pkg key! There has to exist: optionalDependencies'
              )
          }
          break
      }
    } catch (e) {
      throw new Error(e)
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
  }
}

export default renameDependencies
