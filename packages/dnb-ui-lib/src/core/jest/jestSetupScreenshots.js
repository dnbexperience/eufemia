/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const fs = require('fs-extra')
const path = require('path')
const isCI = require('is-ci')
const os = require('os')
const { setupJestScreenshot } = require('jest-screenshot')
const { makeUniqueId } = require('../../shared/component-helper')
const ora = require('ora')

const log = ora()

const config = {
  DIR: path.join(os.tmpdir(), 'jest_puppeteer_global_setup'),
  // use same port as the local dev setup, this way we can test from the dev setup as well
  // testScreenshotOnHost: isCI ? '127.0.0.1' : 'localhost',
  testScreenshotOnHost: 'localhost',
  testScreenshotOnPort: 8000,
  headless: true,
  timeout: 300e3,
  blockFontRequest: false,
  allowedFonts: [], // e.g. 'LiberationMono'
  pixelGrid: 8,
  defaultViewport: {
    /**
     * For some reason, puppeteer.launch({ defaultViewport, ... does not take the config in account
     * so we use pageViewport instead
     */
    // width: 1280,
    // height: 1024,
    // isMobile: false,
    // hasTouch: false,
    // isLandscape: false,
    // deviceScaleFactor: 1
  },
  pageViewport: {
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

module.exports.testPageScreenshot = async ({
  url = null,
  fullscreen = true,
  page = global.__PAGE__,
  selector,
  style = null,
  addWrapper = true,
  text = null,
  simulate = null,
  waitBeforeFinish = null,
  waitAfterSimulate = null,
  waitBeforeSimulate = null,
  waitAfterSimulateSelector = null,
  secreenshotSelector = null,
  styleSelector = null,
  simulateSelector = null,
  wrapperStyle = null,
  measureElement = null,
  transformElement = null
} = {}) => {
  try {
    if (!page) {
      const pages = await global.__BROWSER__.pages()
      if (pages[0]) {
        page = pages[0]
      }
    }

    if (url) {
      await page.goto(createUrl(url, fullscreen))

      // await page.waitForNavigation({
      //   waitUntil: 'domcontentloaded'
      // })
    }

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

    const element = await page.$(selector)
    let screenshotElement = element

    // now we wrap the element and apply a padding to it
    // the reason is because on some styles we have a shadow arround,
    // and we want to have this also in the screenshot
    // With the wrapper, we center the are we take a screnshot
    let wrapperId
    if (addWrapper) {
      wrapperId = makeUniqueId()

      // because of getComputedStyle we have to use evaluate
      const background = await page.evaluate(
        ({ selector }) => {
          let node = document.querySelector(selector)
          if (!(node && node.parentNode)) {
            return null
          }
          node = node.parentNode

          const backgroundColor = window
            .getComputedStyle(node)
            .getPropertyValue('background-color')

          // if transparent, do nothing
          if (backgroundColor === 'rgba(0, 0, 0, 0)') {
            return null
          }
          return backgroundColor
        },
        {
          selector
        }
      )

      // get the height we want to have on the wrapper
      const { height } = await element.boundingBox()

      // build the styles
      const style = makeStyles({
        background,
        height: `${height + 32}px`, // because we use "inline-block" - we have to make the height absolute
        ...(wrapperStyle ? wrapperStyle : {})
      })

      // wrapp the element/selector and give the wrapper also a style
      await page.$eval(
        selector,
        (node, { id, style }) => {
          const attrValue = node.getAttribute('data-dnb-test')
          const elem = document.createElement('div')

          // NB: The styles for [data-dnb-test-wrapper] have to be set in the CSS main file
          // elem.classList.add('is-test')
          elem.setAttribute('data-dnb-test-id', id)
          elem.setAttribute('data-dnb-test-wrapper', attrValue)
          elem.style = style
          node.parentNode.appendChild(elem)
          return elem.appendChild(node)
        },
        {
          id: wrapperId,
          style
        }
      )

      await page.waitForSelector(`[data-dnb-test-id="${wrapperId}"]`)
      screenshotElement = await page.$(`[data-dnb-test-id="${wrapperId}"]`)
    }

    if (text) {
      await page.$eval(
        selector,
        (node, { text }) => (node.innerText = text),
        { text }
      )
    }

    if (parseFloat(waitBeforeSimulate) > 0) {
      await page.waitFor(waitBeforeSimulate)
    }

    let elementToSimulate = null
    if (simulate) {
      if (simulateSelector) {
        await page.waitForSelector(simulateSelector)
        elementToSimulate = await page.$(simulateSelector)
      } else {
        elementToSimulate = element
      }

      switch (simulate) {
        case 'hover': {
          await elementToSimulate.hover()
          await elementToSimulate.dispose()
          break
        }

        case 'click': {
          await elementToSimulate.click()
          break
        }

        case 'focusclick': {
          await elementToSimulate.focus()
          await elementToSimulate.click()
          break
        }

        case 'active': {
          // make a delayed click, no await. Else we get only a release state
          waitBeforeFinish = 500 // have mouse pressed until screen shot is taken
          elementToSimulate.click({
            delay: waitBeforeFinish // move the mouse
          })
          break
        }

        case 'focus': {
          await screenshotElement.press('Tab') // to simulate pressing tab key before focus
          await elementToSimulate.focus()
          break
        }

        default:
      }
    }

    // wait before taking screenshot
    if (waitAfterSimulateSelector) {
      await page.waitForSelector(waitAfterSimulateSelector, {
        visible: true
      })
    }
    if (parseFloat(waitAfterSimulate) > 0) {
      await page.waitFor(waitAfterSimulate)
    }

    if (secreenshotSelector) {
      await page.waitForSelector(secreenshotSelector, { visible: true })
      screenshotElement = await page.$(secreenshotSelector)
    }

    // with this, we get a warning (console)
    // if an element is not in the pixel grid
    if (!measureElement) {
      measureElement = secreenshotSelector || selector
    }
    if (!isCI && measureElement) {
      const pixelGrid = config.pixelGrid
      if (selector !== measureElement) {
        await page.waitForSelector(measureElement)
      }
      const heightInPixels = await page.evaluate(
        ({ measureElement }) => {
          const node = document.querySelector(measureElement)
          return window.getComputedStyle(node).getPropertyValue('height')
        },
        {
          measureElement
        }
      )
      const heightInPixelsFloat = parseFloat(heightInPixels)
      const isInEightSeries = (num) => num % pixelGrid
      const howManyPixeToNextEight = (num) => {
        const v = isInEightSeries(num)
        return v === 0 ? v : pixelGrid - v
      }
      const off = howManyPixeToNextEight(heightInPixelsFloat)
      if (off > 0) {
        const inRem = Math.round(heightInPixelsFloat / (pixelGrid * 2))
        log.warn(
          `"${measureElement}" is <${off}px off to ${
            heightInPixelsFloat + off
          }rem (${heightInPixels}) which corresponds to a rem value of ${inRem}rem.`
        )
      }
    }

    const screenshot = await screenshotElement.screenshot()
    screenshotElement = null

    if (elementToSimulate) {
      await elementToSimulate.dispose()
      elementToSimulate = null
    }

    // revert the wrapper attribute
    if (wrapperId) {
      await page.$eval(`[data-dnb-test-id="${wrapperId}"]`, (node) => {
        node.removeAttribute('data-dnb-test-wrapper')
        return node
      })
    }

    if (config.headless !== true) {
      waitBeforeFinish = config.timeout
    }

    // before we had: just to make sure we dont resolve, before the delayed click happened
    // so the next interation on the same url will have a reset state
    if (waitBeforeFinish > 0) {
      await page.waitFor(waitBeforeFinish)
    }

    return screenshot
  } catch (e) {
    throw new Error(e)
  }
}

const setupPageScreenshot = ({
  url,
  fullscreen = true,
  pageViewport = null,
  screenshotConfig = null,
  timeout = null
} = {}) => {
  if (screenshotConfig) {
    setupJestScreenshot(screenshotConfig)
  }

  beforeAll(
    async () =>
      (global.__PAGE__ = await setupBeforeAll({
        url,
        fullscreen,
        pageViewport
      })),
    timeout
  )

  afterAll(async () => await global.__PAGE__.close())
}
module.exports.setupPageScreenshot = setupPageScreenshot

const setupBeforeAll = async ({
  url,
  fullscreen = true,
  pageViewport = null
}) => {
  const page = await global.__BROWSER__.newPage()

  // in case we want to use private window
  // const context = await global.__BROWSER__.createIncognitoBrowserContext()
  // const page = await context.newPage()

  if (pageViewport || (pageViewport !== false && config.pageViewport)) {
    if (pageViewport && config.pageViewport) {
      pageViewport = { ...config.pageViewport, ...pageViewport }
    } else {
      pageViewport = config.pageViewport
    }
    await page.setViewport(pageViewport)
  }

  if (config.blockFontRequest) {
    await page.setRequestInterception(true) // is needed in order to use on "request"
    page.on('request', (req) => {
      const url = req.url()

      if (
        config.allowedFonts &&
        config.allowedFonts.some((f) => url.includes(f))
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

    // await page.waitForNavigation({
    //   waitUntil: 'domcontentloaded'
    // })
  }

  // just to make sure we get the latest version
  // Try the new Gatsby setup without this hack
  // if (isCI) {
  // await page.waitFor(1e3)
  // await page.reload({
  //   waitUntil: 'domcontentloaded'
  // })
  // }

  return page
}

module.exports.setupJestScreenshot = setupJestScreenshot
module.exports.loadImage = async (imagePath) =>
  await fs.readFile(path.resolve(imagePath))

// make sure "${url}/" has actually a slash on the end
const createUrl = (url, fullscreen = true) =>
  `http://${config.testScreenshotOnHost}:${
    config.testScreenshotOnPort
  }/${url}/?data-dnb-test${fullscreen ? '&fullscreen' : ''}`.replace(
    /\/\//g,
    '/'
  )

const makeStyles = (style) =>
  Object.entries(style)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
