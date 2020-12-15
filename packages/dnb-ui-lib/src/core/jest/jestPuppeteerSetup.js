/**
 * Jest Setup for Screenshot testing
 *
 */

const chalk = require('chalk')
// const serve = require('gatsby/dist/commands/serve')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs')
const isCI = require('is-ci')
const liveServer = require('live-server')
const detectPort = require('detect-port')
const waitOn = require('wait-on')
const packpath = require('packpath')
const {
  DIR,
  headless,
  defaultViewport,
  testScreenshotOnHost,
  testScreenshotOnPort
} = require('./jestSetupScreenshots').config

const startStaticServer = async () => {
  try {
    const portIsAvailable = await detectPort(testScreenshotOnPort)
    if (testScreenshotOnPort === portIsAvailable) {
      const root = path.resolve(
        packpath.self(),
        '../dnb-design-system-portal/public/'
      )
      if (fs.existsSync(root)) {
        liveServer.start({
          host: testScreenshotOnHost,
          port: testScreenshotOnPort,
          root,
          open: false,
          watch: [],
          quiet: isCI,
          wait: 10e3
        })
        await waitOn({
          resources: [
            `http://${testScreenshotOnHost}:${testScreenshotOnPort}`
          ]
        })
      } else {
        throw new Error(
          'No /public folder found. Make sure you run "yarn workspace dnb-design-system-portal build" first!'
        )
      }
    }
  } catch (e) {
    throw new Error(e)
  }
}

module.exports = async function () {
  console.log(chalk.green('Setup Puppeteer'))
  await startStaticServer()

  const browser = await puppeteer.launch({
    defaultViewport,
    headless,
    devtools: !headless,
    // to get rid of the "libX11-xcb.so" missing problem, we set these flags
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__BROWSER_GLOBAL__ = browser

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR)
  fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())
}
