/**
 * Get next package version number before release
 *
 */

// When on a "release" branch:
// run: yarn nodemon --exec 'babel-node ./scripts/release/getNextReleaseVersion.js' --ext js --watch './scripts/**/*'
// run (mjs): yarn nodemon --exec 'node --experimental-import-meta-resolve ./scripts/release/getNextReleaseVersion.mjs' --ext mjs --watch './scripts/**/*'

const { exec } = require('child_process')
const getBranchName = require('current-git-branch')
const dotenv = require('dotenv')

dotenv.config()

const command = 'yarn workspace @dnb/eufemia semantic-release --dry-run'
const releaseBranches = ['release', 'beta', 'alpha']

// run this script if it is called from bash / command line
if (require.main === module) {
  getNextReleaseVersion()
}

async function getNextReleaseVersion() {
  const branchName = getBranchName()

  if (releaseBranches.includes(branchName)) {
    try {
      const log = await runCommand(command)
      const nextVersion = log.match(
        /The next release version is ([^\n]*)/
      )?.[1]

      if (nextVersion) {
        return nextVersion
      }
    } catch (e) {
      console.error(e)
    }
  } else {
    console.warn(
      `The current git branch ${branchName} is not one of the release branches ${releaseBranches.join(
        ','
      )}`
    )
  }

  return null
}

function runCommand(command) {
  return new Promise((resolve, reject) => {
    try {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(error)
        }
        if (stderr) {
          return reject(stderr)
        }
        return resolve(stdout)
      })
    } catch (e) {
      reject(e)
    }
  })
}

exports.releaseBranches = releaseBranches
exports.getNextReleaseVersion = getNextReleaseVersion
