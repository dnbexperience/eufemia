/**
 * Jest Setup for Screenshot testing
 *
 */

const chalk = require('chalk')
const puppeteer = require('puppeteer')
const mkdirp = require('mkdirp')
const path = require('path')
const fs = require('fs-extra')
const { exec } = require('child_process')
const detectPort = require('detect-port')
const waitOn = require('wait-on')
const {
  DIR,
  headless,
  defaultViewport,
  testScreenshotOnHost,
  testScreenshotOnPort,
} = require('./jestSetupScreenshots').config

const startStaticServer = async () => {
  try {
    const portIsAvailable = await detectPort(testScreenshotOnPort)
    if (testScreenshotOnPort === portIsAvailable) {
      const publicDirExusts = fs.existsSync(
        require.resolve('dnb-design-system-portal/public/index.html')
      )

      if (publicDirExusts) {
        global.startedGatsbyServe = true

        // Do not wait for exec to end
        const command = `yarn workspace dnb-design-system-portal gatsby serve -p ${testScreenshotOnPort}`
        exec(command)

        await waitOn({
          resources: [
            `http://${testScreenshotOnHost}:${testScreenshotOnPort}`,
          ],
        })
      } else {
        throw new Error(
          'No /public folder found. Make sure you run "yarn workspace dnb-design-system-portal build-visual-test" first!'
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
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  // use the file system to expose the wsEndpoint for TestEnvironments
  mkdirp.sync(DIR)
  await fs.writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint())

  // store the browser instance so we can teardown it later
  // this global is only available in the teardown but not in TestEnvironments
  global.__ENDPOINT__ = browser
}
