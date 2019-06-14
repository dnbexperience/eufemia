/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const fs = require('fs-extra')
const path = require('path')
const isCI = require('is-ci')
const os = require('os')
const { setupJestScreenshot } = require('jest-screenshot')

const config = {
  DIR: path.join(os.tmpdir(), 'jest_puppeteer_global_setup'),
  // use same port as the local dev setup, this way we can test from the dev setup as well
  // testScreenshotOnHost: isCI ? '127.0.0.1' : 'localhost',
  testScreenshotOnHost: 'localhost',
  testScreenshotOnPort: 8000,
  headless: true,
  blockFontRequest: true,
  allowedFonts: [], // e.g. 'LiberationMono'
  pageSettings: {
    width: 1280,
    height: 1024,
    isMobile: false,
    hasTouch: false,
    isLandscape: false,
    deviceScaleFactor: 1
  }
}
module.exports.config = config
module.exports.isCI = isCI

module.exports.testPageScreenshot = ({
  url = null,
  fullscreen = true,
  page = global.__PAGE__,
  selector,
  style = null,
  padding = true,
  text = null,
  simulate = null,
  waitFor = null,
  waitBeforeFinish = null,
  secreenshotSelector = null,
  styleSelector = null,
  simulateSelector = null,
  wrapperStyle = null,
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
        await page.goto(createUrl(url, fullscreen))
      }

      // just to make sure we get the latest version
      await page.waitFor(500)
      await page.reload()
      await page.waitForSelector(selector)

      if (style) {
        await page.$eval(
          styleSelector || selector,
          (node, style) => node.setAttribute('style', style),
          makeStyles(style)
        )
      }

      if (transformElement) {
        await transformElement(element)
      }

      let screenshotElement = null
      const element = await page.$(selector)

      // to archieve a padding, we wrap the element and apply a padding to it
      if (padding) {
        const { height } = await element.boundingBox()
        const id = `id-${Math.round(Math.random() * 9999)}`
        await page.$eval(
          selector,
          (node, { id, style }) => {
            const elem = document.createElement('div')

            // NB: The styles for [data-dnb-test-wrapper] have to be set in the CSS main file
            elem.setAttribute('data-dnb-test-wrapper', id)
            elem.style = style
            node.parentNode.appendChild(elem)
            return elem.appendChild(node)
          },
          {
            id,
            style: makeStyles({
              height: `${height + 32}px`, // because we use "inline-block" - we have to make the height absolute
              ...(wrapperStyle ? wrapperStyle : {})
            })
          }
        )

        await page.waitForSelector(`[data-dnb-test-wrapper="${id}"]`)
        screenshotElement = await page.$(`[data-dnb-test-wrapper="${id}"]`)
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

      if (simulate) {
        let elementToSimulate = null
        if (simulateSelector) {
          await page.waitForSelector(simulateSelector)
          elementToSimulate = await page.$(simulateSelector)
        } else {
          elementToSimulate = element
        }

        switch (simulate) {
          case 'hover':
            {
              await elementToSimulate.hover()
            }
            break

          case 'click':
            {
              await elementToSimulate.click()
            }
            break

          case 'active':
            {
              // make a delayed click, no await. Else we get only a release state
              waitBeforeFinish = 500
              elementToSimulate.click({
                delay: waitBeforeFinish // move the mouse
              })
            }
            break

          case 'focus':
            {
              await screenshotElement.press('Tab') // to simulate pressing tab key before focus
              await elementToSimulate.focus()
            }
            break

          default:
        }
        elementToSimulate = null
      }

      // wait before taking screenshot
      if (waitFor > 0) {
        await page.waitFor(waitFor)
      }

      if (secreenshotSelector) {
        await page.waitForSelector(secreenshotSelector)
        screenshotElement = await page.$(secreenshotSelector)
      }

      const screenshot = await screenshotElement.screenshot()
      screenshotElement = null

      // before we had: just to make sure we dont resolve, before the delayed click happened
      // so the next interation on the same url will have a reset state
      if (waitBeforeFinish > 0) {
        await page.waitFor(waitBeforeFinish)
      }

      if (!config.headless) {
        await page.waitFor(10e3)
      }

      resolve(screenshot)
    } catch (e) {
      reject(e)
    }
  })

const setupPageScreenshot = async ({
  url,
  fullscreen = true,
  pageSettings = null,
  screenshotConfig = null,
  timeout = null
} = {}) => {
  if (screenshotConfig && (expect && !expect.toMatchImageSnapshot)) {
    setupJestScreenshot(screenshotConfig)
  }

  beforeAll(
    async () =>
      setupBeforeAll({
        url,
        fullscreen,
        pageSettings
      }),
    timeout
  )

  afterAll(async () => {
    await global.__PAGE__.close()
    global.__PAGE__ = null
  })
}
module.exports.setupPageScreenshot = setupPageScreenshot

const setupBeforeAll = async ({
  url,
  fullscreen = true,
  pageSettings = null
}) => {
  const context = await global.__BROWSER__.createIncognitoBrowserContext()
  const page = await context.newPage()

  if (pageSettings || (pageSettings !== false && config.pageSettings)) {
    if (pageSettings && config.pageSettings) {
      pageSettings = { ...config.pageSettings, ...pageSettings }
    } else {
      pageSettings = config.pageSettings
    }
    await page.setViewport(pageSettings)
  }

  if (config.blockFontRequest) {
    await page.setRequestInterception(true) // is needed in order to use on "request"
    page.on('request', req => {
      const url = req.url()
      if (
        config.allowedFonts &&
        config.allowedFonts.some(f => url.includes(f))
      ) {
        return req.continue()
      }
      const type = req.resourceType()
      switch (type) {
        case 'font':
          req.abort()
          break

        default:
          req.continue()
      }
    })
  }

  if (url) {
    await page.goto(createUrl(url, fullscreen))
  }

  global.__PAGE__ = page
}

module.exports.setupJestScreenshot = setupJestScreenshot
module.exports.loadImage = async imagePath =>
  await fs.readFile(path.resolve(imagePath))

// make sure "${url}/" has actually a slash on the end
const createUrl = (url, fullscreen = true) =>
  `http://${config.testScreenshotOnHost}:${
    config.testScreenshotOnPort
  }/${url}/?data-dnb-test${fullscreen ? '&fullscreen' : ''}`.replace(
    /\/\//g,
    '/'
  )

const makeStyles = style =>
  Object.entries(style)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
