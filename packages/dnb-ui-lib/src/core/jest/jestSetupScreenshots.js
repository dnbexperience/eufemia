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
  timeout: 5e3,
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
  fullscreen = false,
  page = global.__PAGE__,
  selector,
  style = null,
  addWrapper = true,
  text = null,
  simulate = null,
  waitBeforeFinish = null,
  waitBeforeSimulate = null,
  waitAfterSimulate = null,
  waitAfterSimulateSelector = null,
  secreenshotSelector = null,
  styleSelector = null,
  simulateSelector = null,
  wrapperStyle = null,
  measureElement = null
} = {}) => {
  if (!page) {
    const pages = await global.__BROWSER__.pages()
    if (pages[0]) {
      page = pages[0]
    }
  }

  await makePageReady({
    page,
    url,
    fullscreen,
    selector,
    style,
    styleSelector
  })

  const element = await page.$(selector)
  const screenshotElement = await handleWrapper({
    page,
    selector,
    wrapperStyle,
    addWrapper,
    element
  })

  if (text) {
    await page.$eval(
      selector,
      (node, { text }) => (node.innerText = text),
      { text }
    )
  }

  const {
    elementToSimulate,
    waitBeforeFinish: overwriteWaitBeforeFinish
  } = await handleSimulation({
    page,
    element,
    simulate,
    simulateSelector,
    screenshotElement,
    waitBeforeFinish,
    waitAfterSimulateSelector,
    waitAfterSimulate,
    waitBeforeSimulate
  })
  if (overwriteWaitBeforeFinish) {
    waitBeforeFinish = overwriteWaitBeforeFinish
  }

  await handleMeasureOfElement({
    page,
    measureElement,
    secreenshotSelector,
    selector
  })

  const screenshot = await takeScreenshot({
    page,
    screenshotElement,
    secreenshotSelector
  })

  if (elementToSimulate) {
    await elementToSimulate.dispose()
  }

  if (config.headless !== true) {
    await page.waitFor(config.timeout)
  }

  // before we had: just to make sure we don't resolve, before the delayed click happened
  // so the next integration on the same url will have a reset state
  if (waitBeforeFinish > 0) {
    await page.waitFor(waitBeforeFinish)
  }

  return screenshot
}

const setupPageScreenshot = ({
  url,
  fullscreen = false,
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
  fullscreen = false,
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
    await page.goto(createUrl(url, fullscreen), {
      waitUntil: 'load' // the whole document and its resources (e.g. images, iframes, scripts) have been loaded.
    })
  }

  // just to make sure we get the latest version
  // Try the new Gatsby setup without this hack
  // if (isCI) {
  // await page.reload({
  //   waitUntil: 'domcontentloaded' // the whole document (HTML) has been loaded.
  // })
  //   await page.waitFor(1e3)
  // }

  return page
}

async function makePageReady({
  page,
  url,
  fullscreen,
  selector,
  style,
  styleSelector
}) {
  if (url) {
    await page.goto(createUrl(url, fullscreen), {
      waitUntil: 'load' // // the whole document and its resources (e.g. images, iframes, scripts) have been loaded.
    })
  }

  global.IS_TEST = true
  await page.evaluate(() => {
    window.IS_TEST = true
    document.documentElement.setAttribute('data-visual-test', true)
  })

  // Keep in mind, we also import this file in dev/prod portal (gatsby-browser),
  // just because it makes local dev easier
  await page.addStyleTag({
    path: path.resolve(__dirname, './jestSetupScreenshots.css')
  })
  await page.waitForSelector(selector)
  await page.mouse.move(0, 0)

  if (style) {
    await page.$eval(
      styleSelector || selector,
      (node, style) => {
        node.setAttribute('style', style)
        return node
      },
      makeStyles(style)
    )
  }
}

async function handleMeasureOfElement({
  page,
  measureElement,
  secreenshotSelector,
  selector
}) {
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
}

async function takeScreenshot({
  page,
  screenshotElement,
  secreenshotSelector
}) {
  if (secreenshotSelector) {
    await page.waitForSelector(secreenshotSelector, { visible: true })
    screenshotElement = await page.$(secreenshotSelector)
  }

  return await screenshotElement.screenshot()
}

async function handleSimulation({
  page,
  element,
  simulate,
  simulateSelector,
  screenshotElement,
  waitBeforeFinish,
  waitAfterSimulateSelector,
  waitAfterSimulate,
  waitBeforeSimulate
}) {
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

  return { elementToSimulate, waitBeforeFinish }
}

async function handleWrapper({
  page,
  selector,
  wrapperStyle,
  addWrapper,
  element
}) {
  // now we wrap the element and apply a padding to it
  // the reason is because on some styles we have a shadow around,
  // and we want to have this also in the screenshot
  // With the wrapper, we center the are we take a screenshot
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

    // wrap the element/selector and give the wrapper also a style
    await page.$eval(
      selector,
      (node, { id, style }) => {
        const attrValue = node.getAttribute('data-visual-test')

        const elem = document.createElement('div')
        elem.setAttribute('data-visual-test-id', id)
        elem.setAttribute('data-visual-test-wrapper', attrValue)

        node.parentNode.appendChild(elem)
        elem.appendChild(node)
        elem.style = style

        return node
      },
      {
        id: wrapperId,
        style
      }
    )

    await page.waitForSelector(`[data-visual-test-id="${wrapperId}"]`)
    return await page.$(`[data-visual-test-id="${wrapperId}"]`)
  }

  return element
}

module.exports.setupJestScreenshot = setupJestScreenshot
module.exports.loadImage = async (imagePath) =>
  await fs.readFile(path.resolve(imagePath))

// make sure "${url}/" has actually a slash on the end
const createUrl = (url, fullscreen = false) => {
  const path = `http://${config.testScreenshotOnHost}:${
    config.testScreenshotOnPort
  }/${url}?data-visual-test${fullscreen ? '&fullscreen' : ''}`.replace(
    /\/\//g,
    '/'
  )

  return path
}

const makeStyles = (style) =>
  Object.entries(style)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
