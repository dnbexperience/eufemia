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
  delayDuringNonheadless: 0,
  timeout: 10e3,
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
  },
  screenshotConfig: {
    detectAntialiasing: true,
    // local we check for 0% accuracy
    // due to the differences of font rendering between the os (linux/mac/win)
    // we have to have a hight threshold of 8%
    pixelThresholdRelative: isCI ? 0.08 : 0
  }
}
module.exports.config = config
module.exports.isCI = isCI

let currentScreenshotSetup = null
const setScreenshotSetup = (config) => {
  currentScreenshotSetup = config
  setupJestScreenshot(config)
}

module.exports.testPageScreenshot = async ({
  url = null,
  reload = null,
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
  measureElement = null,
  screenshotConfig = null
} = {}) => {
  if (!page) {
    const pages = await global.__BROWSER__.pages()
    if (pages[0]) {
      page = pages[0]
    }
  }
  if (reload) {
    await page.reload({
      waitUntil: 'load'
    })
  }

  if (screenshotConfig) {
    setScreenshotSetup(screenshotConfig)
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

  const { activeSimulationDelay } = await handleSimulation({
    page,
    element,
    simulate,
    simulateSelector,
    screenshotElement,
    waitAfterSimulateSelector,
    waitAfterSimulate,
    waitBeforeSimulate
  })

  await handleMeasureOfElement({
    page,
    measureElement,
    selector
  })

  if (simulate !== 'hover' && simulate !== 'active') {
    await page.mouse.move(0, 0)
  }

  const screenshot = await takeScreenshot({
    page,
    screenshotElement,
    secreenshotSelector
  })

  if (config.delayDuringNonheadless > 0) {
    await page.waitForTimeout(config.delayDuringNonheadless)
  }

  // before we had: just to make sure we don't resolve, before the delayed click happened
  // so the next integration on the same url will have a reset state
  if (activeSimulationDelay > 0) {
    // await page.mouse.up()
    // await elementToSimulate.dispose()
    await page.waitForTimeout(activeSimulationDelay)
  }

  if (waitBeforeFinish > 0) {
    await page.waitForTimeout(waitBeforeFinish)
  }

  if (screenshotConfig) {
    setScreenshotSetup(currentScreenshotSetup)
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
  beforeAll(async () => {
    if (screenshotConfig) {
      setScreenshotSetup(screenshotConfig)
    }

    if (pageViewport || (pageViewport !== false && config.pageViewport)) {
      if (pageViewport && config.pageViewport) {
        pageViewport = { ...config.pageViewport, ...pageViewport }
      } else {
        pageViewport = config.pageViewport
      }
      await global.__PAGE__.setViewport(pageViewport)
    }

    if (config.blockFontRequest) {
      await global.__PAGE__.setRequestInterception(true) // is needed in order to use on "request"
      global.__PAGE__.on('request', (req) => {
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
      await global.__PAGE__.goto(createUrl(url, fullscreen), {
        waitUntil: 'load'
      })
    }
  }, timeout)

  afterAll(async () => {
    setScreenshotSetup(config.screenshotConfig)
  })
}
module.exports.setupPageScreenshot = setupPageScreenshot

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
      waitUntil: 'load'
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

async function handleMeasureOfElement({ page, measureElement, selector }) {
  if (measureElement) {
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
  waitAfterSimulateSelector,
  waitAfterSimulate,
  waitBeforeSimulate
}) {
  if (parseFloat(waitBeforeSimulate) > 0) {
    await page.waitForTimeout(waitBeforeSimulate)
  }

  let elementToSimulate = null
  let activeSimulationDelay = null

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
        break
      }

      case 'click': {
        await elementToSimulate.click()
        break
      }

      case 'clickfocus': {
        await elementToSimulate.click()
        screenshotElement.press('Shift')
        await screenshotElement.press('Tab')
        await screenshotElement.press('Tab')
        await elementToSimulate.focus()
        break
      }

      case 'active': {
        // make a delayed click – have mouse down until screen shot is taken
        activeSimulationDelay = isCI ? 1200 : 400
        // no await – else we get only a release state
        elementToSimulate.click({
          delay: activeSimulationDelay
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
    await page.waitForTimeout(waitAfterSimulate)
  }

  return { elementToSimulate, activeSimulationDelay }
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
const createUrl = (url, fullscreen = true) => {
  const path = `http://${config.testScreenshotOnHost}:${
    config.testScreenshotOnPort
  }/${url}${url.includes('?') ? '&' : '?'}data-visual-test${
    fullscreen ? '&fullscreen' : ''
  }`.replace(/\/\//g, '/')

  return path
}

const makeStyles = (style) =>
  Object.entries(style)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
