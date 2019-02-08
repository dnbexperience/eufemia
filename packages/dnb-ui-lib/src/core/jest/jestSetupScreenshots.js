/**
 * Jest Setup for Screenshot testing
 *
 */

const path = require('path')
const os = require('os')
const { setupJestScreenshot } = require('jest-screenshot')

const testScreenshotOnHost = '127.0.0.1'
const testScreenshotOnPort = 8000
module.exports.testScreenshotOnHost = testScreenshotOnHost
module.exports.testScreenshotOnPort = testScreenshotOnPort
module.exports.DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

const openPageScreenshot = url =>
  new Promise(async (resolve, reject) => {
    try {
      const _url = `http://${testScreenshotOnHost}:${testScreenshotOnPort}/${url}`.replace(
        /\/\//g,
        '/'
      )
      if (global.url !== _url) {
        global.page = await global.__BROWSER__.newPage()
        await global.page.goto(_url)
        global.url = _url
      }
      resolve(global.page)
    } catch (e) {
      reject(e)
    }
  })
module.exports.openPageScreenshot = openPageScreenshot

module.exports.testPageScreenshot = ({
  url = null,
  page = global.page,
  selector,
  simulate = null,
  transformElement = null
} = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      if (url) {
        page = await openPageScreenshot(url)
      }
      await page.waitForSelector(selector)
      const element = await page.$(selector)
      if (transformElement) {
        await transformElement(element)
      }

      let delay = 0

      if (simulate) {
        switch (simulate) {
          case 'hover':
            {
              await element.hover()
            }
            break

          case 'active':
            {
              // make a delayed click, no await. Else we get only a release state
              delay = 500
              element.click({
                delay // move the mouse
              })
            }
            break

          case 'focus':
            {
              await element.press('Tab') // to simulate pressing tab key before focus
              await element.focus()
            }
            break
        }
      }

      const screenshot = await element.screenshot()

      // just to make sure we dont resolve, before the delayed click happened
      if (delay > 0) {
        await wait(delay)
      }

      resolve(screenshot)
    } catch (e) {
      reject(e)
    }
  })

module.exports.setupPageScreenshot = ({ timeout, ...rest } = {}) => {
  if (timeout) {
    jest.setTimeout(timeout)
  }
  setupJestScreenshot(rest)
}

const wait = t => new Promise(r => setTimeout(r, t))
