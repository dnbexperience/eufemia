const { exec } = require('child_process')

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

/**
 * Returns a list of files that were changed in the current branch
 *
 * NB: In order to use "git diff" fetch-depth: needs to be set to 2 or 0 (0 takes a long time) in GitHub Actions
 *
 * @returns {array} List of files
 */
const getCommittedFiles = async () => {
  const files = (await runCommand('git diff HEAD^ --name-only'))
    .split('\n')
    .filter(Boolean)

  return files
}

exports.runCommand = runCommand
exports.getCommittedFiles = getCommittedFiles
