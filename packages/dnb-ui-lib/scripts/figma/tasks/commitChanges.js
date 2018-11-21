/**
 * Commit changed and new files to the develop repo
 *
 */

import dotenv from 'dotenv'
import { isCI } from 'ci-info'
import ora from 'ora'
import path from 'path'
import simpleGit from 'simple-git/promise' // More info: https://github.com/steveukx/git-js#readme

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

const commitChanges = async ({
  what = 'icons',
  filePathsWhitelist = [
    '/src/icons/',
    '/assets/icons/',
    '.version.lock',
    'icons.lock'
  ]
} = {}) => {
  const pathToRepo = path.resolve('../../')

  try {
    const repo = simpleGit(pathToRepo)

    // update the origin to use a token
    // cause CI has normally no write access to the repo
    if (isCI && config.remote) {
      await repo.removeRemote('origin')
      await repo.addRemote('origin', config.remote)
      log.text = '> Commit: Added new remote to origin'
    }

    const branchName = (await repo.branch()).current
    log.start(`> Commit: Commit new files to the repo: ${branchName}`)

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

      const files = filesToCommit.map(f => path.basename(f))

      log.text = `> Commit: Add ${files.length} new ${what}`

      await repo.add(filesToCommit) // use "'./*'" for adding all files
      await repo.commit(
        `feat: ${
          files.length
        } ${what} where updated/added [ci skip] | ${files.join(', ')}`
      )
      await repo.push('origin', branchName)

      log.succeed(
        `> Commit: These ${what} were successfully updated/added: ${files}`
      )

      return files
    } else {
      log.succeed(`> Commit: There where no ${what} to commit`)
    }
  } catch (e) {
    log.fail(e)
  }

  return []
}

if (require.main === module) {
  commitChanges()
}

export default commitChanges
