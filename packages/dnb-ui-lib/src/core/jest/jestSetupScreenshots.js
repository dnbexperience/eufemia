/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const { setupJestScreenshot } = require('jest-screenshot')
const puppeteer = require('puppeteer')

const testScreenshotOnHost = '127.0.0.1'
// use same port as the local dev setup, this way we can test from the dev setup as well
const testScreenshotOnPort = 8000
module.exports.testScreenshotOnHost = testScreenshotOnHost
module.exports.testScreenshotOnPort = testScreenshotOnPort

module.exports.testPageScreenshot = ({
  url = null,
  page = global.__PAGE__,
  selector,
  padding = true,
  text = null,
  simulate = null,
  transformElement = null
} = {}) =>
  new Promise(async (resolve, reject) => {
    try {
      if (!page) {
        const pages = await global.__BROWSER__.pages()
        if (pages[0]) {
          page = pages[0]
        }
      }

      if (url) {
        await global.__PAGE__.goto(createUrl(url))
      }

      await page.waitForSelector(selector)

      let screenshotElement = null
      const element = await page.$(selector)

      if (padding) {
        const id = `id-${Math.round(Math.random() * 9999)}`
        await page.$eval(
          selector,
          (node, { id }) => {
            const elem = document.createElement('div')
            elem.setAttribute('id', id)
            elem.classList.add('data-dnb-test-padding')
            node.parentNode.appendChild(elem)
            return elem.appendChild(node)
          },
          { id }
        )
        screenshotElement = await page.$(`#${id}`)
      } else {
        screenshotElement = element
      }

      if (text) {
        await page.$eval(
          selector,
          (node, { text }) => (node.innerText = text),
          { text }
        )
      }

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

      const screenshot = await screenshotElement.screenshot()

      // just to make sure we dont resolve, before the delayed click happened
      // so the next interation on the same url will have a reset state
      if (delay > 0) {
        await page.waitFor(delay)
      }

      resolve(screenshot)
    } catch (e) {
      reject(e)
    }
  })

module.exports.setupPageScreenshot = ({ timeout, url, ...rest } = {}) => {
  if (
    Object.keys(rest).length > 0 ||
    (expect && !expect.toMatchImageSnapshot)
  ) {
    setupJestScreenshot(rest)
  }

  const useUrl = createUrl(url)

  beforeAll(async () => {
    if (!global.__BROWSER__) {
      global.__BROWSER__ = await puppeteer.launch({
        // headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })
    }
    if (!global.__PAGE__) {
      const pages = await global.__BROWSER__.pages()
      global.__PAGE__ = pages[0]
        ? pages[0]
        : await global.__BROWSER__.newPage()
      await global.__PAGE__.setViewport({
        width: 800,
        height: 600,
        isMobile: false,
        hasTouch: false,
        isLandscape: false,
        deviceScaleFactor: 1
      })
    }
    await global.__PAGE__.goto(useUrl)
  }, timeout)

  afterAll(async () => {
    await global.__PAGE__.close()
    await global.__BROWSER__.close()
    global.__BROWSER__ = null
    global.__PAGE__ = null
  })
}

const createUrl = url =>
  `http://${testScreenshotOnHost}:${testScreenshotOnPort}/${url}?fullscreen&test`.replace(
    /\/\//g,
    '/'
  )
