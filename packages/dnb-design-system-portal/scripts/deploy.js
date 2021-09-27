/**
 * Deploy all the stuff to a github page
 * There has to be a repo called: "gh-pages"
 *
 */

const dotenv = require('dotenv')
const ghpages = require('gh-pages')
const { name: CIName } = require('ci-info')
const ora = require('ora')
const { currentVersion } = require('./version.js')

// import .env variables
dotenv.config()

const run = () => {
  const log = ora()
  log.start('Starting the deploy process...')

  const config = process.env.GH_NAME
    ? {
        repo: `https://${process.env.GH_TOKEN}@github.com/dnbexperience/eufemia.git`,
        user: {
          name: process.env.GH_NAME,
          email: process.env.GH_EMAIL,
        },
      }
    : {}

  /**
   * This adds commits with a custom message.
   */
  ghpages.publish(
    'public',
    {
      message: `Auto-generated deploy commit by ${
        CIName || 'localhost'
      } ${currentVersion} [CI SKIP]`,
      branch: 'gh-pages',
      ...config,
    },
    (error) => {
      if (error) {
        return log.fail(`Failed to deploy! \n${error.message}`)
      }
      log.succeed(`Deployed successfully, version ${currentVersion}!`)
    }
  )
}

if (process.env.DRONE) {
  run()
}
