/**
 * Create new Build Version for gh-pages
 *
 */

import fs from 'fs'
import path from 'path'
import packageJson, { buildVersion } from '../package.json'

export const currentVersion = buildVersion
export const createNewVersion = async () => {
  try {
    const date = new Date().toLocaleString()
    packageJson.buildVersion = date

    // Update the extracted version of package.json with the build version
    await fs.writeFile(
      path.resolve(__dirname, '../package.json'),
      JSON.stringify(packageJson, null, 2)
    )

    console.log(`New version is ${date}!`)
  } catch (e) {
    console.log(`Failed to create new version! \n${e.message}`)
  }
}

// run only if the script was executed from command line
if (
  require.main === module &&
  process.argv.indexOf('--new-version') !== -1
) {
  createNewVersion()
}
