/**
 * Jest Setup for Screenshot testing
 *
 */

const rimraf = require('rimraf')
const liveServer = require('live-server')
const { DIR } = require('./jestSetupScreenshots')

module.exports = async function() {
  if (liveServer.shutdown) {
    liveServer.shutdown()
  }

  // close the browser instance
  await global.__BROWSER_GLOBAL__.close()

  // clean-up the wsEndpoint file
  rimraf.sync(DIR)
}
