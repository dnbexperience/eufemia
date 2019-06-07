/**
 * Commit changed and new files to the develop repo
 *
 */

const dotenv = require('dotenv')
const { isCI } = require('ci-info')
const ora = require('ora')
const path = require('path')
const simpleGit = require('simple-git/promise') // More info: https://github.com/steveukx/git-js#readme

// we use common js to run this, as this is also used by other packages in the repo
// import dotenv from 'dotenv'
// import { isCI } from 'ci-info'
// import ora from 'ora'
// import path from 'path'
// import simpleGit from 'simple-git/promise' // More info: https://github.com/steveukx/git-js#readme

// import .env variables
dotenv.config()

const log = ora()

const config = {
  remote: `https://${
    process.env.GH_TOKEN
  }@github.com/dnbexperience/eufemia.git`,
  user: {
    name: process.env.GH_NAME,
    email: process.env.GH_EMAIL
  }
}

const getCurrentBranchName = async () => {
  const pathToRepo = path.resolve(__dirname, '../../../../')
  const repo = simpleGit(pathToRepo)
  return (await repo.branch()).current
}

const makeRepo = async () => {
  const pathToRepo = path.resolve(__dirname, '../../../../')
  const repo = simpleGit(pathToRepo)

  await repo.silent(true)

  // update the origin to use a token
  // cause CI has normally no write access to the repo
  if (isCI && config.remote) {
    await repo.removeRemote('origin')
    await repo.addRemote('origin', config.remote)
    log.text = '> Commit: Added new remote to origin'
  }

  return repo
}

const getBranchName = async ({ repo = null, requiredBranch = null }) => {
  // in case we set the branch as an enviroment variable (see TravisCI config)
  const branchName =
    typeof process.env.BRANCH === 'string'
      ? process.env.BRANCH
      : (await (repo || (await makeRepo())).branch()).current

  if (typeof requiredBranch === 'string') {
    requiredBranch = [requiredBranch]
  }
  if (
    requiredBranch &&
    !requiredBranch.some(name => new RegExp(name).test(branchName))
  ) {
    log.fail(
      `The current branch (${branchName}) was not the required one: ${requiredBranch.join(
        ' or '
      )}`
    )
    return false
  }

  return branchName
}

const commitToBranch = async ({
  requiredBranch = 'develop',
  what = 'files',
  filePathsWhitelist = [],
  isNotAFeature = null,
  skipCI = false,
  isFeature = true
} = {}) => {
  try {
    const repo = await makeRepo()

    const branchName = await getBranchName({ repo, requiredBranch })

    // if the branch is not as required
    if (!branchName) {
      return []
    }

    log.start(`> Commit: Commit new ${what} to the repo: ${branchName}`)

    const status = await repo.status()

    const filesToCommit = [...status.modified, ...status.not_added].filter(
      f =>
        new RegExp(
          Array.isArray(filePathsWhitelist)
            ? filePathsWhitelist.join('|')
            : filePathsWhitelist,
          'g'
        ).test(f)
    )

    // check if the changes where in the files directories
    const hasChanges = filesToCommit.length > 0

    if (hasChanges) {
      if (config.user && config.user.name && config.user.email) {
        log.text = `> Commit: Add Git user: ${config.user.name}, ${
          config.user.email
        }`
        await repo.addConfig('user.name', config.user.name)
        await repo.addConfig('user.email', config.user.email)
        log.text = '> Commit: Added user details to the repo'
      }

      await repo.add(filesToCommit) // use "'./*'" for adding all files

      const files = filesToCommit.map(f => path.basename(f))
      log.text = `> Commit: Add ${files.length} new ${what}`

      // as there is too ofter only a "version.lock" update, we filter out this
      if (
        Array.isArray(isNotAFeature) &&
        files.every(i => isNotAFeature.includes(i))
      )
        isFeature = false

      if (typeof skipCI === 'function') {
        const skipCIResult = skipCI(files)
        if (typeof skipCIResult === 'boolean') {
          skipCI = skipCIResult
        }
      }

      const commitMessage = String(
        `${
          isFeature ? 'feat:' : ''
        } some ${what} where updated/added | ${files.join(', ')}${
          skipCI ? ' [CI SKIP]' : ''
        }`
      ).trim()
      log.text = `> Commit: ${commitMessage}`

      await repo.commit(commitMessage)
      await repo.push('origin', branchName)

      log.succeed(
        `> Commit: These ${what} were successfully updated/added: ${files}`
      )

      return files
    } else {
      log.succeed(`> Commit: There where no ${what} to commit`)
    }
  } catch (e) {
    log.fail(`> Commit: Cached error with message:\n${e.message}\n`)
    console.log(e)
  }

  return []
}

exports.commitToBranch = commitToBranch
exports.getBranchName = getBranchName
exports.getCurrentBranchName = getCurrentBranchName

// we use common js to run this, as this is also used by other packages in the repo
// export { getBranchName, commitToBranch }
