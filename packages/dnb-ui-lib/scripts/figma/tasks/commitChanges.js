/**
 * Deploy all the stuff to a github page
 * There has to be a repo called: "gh-pages"
 *
 */

import dotenv from 'dotenv'
import ora from 'ora'
import path from 'path'
import simpleGit from 'simple-git/promise' // More info: https://github.com/steveukx/git-js#readme

// import .env variables
dotenv.config()

const log = ora()

const config = process.env.GH_NAME
  ? {
      user: {
        name: process.env.GH_NAME,
        email: process.env.GH_EMAIL
      }
    }
  : {}

const commitChanges = async ({
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

    const branchName = (await repo.branch()).current
    log.start(`> Icons: Commit new icons to the repo: ${branchName}`)

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

    // check if the changes where in the icons directories
    const hasChanges = filesToCommit.length > 0

    if (hasChanges) {
      if (config.user && config.user.name && config.user.email) {
        log.text = `> Icons: Add Git user: ${config.user.name}, ${
          config.user.email
        }`
        await repo.addConfig('user.name', config.user.name)
        await repo.addConfig('user.email', config.user.email)
      }

      const files = filesToCommit.map(f => path.basename(f))

      log.text = `> Icons: Add ${files.length} new icons`

      await repo.add(filesToCommit) // use "'./*'" for adding all files
      await repo.commit(
        `feat: New icons where automaticly added (${
          files.length
        }) [ci skip]`
      )
      await repo.push('origin', 'develop')

      log.succeed(`> Icons: These icons were successfully added: ${files}`)

      return files
    } else {
      log.succeed('> Icons: There where no icons to commit')
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
