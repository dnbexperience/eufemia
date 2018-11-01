/**
 * Deploy all the stuff to a github page
 * There has to be a repo called: "gh-pages"
 *
 */

import dotenv from 'dotenv'
import ghpages from 'gh-pages'
import pkg from '../package.json'
import ora from 'ora'

// import .env variables
dotenv.config()

const run = () => {
  const log = ora()
  log.start('Starting the deploy process...')

  const config = process.env.GH_USERNAME
    ? {
        silent: true,
        repo: `https://${
          process.env.GH_TOKEN
        }@github.com/dnbexperience/eufemia.git`,
        user: {
          name: process.env.GH_USERNAME,
          email: process.env.GH_EMAIL
        }
      }
    : {}

  /**
   * This adds commits with a custom message.
   */
  ghpages.publish(
    'public',
    {
      message: `Auto-generated deploy commit v${pkg.version}`,
      branch: 'develop',
      ...config
    },
    error => {
      if (error) {
        const msg = `Failed to deploy! \n${error.message}`
        log.fail(msg)
        throw msg
      }
      log.succeed(`Deployed successfully v${pkg.version}!`)
    }
  )
}

run()
