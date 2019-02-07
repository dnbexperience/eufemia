/**
 * Jest Setup for Screenshot testing
 *
 */

const path = require('path')
const os = require('os')

const testScreenshotOnHost = '127.0.0.1'
const testScreenshotOnPort = 8000
module.exports.testScreenshotOnHost = testScreenshotOnHost
module.exports.testScreenshotOnPort = testScreenshotOnPort
module.exports.DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

module.exports.testPageScreenshot = ({
  selector,
  url,
  transformElement = null
} = {}) =>
  new Promise(async (resolve, reject) => {
    // await startScreenshotServer()
    try {
      await global.page.goto(
        `http://${testScreenshotOnHost}:${testScreenshotOnPort}/${url}`.replace(
          /\/\//g,
          '/'
        )
      )
      await global.page.waitForSelector(selector)
      const element = await global.page.$(selector)
      if (transformElement) {
        await transformElement(element)
      }
      const screenshot = await element.screenshot()

      resolve(screenshot)
    } catch (e) {
      reject(e)
    }
  })

module.exports.setupPageScreenshot = (options = { timeout: 10e3 }) => {
  // make sure jest is waiting for 10 sec
  jest.setTimeout(options.timeout)

  // beforeEach(async done => {
  beforeAll(async done => {
    global.page = await global.__BROWSER__.newPage()
    done()
  })
  afterAll(async done => {
    if (global.page) {
      global.page.close()
    }
    done()
  })
}
