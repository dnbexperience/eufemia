/**
 * Create new Build Version for gh-pages
 *
 */

import fs from 'fs-extra'
import path from 'path'
import { isCI } from 'ci-info'
import packageJson from '../package.json'

export const currentVersion = packageJson.buildVersion

// run only if the script was executed from command line
if (
  require.main === module &&
  process.argv.indexOf('--new-version') !== -1
) {
  createNewVersion()
  createNewChangelogVersion()
}

async function createNewVersion() {
  if (!isCI) {
    console.log(
      'You may only set a new deploy version on a CI environment!'
    )
    return false
  }
  try {
    const date = new Date().toLocaleString('nb-NO', {
      timeZone: 'Europe/Oslo'
    })
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

async function createNewChangelogVersion() {
  if (!isCI) {
    console.log(
      'You may only set a new deploy version on a CI environment!'
    )
    return false
  }
  try {
    const changelogFilePath = path.resolve(
      __dirname,
      '../../../',
      'CHANGELOG.md'
    )
    const content = await fs.readFile(changelogFilePath, 'utf-8')

    const version = String(/^#+\s(.*)\n/g.exec(content)[0])
      .replace(/#+/, '')
      .trim()

    const exportedFile = path.resolve(__dirname, '../', 'version.json')
    await fs.writeFile(exportedFile, JSON.stringify({ version }))
  } catch (e) {
    console.log(`Failed to create new static version file! \n${e.message}`)
  }
}
