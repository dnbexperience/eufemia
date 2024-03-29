/**
 * Remove some info from the package.json before publish
 *
 */

import path from 'path'
import fs from 'fs-extra'
import packpath from 'packpath'
import prettier from 'prettier'

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
    filepath,
  })
  await fs.writeFile(dest, formattedPackageJson)
}

// export for testing
export async function cleanupPackage({ packageString, filepath }) {
  const packageJson = JSON.parse(packageString)
  delete packageJson.release
  delete packageJson.scripts
  delete packageJson.devDependencies
  delete packageJson.resolutions
  delete packageJson.volta

  const prettierrc = JSON.parse(
    await fs.readFile(
      path.resolve(packpath.self(), '.prettierrc'),
      'utf-8'
    )
  )

  return await prettier.format(JSON.stringify(packageJson), {
    ...prettierrc,
    filepath,
  })
}
