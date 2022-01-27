/**
 * Create new Build Version for gh-pages
 *
 */

const fs = require('fs-extra')
const path = require('path')
const { isCI } = require('repo-utils')
const packageJson = require('../package.json')

exports.currentVersion = packageJson.buildVersion

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
      timeZone: 'Europe/Oslo',
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
      'EUFEMIA_CHANGELOG.md'
    )
    const content = await fs.readFile(changelogFilePath, 'utf-8')

    const changelogVersion = String(/^#+\s(.*)\n/g.exec(content)[0])
      .replace(/#+/, '')
      .trim()

    packageJson.changelogVersion = changelogVersion

    // Update the extracted version of package.json with the change log version
    await fs.writeFile(
      path.resolve(__dirname, '../package.json'),
      JSON.stringify(packageJson, null, 2)
    )
  } catch (e) {
    console.log(`Failed to create new static version file! \n${e.message}`)
  }
}

exports.createNewVersion = createNewVersion
exports.createNewChangelogVersion = createNewChangelogVersion
