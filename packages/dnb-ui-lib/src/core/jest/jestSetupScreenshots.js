/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const { setupJestScreenshot } = require('jest-screenshot')

const config = {
  DIR: path.join(os.tmpdir(), 'jest_puppeteer_global_setup'),
  // use same port as the local dev setup, this way we can test from the dev setup as well
  testScreenshotOnHost: '127.0.0.1',
  testScreenshotOnPort: 8000,
  headless: true,
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

module.exports.testPageScreenshot = ({
  url = null,
  page = global.__PAGE__,
  selector,
  style = true,
  padding = true,
  text = null,
  simulate = null,
  simulateSelector = null,
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

      // to archieve a padding, we wrap the element and apply a padding to it
      if (padding) {
        const { height } = await element.boundingBox()
        const id = `id-${Math.round(Math.random() * 9999)}`
        await page.$eval(
          selector,
          (node, { id, style }) => {
            const elem = document.createElement('div')
            elem.setAttribute('id', id)
            elem.classList.add('data-dnb-test-padding')
            elem.setAttribute('style', style)
            node.parentNode.appendChild(elem)
            return elem.appendChild(node)
          },
          {
            id,
            style: makeStyles({
              'font-family': 'Arial',

              position: 'relative',
              'z-index': 9999,

              display: 'inline-block', // to get smaller width to the right (no white space)

              overflow: 'hidden',

              padding: '1rem',
              margin: '-1rem',

              background: 'white',

              height: `${height + 32}px` // because we use "inline-block" - we have to make the height absolute
            })
          }
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

      if (style) {
        await page.$eval(
          selector,
          (node, style) => node.setAttribute('style', style),
          makeStyles(style)
        )
      }

      if (transformElement) {
        await transformElement(element)
      }

      let elementToSimulate = element
      if (simulateSelector) {
        elementToSimulate = await page.$(simulateSelector)
      }

      let delay = 0

      if (simulate) {
        switch (simulate) {
          case 'hover':
            {
              await elementToSimulate.hover()
            }
            break

          case 'active':
            {
              // make a delayed click, no await. Else we get only a release state
              delay = 500
              elementToSimulate.click({
                delay // move the mouse
              })
            }
            break

          case 'focus':
            {
              await elementToSimulate.press('Tab') // to simulate pressing tab key before focus
              await elementToSimulate.focus()
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

      if (!config.headless) {
        await page.waitFor(1e3)
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
    const context = await global.__BROWSER__.createIncognitoBrowserContext()
    const page = await context.newPage()

    await page.setViewport(config.pageSettings)

    await page.setRequestInterception(true) // is needed in order to use on "request"
    page.on('request', req => {
      const type = req.resourceType()
      switch (type) {
        case 'font':
          req.abort()
          break

        default:
          req.continue()
      }
    })

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
  `http://${config.testScreenshotOnHost}:${
    config.testScreenshotOnPort
  }/${url}/?data-dnb-test&fullscreen`.replace(/\/\//g, '/')

const makeStyles = style =>
  Object.entries(style)
    // .map(([k, v]) => {
    //   console.log('k', k)
    //   if (k === 'x' || k === 'y') {
    //     return null
    //   }
    //   if (v > 0) {
    //     v = `${v}px`
    //   }
    //   return [k, v]
    // })
    // .filter(i => i)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
