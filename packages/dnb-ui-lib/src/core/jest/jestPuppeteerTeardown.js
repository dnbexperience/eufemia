/**
 * Jest Setup for Screenshot testing
 *
 */

const chalk = require('chalk')
const rimraf = require('rimraf')
const liveServer = require('live-server')
const { DIR } = require('./jestSetupScreenshots')

module.exports = async function() {
  console.log(chalk.yellow('Teardown Puppeteer.'))

  // close the browser instance
  await global.__BROWSER_GLOBAL__.close()

  // clean-up the wsEndpoint file
  rimraf.sync(DIR)

  if (liveServer.shutdown) {
    liveServer.shutdown()
  }
}
