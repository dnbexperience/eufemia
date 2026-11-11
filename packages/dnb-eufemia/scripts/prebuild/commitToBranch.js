/**
 * Git helpers for the prebuild and Figma scripts
 *
 */

const { isCI } = require('repo-utils')
const ora = require('ora')
const path = require('path')
const { simpleGit } = require('simple-git') // More info: https://github.com/steveukx/git-js#readme

try {
  process.loadEnvFile()
} catch {
  // .env is optional — CI provides env vars directly
}

const log = ora()

const getCurrentBranchName = async (repo = null) => {
  if (!repo) {
    repo = await getRepo()
  }
  return (await repo.branch()).current
}

const getRepo = async () => {
  const pathToRepo = path.resolve(__dirname, '../../../../')
  const repo = simpleGit(pathToRepo, {
    allowEnvironment: [
      'GIT_CONFIG_COUNT',
      'GIT_CONFIG_KEY_0',
      'GIT_CONFIG_VALUE_0',
    ],
    unsafe: {
      allowUnsafeConfigEnvCount: true,
    },
  })

  // Authenticate via http.extraheader instead of embedding the PAT in
  // the remote URL — keeps the token out of .git/config and error output.
  if (isCI && process.env.GH_TOKEN) {
    const authHeader = Buffer.from(
      `x-access-token:${process.env.GH_TOKEN}`
    ).toString('base64')

    // simple-git throws on the git variables it guards when they are passed
    // explicitly, so leave out the ones inherited from the environment
    const env = Object.fromEntries(
      Object.entries(process.env).filter(
        ([key]) =>
          !/^(GIT_.*|EDITOR|VISUAL|PAGER|PREFIX|SSH_ASKPASS)$/i.test(key)
      )
    )

    repo.env({
      ...env,
      GIT_CONFIG_COUNT: '1',
      GIT_CONFIG_KEY_0: 'http.https://github.com/.extraheader',
      GIT_CONFIG_VALUE_0: `AUTHORIZATION: basic ${authHeader}`,
    })

    log.info('Configured git auth via extraheader')
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

exports.getRepo = getRepo
exports.getRequiredBranchName = getRequiredBranchName
exports.getCurrentBranchName = getCurrentBranchName
