/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const { setupJestScreenshot } = require('jest-screenshot')

const testScreenshotOnHost = '127.0.0.1'
// use same port as the local dev setup, this way we can test from the dev setup as well
const testScreenshotOnPort = 8000
module.exports.testScreenshotOnHost = testScreenshotOnHost
module.exports.testScreenshotOnPort = testScreenshotOnPort
module.exports.DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup')

const pageSettings = {
  width: 800,
  height: 600,
  isMobile: false,
  hasTouch: false,
  isLandscape: false,
  deviceScaleFactor: 1
}

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
        await page.goto(createUrl(url))
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

      // await page.waitFor(6e3)

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
    const context = await global.__BROWSER__.createIncognitoBrowserContext()
    const page = await context.newPage()

    // await page._client.send('ServiceWorker.enable')
    // await page._client.send('ServiceWorker.stopAllWorkers')
    // await page._client.send('ServiceWorker.unregister', {
    //   scopeURL: `http://${testScreenshotOnHost}:${testScreenshotOnPort}`
    // })

    await page.setViewport(pageSettings)
    await page.goto(useUrl)

    global.__PAGE__ = page
  }, timeout)

  afterAll(async () => {
    await global.__PAGE__.close()
    global.__PAGE__ = null
  })
}

module.exports.setupJestScreenshot = setupJestScreenshot
module.exports.loadImage = async imagePath =>
  await fs.readFile(path.resolve(imagePath))

// make sure "${url}/" has actually a slash on the end
const createUrl = url =>
  `http://${testScreenshotOnHost}:${testScreenshotOnPort}/${url}/?fullscreen&test`.replace(
    /\/\//g,
    '/'
  )
