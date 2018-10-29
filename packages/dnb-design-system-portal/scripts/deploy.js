/**
 * Deploy all the stuff to a github page
 * There has to be a repo called: "gh-pages"
 *
 */

import ghpages from 'gh-pages'
import pkg from '../package.json'
import ora from 'ora'

const run = () => {
  const log = ora()
  log.start('Starting the deploy process...')

  /**
   * This adds commits with a custom message.
   */
  ghpages.publish(
    'public',
    {
      message: `Auto-generated deploy commit v${pkg.version}`
    },
    error => {
      if (error) {
        log.fail(`Failed to deploy! \n${error.message}`)
        return
      }
      log.succeed(`Deployed successfully v${pkg.version}!`)
    }
  )
}

run()
