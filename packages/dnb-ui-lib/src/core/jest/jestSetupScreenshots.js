/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const path = require('path')
const os = require('os')
const isCI = require('is-ci')
const { setupJestScreenshot } = require('jest-screenshot')

const testScreenshotOnHost = '127.0.0.1'
// use same port as the local dev setup, this way we can test from the dev setup as well
const testScreenshotOnPort = 8000
module.exports.testScreenshotOnHost = testScreenshotOnHost
module.exports.testScreenshotOnPort = testScreenshotOnPort
module.exports.DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

const openPageScreenshot = (url, { cachePages } = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      const gotoUrl = `http://${testScreenshotOnHost}:${testScreenshotOnPort}/${url}`.replace(
        /\/\//g,
        '/'
      )

      if (global.gotoUrl !== gotoUrl) {
        global.page = await global.__BROWSER__.newPage()
        global.page.setViewport({
          width: 800,
          height: 600,
          isMobile: false,
          hasTouch: false,
          isLandscape: false,
          deviceScaleFactor: 1
        })
        await global.page.goto(gotoUrl)
        if (cachePages) {
          global.gotoUrl = gotoUrl
        }
      }

      resolve(global.page)
    } catch (e) {
      reject(e)
    }
  })
module.exports.openPageScreenshot = openPageScreenshot

module.exports.testPageScreenshot = ({
  url = null,
  cachePages = !isCI,
  page = null,
  selector,
  simulate = null,
  transformElement = null
} = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      if (url && !page) {
        page = await openPageScreenshot(url, { cachePages })
        await page.waitForSelector(selector)
      }

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

      if (!cachePages) {
        page.close()
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
