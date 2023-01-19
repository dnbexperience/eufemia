/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const fs = require('fs-extra')
const path = require('path')
const { isCI } = require('repo-utils')
const os = require('os')
const { makeUniqueId } = require('../../shared/component-helper')
const ora = require('ora')

const log = ora()

// We may use one of these: load, domcontentloaded, networkidle2
const waitUntil = isCI ? 'load' : 'load'

const config = {
  DIR: path.join(os.tmpdir(), 'jest_puppeteer_global_setup'),
  testScreenshotOnHost: 'localhost',
  testScreenshotOnPort: 8000,
  headless: true,
  delayDuringNonheadless: 0,
  retryTimes: isCI ? 5 : 0,
  timeout: 30e3,
  blockFontRequest: false,
  allowedFonts: [], // e.g. 'LiberationMono'
  pixelGrid: 8,
  defaultViewport: {},
  pageViewport: {
    width: 1280,
    height: 1024,
    isMobile: false,
    hasTouch: false,
    isLandscape: false,
    deviceScaleFactor: 1,
  },
}
module.exports.config = config
module.exports.isCI = isCI

const makeScreenshot = async ({
  page = global.__PAGE__,
  url = null,
  pageViewport = null,
  reload = null,
  fullscreen = false,
  selector,
  style = null,
  rootClassName = null,
  addWrapper = true,
  executeBeforeSimulate = null,
  executeBeforeScreenshot = null,
  simulate = null,
  waitBeforeFinish = null,
  waitBeforeSimulate = null,
  waitAfterSimulate = null,
  waitAfterSimulateSelector = null,
  screenshotSelector = null,
  styleSelector = null,
  simulateSelector = null,
  wrapperStyle = null,
  measureElement = null,
} = {}) => {
  if (!page) {
    const pages = await global.__BROWSER__.pages()
    if (pages[0]) {
      page = pages[0]
    }
  }

  if (reload || global.__EVENT_FAILURE__) {
    global.__EVENT_FAILURE__ = false
    await page.reload({ waitUntil })
  }

  await makePageReady({
    page,
    url,
    pageViewport,
    fullscreen,
    selector,
    style,
    rootClassName,
    styleSelector,
  })

  const element = await page.$(selector)
  const screenshotElement = await handleWrapper({
    page,
    selector,
    wrapperStyle,
    addWrapper,
    element,
  })

  if (executeBeforeSimulate) {
    await page.evaluate(executeBeforeSimulate)
  }

  const { elementToSimulate, delaySimulation } = await handleSimulation({
    page,
    element,
    simulate,
    simulateSelector,
    screenshotElement,
    waitAfterSimulateSelector,
    waitAfterSimulate,
    waitBeforeSimulate,
  })

  await handleMeasureOfElement({
    page,
    measureElement,
    selector,
  })

  if (simulate !== 'hover' && simulate !== 'active') {
    await page.mouse.move(0, 0)
  }

  if (executeBeforeScreenshot) {
    await page.evaluate(executeBeforeScreenshot)
  }

  if (config.delayDuringNonheadless > 0) {
    await page.waitForTimeout(config.delayDuringNonheadless)
  }

  const screenshot = await takeScreenshot({
    page,
    screenshotElement,
    screenshotSelector,
  })

  if (delaySimulation > 0) {
    await page.waitForTimeout(delaySimulation)
  }

  if (elementToSimulate) {
    await elementToSimulate.dispose()
  }

  if (waitBeforeFinish > 0) {
    await page.waitForTimeout(waitBeforeFinish)
  }

  return screenshot
}
module.exports.makeScreenshot = makeScreenshot

const setupPageScreenshot = async ({
  page = global.__PAGE__,
  url,
  pageViewport = null,
  fullscreen = false,
  each = false,
  timeout = null,
} = {}) => {
  const before = async () => {
    if (!page) {
      const pages = await global.__BROWSER__.pages()
      if (pages[0]) {
        page = pages[0]
      }
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

    await makePageReady({
      page,
      url,
      pageViewport,
      fullscreen,
    })
  }
  if (each) {
    beforeEach(before, timeout)
  } else {
    beforeAll(before, timeout)
  }
}
module.exports.setupPageScreenshot = setupPageScreenshot

async function makePageReady({
  page,
  url = null,
  pageViewport = null,
  fullscreen = false,
  selector = null,
  style = null,
  rootClassName = null,
  styleSelector = null,
}) {
  if (url) {
    if (pageViewport || (pageViewport !== false && config.pageViewport)) {
      if (pageViewport && config.pageViewport) {
        pageViewport = { ...config.pageViewport, ...pageViewport }
      } else {
        pageViewport = config.pageViewport
      }
      await page.setViewport(pageViewport)
    }

    await page.goto(createUrl(url, fullscreen), { waitUntil })
  }

  global.IS_TEST = true
  await page.evaluate(() => {
    try {
      window.IS_TEST = true
      document.documentElement.setAttribute('data-visual-test', true)
    } catch (e) {
      //
    }
  })

  if (rootClassName) {
    await handleRootClassName({ page, rootClassName })
  }

  // Keep in mind, we also import this file in dev/prod portal (gatsby-browser),
  // just because it makes local dev easier
  await page.addStyleTag({
    path: path.resolve(__dirname, './jestSetupScreenshots.css'),
  })

  if (selector) {
    await page.waitForSelector(selector)
  }

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

async function handleRootClassName({ page, rootClassName }) {
  // This removes a previews added global css class to HTML
  if (global.rootClassName) {
    await page.evaluate(
      ({ rootClassName }) => {
        const elem = document.documentElement
        if (!Array.isArray(rootClassName)) {
          rootClassName = [rootClassName]
        }
        rootClassName.forEach((className) => {
          if (elem.classList.contains(className)) {
            elem.classList.remove(className)
          }
        })
      },
      {
        rootClassName: global.rootClassName,
      }
    )
    global.rootClassName = null
  }

  // This adds a global css class to HTML
  if (rootClassName) {
    await page.evaluate(
      ({ rootClassName }) => {
        const elem = document.documentElement
        if (!Array.isArray(rootClassName)) {
          rootClassName = [rootClassName]
        }
        rootClassName.forEach((className) => {
          if (!elem.classList.contains(className)) {
            elem.classList.add(className)
          }
        })
      },
      { rootClassName }
    )
    global.rootClassName = rootClassName
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
        measureElement,
      }
    )
    const heightInPixelsFloat = parseFloat(heightInPixels)
    const isInEightSeries = (num) => num % pixelGrid
    const howManyPixelsToNextEight = (num) => {
      const v = isInEightSeries(num)
      return v === 0 ? v : pixelGrid - v
    }
    const off = howManyPixelsToNextEight(heightInPixelsFloat)
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
  screenshotSelector,
}) {
  if (screenshotSelector) {
    await page.waitForSelector(screenshotSelector, { visible: true })
    screenshotElement = await page.$(screenshotSelector)
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
  waitBeforeSimulate,
}) {
  if (parseFloat(waitBeforeSimulate) > 0) {
    await page.waitForTimeout(waitBeforeSimulate)
  }

  let elementToSimulate = null
  let delaySimulation = 0

  if (simulate) {
    if (simulateSelector) {
      await page.waitForSelector(simulateSelector)
      elementToSimulate = await page.$(simulateSelector)
    } else {
      elementToSimulate = element
    }

    switch (simulate) {
      case 'hover': {
        await page.mouse.move(0, 0)
        await elementToSimulate.hover()
        break
      }

      case 'click': {
        await elementToSimulate.click()
        break
      }

      case 'enter': {
        await screenshotElement.press('Enter')
        break
      }

      case 'longclick': {
        delaySimulation = isCI ? 600 : 400

        // No await
        elementToSimulate.click({ delay: delaySimulation })
        break
      }

      case 'clickfocus': {
        await elementToSimulate.click()
        screenshotElement.press('Shift')
        await screenshotElement.press('Tab')
        await screenshotElement.press('Tab') // tab two times
        await elementToSimulate.focus()
        break
      }

      case 'active': {
        await elementToSimulate.click()

        const { pageXOffset, pageYOffset } = await page.evaluate(() => {
          const pageXOffset = window.pageXOffset
          const pageYOffset = window.pageYOffset
          return { pageXOffset, pageYOffset }
        })

        const boundingBox = await elementToSimulate.boundingBox()

        await page.mouse.down(
          boundingBox.x + boundingBox.width / 2 - pageXOffset,
          boundingBox.y + boundingBox.height / 2 - pageYOffset
        )

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
      visible: true,
    })
  }
  if (parseFloat(waitAfterSimulate) > 0) {
    await page.waitForTimeout(waitAfterSimulate)
  }

  return { elementToSimulate, delaySimulation }
}

async function handleWrapper({
  page,
  selector,
  wrapperStyle,
  addWrapper,
  element,
}) {
  // now we wrap the element and apply a padding to it
  // the reason is because on some styles we have a shadow around,
  // and we want to have this also in the screenshot
  // With the wrapper, we center the are we take a screenshot
  let wrapperId
  if (addWrapper) {
    wrapperId = makeUniqueId()

    // get the background color of the screenshot selector
    // and put it on the new wrapper
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
        selector,
      }
    )

    // get the height we want to have on the wrapper
    const { height } = await element.boundingBox()

    // build the styles
    const style = makeStyles({
      background,
      height: `${height + 32}px`, // because we use "inline-block" - we have to make the height absolute
      ...(wrapperStyle ? wrapperStyle : {}),
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
        style,
      }
    )

    await page.waitForSelector(`[data-visual-test-id="${wrapperId}"]`)
    return await page.$(`[data-visual-test-id="${wrapperId}"]`)
  }

  return element
}

module.exports.loadImage = async (imagePath) =>
  await fs.readFile(path.resolve(imagePath))

// make sure "${url}/" has actually a slash on the end
const createUrl = (url, fullscreen = true) => {
  const newURL = new URL(
    url,
    `http://${config.testScreenshotOnHost}:${config.testScreenshotOnPort}`
  )

  newURL.searchParams.append('data-visual-test', 'true')

  if (fullscreen) {
    newURL.searchParams.append('fullscreen', 'true')
  }

  return newURL.toString()
}

const makeStyles = (style) =>
  Object.entries(style)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}: ${v}`)
    .join(';')
