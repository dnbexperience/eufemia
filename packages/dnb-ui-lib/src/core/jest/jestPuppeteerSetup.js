/**
 * Jest Setup for Screenshot testing
 *
 */

const chalk = require('chalk')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const isCI = require('is-ci')
const liveServer = require('live-server')
const detectPort = require('detect-port')
const {
  DIR,
  testScreenshotOnHost,
  testScreenshotOnPort
} = require('./jestSetupScreenshots')

module.exports = async function() {
  console.log(chalk.green('Setup Puppeteer'))
  const portIsAvailable = await detectPort(testScreenshotOnPort)
  if (testScreenshotOnPort === portIsAvailable) {
    const params = {
      port: testScreenshotOnPort,
      host: testScreenshotOnHost,
      root: '../dnb-design-system-portal/public',
      open: false,
      watch: '',
      quiet: isCI,
      wait: 10e3
    }
    liveServer.start(params)
    // liveServer.server.addListener('listening', () => () => {
    // })
  }

  const browser = await puppeteer.launch()
  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}
