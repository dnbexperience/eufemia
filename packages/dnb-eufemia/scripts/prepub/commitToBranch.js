/**
 * Commit changed and new files to the main branch
 *
 */

const dotenv = require('dotenv')
const { isCI } = require('repo-utils')
const ora = require('ora')
const path = require('path')
const simpleGit = require('simple-git/promise') // More info: https://github.com/steveukx/git-js#readme

// import .env variables
dotenv.config()

const log = ora()

const config = {
  remote: `https://${process.env.GH_TOKEN}@github.com/dnbexperience/eufemia.git`,
  user: {
    name: process.env.GH_NAME,
    email: process.env.GH_EMAIL,
  },
}

const getCurrentBranchName = async (repo = null) => {
  if (!repo) {
    repo = await getRepo()
  }
  return (await repo.branch()).current
}

const getRepo = async () => {
  const pathToRepo = path.resolve(__dirname, '../../../../')
  const repo = simpleGit(pathToRepo)

  // update the origin to use a token
  // cause CI has normally no write access to the repo
  if (isCI && config.remote) {
    await repo.removeRemote('origin')
    await repo.addRemote('origin', config.remote)
    log.info('Added new remote to origin')
  }

  return repo
}

const getRequiredBranchName = async ({
  repo = null,
  requiredBranch = null,
}) => {
  // in case we set the branch as an environment variable (see TravisCI config)
  const branchName =
    typeof process.env.BRANCH === 'string'
      ? process.env.BRANCH
      : await getCurrentBranchName(repo)

  if (!Array.isArray(requiredBranch)) {
    requiredBranch = [requiredBranch]
  }
  if (
    requiredBranch &&
    !requiredBranch.some((name) =>
      (name instanceof RegExp ? name : new RegExp(name)).test(branchName)
    )
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
  requiredBranch = 'main',
  newBranch = null,
  what = 'files',
  filePathsIncludelist = [],
  skipCI = false,
  isFeature = false,
  force = false,
} = {}) => {
  try {
    const repo = await getRepo()

    let branchName = await getRequiredBranchName({
      repo,
      requiredBranch,
    })

    // if the branch is not as required
    if (!branchName) {
      return []
    }

    log.start(`Commit: Commit new ${what} to the repo: ${branchName}`)

    const status = await repo.status()

    const filesToCommit = [...status.modified, ...status.not_added].filter(
      (f) =>
        new RegExp(
          Array.isArray(filePathsIncludelist)
            ? filePathsIncludelist.join('|')
            : filePathsIncludelist,
          'g'
        ).test(f)
    )

    // check if the changes where in the files directories
    const hasChanges = filesToCommit.length > 0

    if (hasChanges) {
      if (config.user && config.user.name && config.user.email) {
        log.info(
          `Commit: Add Git user: ${config.user.name}, ${config.user.email}`
        )
        await repo.addConfig('user.name', config.user.name)
        await repo.addConfig('user.email', config.user.email)
        log.info('> Commit: Added user details to the repo')
      }

      await repo.add(filesToCommit) // use "'./*'" for adding all files

      const files = filesToCommit.map((f) => path.basename(f))
      log.info(`Commit: Add ${files.length} new ${what}`)

      if (typeof isFeature === 'function') {
        isFeature = isFeature(files)
      }
      if (typeof skipCI === 'function') {
        skipCI = skipCI(files)
      }

      const commitMessage = String(
        `${
          isFeature ? 'feat:' : 'chore:'
        } some ${what} got added/changed during CI | ${files.join(', ')}${
          skipCI ? ' [skip ci]' : ''
        }`
      ).trim()
      log.info(`Commit: ${commitMessage}`)

      if (newBranch) {
        await repo.checkoutLocalBranch(newBranch)
        log.info(`Commit: created a new branch: ${newBranch}`)

        // Replace the branchName – because we want this one to push
        branchName = newBranch
      }

      await repo.commit(commitMessage, null, {
        '--no-verify': null,
      })
      await repo.push('origin', branchName, force ? ['--force'] : null)

      log.succeed(
        `Commit: These ${what} were successfully updated/added: ${files}`
      )

      return files
    } else {
      log.succeed(`Commit: There where no ${what} to commit`)
    }
  } catch (e) {
    log.fail(`Commit: Cached error with message:\n${e.message}\n`)
    console.log(e)
  }

  return []
}

exports.getRepo = getRepo
exports.commitToBranch = commitToBranch
exports.getRequiredBranchName = getRequiredBranchName
exports.getCurrentBranchName = getCurrentBranchName
