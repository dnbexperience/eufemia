/**
 * Create new Build Version for gh-pages
 *
 */

const fs = require('fs-extra')
const path = require('path')
const { isCI } = require('repo-utils')
const {
  getNextReleaseVersion,
} = require('@dnb/eufemia/scripts/postbuild/getNextReleaseVersion')

const init = async () => {
  if (!isCI) {
    console.log(
      'You may only set a new deploy version on a CI environment!'
    )
    return false
  }

  await createBuildNewVersion()
  await createNewChangelogVersion()
  await createReleaseNewVersion()
}

exports.init = init

// run only if the script was executed from command line
if (
  require.main === module &&
  process.argv.indexOf('--new-version') !== -1
) {
  init()
}

async function createBuildNewVersion() {
  try {
    const file = path.resolve(__dirname, '../package.json')
    const packageJson = await fs.readJson(file)
    const date = new Date().toLocaleString('nb-NO', {
      timeZone: 'Europe/Oslo',
    })
    packageJson.buildVersion = date

    // Update the extracted version of package.json with the build version
    await fs.writeFile(file, JSON.stringify(packageJson, null, 2))

    console.log(`New build version is ${date}`)
  } catch (e) {
    console.warn(`Failed to create new build version! \n${e.message}`)
  }
}

async function createReleaseNewVersion() {
  try {
    const file = path.resolve(__dirname, '../package.json')
    const packageJson = await fs.readJson(file)
    const version = (await getNextReleaseVersion()) || 'Not released'
    packageJson.releaseVersion = version

    // Update the extracted version of package.json with the build version
    await fs.writeFile(file, JSON.stringify(packageJson, null, 2))

    console.log(`New release version is ${version}`)
  } catch (e) {
    console.warn(`Failed to create new release version! \n${e.message}`)
  }
}

async function createNewChangelogVersion() {
  try {
    const file = path.resolve(__dirname, '../package.json')
    const packageJson = await fs.readJson(file)
    const changelogFilePath = path.resolve(
      __dirname,
      '../src/docs/EUFEMIA_CHANGELOG.md'
    )
    const content = await fs.readFile(changelogFilePath, 'utf-8')

    const changelogVersion = String(/^#+\s(.*)\n/g.exec(content)[0])
      .replace(/#+/, '')
      .trim()

    packageJson.changelogVersion = changelogVersion

    // Update the extracted version of package.json with the change log version
    await fs.writeFile(file, JSON.stringify(packageJson, null, 2))
  } catch (e) {
    console.warn(
      `Failed to create new static version file! \n${e.message}`
    )
  }
}
