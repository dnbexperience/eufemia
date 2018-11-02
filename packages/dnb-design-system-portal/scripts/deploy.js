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

  const config = process.env.GH_NAME
    ? {
        silent: true,
        repo: `https://${
          process.env.GH_TOKEN
        }@github.com/dnbexperience/eufemia.git`,
        user: {
          name: process.env.GH_NAME,
          email: process.env.GH_EMAIL
        }
      }
    : {}

  console.debug('gh-pages config', {
    message: `Auto-generated deploy commit v${pkg.version}`,
    branch: 'gh-pages',
    ...config
  })

  /**
   * This adds commits with a custom message.
   */
  ghpages.publish(
    'public',
    {
      message: `Auto-generated deploy commit v${pkg.version}`,
      branch: 'gh-pages',
      ...config
    },
    error => {
      if (error) {
        log.fail(`Failed to deploy! \n${error.message}`)
      }
      log.succeed(`Deployed successfully v${pkg.version}!`)
    }
  )
}

run()
