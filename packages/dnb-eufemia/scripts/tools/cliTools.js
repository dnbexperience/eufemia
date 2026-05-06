const { execFile } = require('child_process')

function runCommand(command) {
  return new Promise((resolve, reject) => {
    try {
      execFile('/bin/sh', ['-lc', command], (error, stdout, stderr) => {
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
const getCommittedFiles = async (countCommits = 10) => {
  try {
    const history = await runCommand(
      `git rev-list --max-count=${countCommits + 1} HEAD`
    )
    const commits = history.split('\n').filter(Boolean)

    if (commits.length === 0) {
      return []
    }

    const files = (
      commits.length === 1
        ? await runCommand(
            'git -c diff.renames=0 show --pretty="format:" --name-only HEAD'
          )
        : await runCommand(
            `git -c diff.renames=0 diff --name-only ${commits[commits.length - 1]}..HEAD`
          )
    )
      .split('\n')
      .filter(Boolean)

    return files
  } catch {
    return []
  }
}

exports.runCommand = runCommand
exports.getCommittedFiles = getCommittedFiles
