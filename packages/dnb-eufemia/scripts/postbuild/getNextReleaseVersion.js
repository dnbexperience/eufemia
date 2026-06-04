/**
 * Get next package version number before release
 *
 */

// When on a "release" branch:
// run: yarn nodemon --exec 'babel-node --extensions .js,.ts,.tsx ./scripts/postbuild/getNextReleaseVersion.js' --ext js --watch './scripts/**/*'
// run (mjs): yarn nodemon --exec 'node --experimental-import-meta-resolve ./scripts/postbuild/getNextReleaseVersion.mjs' --ext mjs --watch './scripts/**/*'

const { execFile } = require('child_process')
const path = require('path')
const simpleGit = require('simple-git')

try {
  process.loadEnvFile()
} catch {
  // .env is optional — CI provides env vars directly
}

const srBin = require.resolve('semantic-release/bin/semantic-release.js')
const eufemiaRoot = path.resolve(__dirname, '..', '..')
const releaseBranches = ['release', 'beta', 'alpha']

// run this script if it is called from bash / command line
if (require.main === module) {
  getNextReleaseVersion()
}

async function getNextReleaseVersion() {
  const branchName = (await simpleGit().branch()).current

  if (releaseBranches.includes(branchName)) {
    try {
      const log = await new Promise((resolve) => {
        execFile(
          process.execPath,
          [srBin, '--dry-run'],
          { timeout: 120000, cwd: eufemiaRoot },
          (_error, stdout, stderr) => {
            // Resolve with combined output regardless of exit code —
            // semantic-release may exit non-zero in dry-run mode
            // even after printing the next version.
            resolve((stdout || '') + (stderr || ''))
          }
        )
      })
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

exports.releaseBranches = releaseBranches
exports.getNextReleaseVersion = getNextReleaseVersion
