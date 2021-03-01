/**
 * Remove some info from the package.json before publish
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'
import { asyncForEach } from '../tools'

// run this script if it is called from bash / command line
if (require.main === module) {
  prepareForRelease()
}

export default async function prepareForRelease() {
  const filepath = path.resolve(packpath.self(), './package.json')
  const dest = path.resolve(packpath.self(), 'build', './package.json')
  const packageString = await fs.readFile(filepath, 'utf-8')
  const formattedPackageJson = await cleanupPackage({
    packageString,
    filepath
  })
  await fs.writeFile(dest, formattedPackageJson)

  /**
   * TODO:
   *
   * 1. Because "prepareForRelease" runs before the version is set,
   * We could have to run a API provided by semantic-release,
   * That can give us the next calculated version, so we can write it, before release.
   *
   * 2. We also would have to find a different method to make that available.
   * Because in production, it looks like the "window.Eufemia" is not accessible.
   */
  // await writeLibVersion({ version: ...})
}

// export for testing
export async function cleanupPackage({ packageString, filepath }) {
  const packageJson = JSON.parse(packageString)
  delete packageJson.release
  delete packageJson.scripts
  delete packageJson.devDependencies
  delete packageJson.resolutions
  delete packageJson.publishConfig
  delete packageJson.volta

  // Add required fields
  packageJson.type = 'module'

  const prettierrc = JSON.parse(
    await fs.readFile(
      path.resolve(packpath.self(), '.prettierrc'),
      'utf-8'
    )
  )

  return prettier.format(JSON.stringify(packageJson), {
    ...prettierrc,
    filepath
  })
}

// make version accessible
export async function writeLibVersion({
  version = null,
  destPath = path.resolve(packpath.self(), './build'),
  files = [
    './index.js',
    './components/index.js',
    './elements/index.js',
    './patterns/index.js'
  ]
} = {}) {
  if (!version) {
    const filepath = path.resolve(packpath.self(), './package.json')
    const packageJson = JSON.parse(await fs.readFile(filepath, 'utf-8'))
    version = packageJson.version
  }

  try {
    await asyncForEach(files, async (file) => {
      const filePath = path.resolve(destPath, file)
      const fileContent = await fs.readFile(filePath, 'utf-8')
      const versionString = `
if(typeof window !== 'undefined'){
  window.Eufemia = window.Eufemia || {};
  window.Eufemia.version = '${version}';
}
`

      if (!fileContent.includes('window.Eufemia.version')) {
        await fs.writeFile(filePath, `${fileContent}${versionString}`)
      }
    })

    if (require.main === module) {
      console.info(
        `prepareForRelease: Has written version ${version} to files`
      )
    }
  } catch (e) {
    console.error('prepareForRelease: Could not write version to files')
  }
}
