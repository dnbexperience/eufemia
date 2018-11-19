/**
 * Deploy all the stuff to a github page
 * There has to be a repo called: "gh-pages"
 *
 */

import dotenv from 'dotenv'
import ora from 'ora'
import path from 'path'
import simpleGit from 'simple-git/promise'

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

const commitNewIcons = async ({
  iconsPath = '/src/icons/|/assets/icons/'
} = {}) => {
  const pathToRepo = path.resolve('../../')

  try {
    const repo = simpleGit(pathToRepo)

    const branchName = (await repo.branch()).current
    log.start(`> Icons: Commit new icons to the repo: ${branchName}`)

    const status = await repo.status()

    // check if the changes where in the icons directories
    const hasNewIcons =
      status.modified.filter(f => new RegExp(iconsPath, 'g').test(f))
        .length > 0

    if (config.user && config.user.name && config.user.email) {
      log.text = `> Icons: Add Git user: ${config.user.name}, ${
        config.user.email
      }`
      await repo.addConfig('user.name', config.user.name)
      await repo.addConfig('user.email', config.user.email)
    }

    if (hasNewIcons) {
      const files = status.modified.map(f => path.basename(f))

      log.text = `> Icons: Add ${files.length} new icons`

      await repo.add('./*')
      await repo.commit(
        `feat: new icons where automaticly added | ${files}`
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
  commitNewIcons()
}

export default commitNewIcons
