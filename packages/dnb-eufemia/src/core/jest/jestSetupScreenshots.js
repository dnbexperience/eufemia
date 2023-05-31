/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
 */

const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const ora = require('ora')
const { isCI } = require('repo-utils')
const { slugify } = require('../../../src/shared/component-helper')
const { makeUniqueId } = require('../../shared/component-helper')
const { configureToMatchImageSnapshot } = require('jest-image-snapshot')

const log = ora()

const config = {
  DIR: path.join(os.tmpdir(), 'jest_puppeteer_global_setup'),
  testScreenshotOnHost: 'localhost',
  testScreenshotOnPort: 8000,
  retryTimes: isCI ? 5 : 0,
  timeout: 30e3,
  pixelGrid: 8,
  pageViewport: {
    width: 1280,
    height: 1024,
  },
  matchConfig: {
    failureThreshold: 0.001, // Chromium needs 0.03, while webkit needs 0.04 or even more
    failureThresholdType: 'percent',
    comparisonMethod: 'pixelmatch',
    customSnapshotIdentifier: ({ currentTestName }) => {
      return slugify(currentTestName) + '.snap'
    },
  },
  // We may use one of these: load, domcontentloaded, networkidle2
  waitUntil: isCI ? 'load' : 'load',
}
module.exports.config = config
module.exports.isCI = isCI

const makeScreenshot = async ({
  page = global.page,
  url = null,
  pageViewport = null,
  headers = null,
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
  matchConfig = null,
} = {}) => {
  await makePageReady({
    page,
    url,
    pageViewport,
    headers,
    fullscreen,
    matchConfig,
  })

  if (reload) {
    await page.reload()
  }

  const element = await handleElement({
    page,
    selector,
    style,
    styleSelector,
    rootClassName,
  })

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

  const { delaySimulation } = await handleSimulation({
    page,
    element,
    simulate,
    simulateSelector,
    waitAfterSimulateSelector,
    waitAfterSimulate,
    waitBeforeSimulate,
  })

  await handleMeasureOfElement({
    page,
    measureElement,
    selector,
  })

  if (executeBeforeScreenshot) {
    await page.evaluate(executeBeforeScreenshot)
  }

  // Only for dev
  // if (!isCI) {
  //   await page.waitForTimeout(300000)
  // }

  if (simulate && simulate === 'click') {
    await page.mouse.move(0, 0) // reset after click simulations, because the mouse still hovers
  }

  const screenshot = await takeScreenshot({
    page,
    screenshotElement,
    screenshotSelector,
  })

  if (delaySimulation > 0) {
    await page.waitForTimeout(delaySimulation)
  }

  await page.mouse.move(0, 0)

  if (waitBeforeFinish > 0) {
    await page.waitForTimeout(waitBeforeFinish)
  }

  return screenshot
}
module.exports.makeScreenshot = makeScreenshot

const setMatchConfig = (matchConfig) => {
  const cfg = {
    ...config.matchConfig,
    ...matchConfig,
  }
  const toMatchImageSnapshot = configureToMatchImageSnapshot(cfg)
  expect.extend({ toMatchImageSnapshot })
}
module.exports.setMatchConfig = setMatchConfig

const setupPageScreenshot = ({
  page = global.page,
  url,
  themeName = null,
  pageViewport = null,
  headers = null,
  fullscreen = false,
  each = false,
  timeout = null,
  matchConfig = null,
} = {}) => {
  if (matchConfig) {
    // The cleanup happens in "setupJestScreenshot"
    beforeEach(() => {
      setMatchConfig(matchConfig)
    }, timeout)
  }

  const before = async () => {
    await makePageReady({
      page,
      url,
      themeName,
      pageViewport,
      headers,
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

async function handleElement({
  page,
  selector = null,
  style = null,
  rootClassName = null,
  styleSelector = null,
}) {
  if (selector) {
    await page.waitForSelector(selector, { state: 'attached' }) // Dialog selector "div#dnb-modal-root" is not visible yet, and needs the state "attached"
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

  if (rootClassName) {
    await handleRootClassName({ page, rootClassName })
  }

  return await page.$(selector)
}

async function makePageReady({
  page,
  url = null,
  themeName = null,
  pageViewport = null,
  headers = null,
  fullscreen = false,
  matchConfig = null,
}) {
  if (matchConfig) {
    setMatchConfig(matchConfig)
  }

  if (url) {
    if (pageViewport || (pageViewport !== false && config.pageViewport)) {
      if (pageViewport && config.pageViewport) {
        pageViewport = { ...config.pageViewport, ...pageViewport }
      } else {
        pageViewport = config.pageViewport
      }
      await page.setViewportSize(pageViewport)
    }

    if (headers) {
      await page.setExtraHTTPHeaders(headers)
    }

    await page.goto(createUrl(url, fullscreen, themeName), {
      waitUntil: config.waitUntil,
      timeout: config.timeout,
    })

    await page.evaluate(() => {
      // Remove all stored
      window.localStorage.clear()
    })
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

  // Keep in mind, we also import this file in dev/prod portal (gatsby-browser),
  // just because it makes local dev easier
  await page.addStyleTag({
    path: path.resolve(__dirname, './jestSetupScreenshots.css'),
  })
}

async function handleRootClassName({ page, rootClassName }) {
  // This removes a previous added global css class to HTML
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
  waitAfterSimulateSelector,
  waitAfterSimulate,
  waitBeforeSimulate,
}) {
  if (simulateSelector) {
    element = await page.$(simulateSelector)
  }

  if (parseFloat(waitBeforeSimulate) > 0) {
    await page.waitForTimeout(waitBeforeSimulate)
  }

  const elementToSimulate = element
  const elementsToDispose = []
  let delaySimulation = 0

  if (simulate) {
    const simulations = Array.isArray(simulate) ? simulate : [simulate]
    for await (const simulate of simulations) {
      let element = elementToSimulate

      let action = simulate
      if (simulate?.action) {
        action = simulate.action
        if (simulate.selector) {
          element = await page.$(simulate.selector)
        }
        await page.mouse.move(0, 0) // reset between simulations
      }

      switch (action) {
        case 'hover': {
          await element.hover({ force: true })
          break
        }

        case 'click': {
          await element.click()
          break
        }

        case 'longclick': {
          delaySimulation = isCI ? 600 : 400

          // No await
          element.click({ delay: delaySimulation })
          break
        }

        case 'tabfocus': {
          await element.click()
          await page.keyboard.press('Tab')
          await element.focus()
          break
        }

        case 'active': {
          delaySimulation = isCI ? 200 : 100
          await element.click({
            force: true,
            delay: delaySimulation,
          })

          await page.mouse.down() // Slider needs "mouse.down", in order to make "active" state work

          break
        }

        case 'focus': {
          await page.keyboard.press('Tab') // to simulate pressing tab key before focus
          await element.focus({ force: true })
          break
        }
      }

      elementsToDispose.push(element)
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

  return { elementsToDispose, delaySimulation }
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
const createUrl = (url, fullscreen = true, themeName = null) => {
  const newURL = new URL(
    url,
    `http://${config.testScreenshotOnHost}:${config.testScreenshotOnPort}`
  )

  newURL.searchParams.append('data-visual-test', 'true')

  if (themeName) {
    newURL.searchParams.append('eufemia-theme', themeName)
  }

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
