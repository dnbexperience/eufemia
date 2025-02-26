/**
 * Jest Setup for Screenshot testing
 * github.com/GoogleChrome/puppeteer/blob/master/docs/api/index.md
 */

import fs from 'fs-extra'
import path from 'path'
import os from 'os'
import ora from 'ora'
import { isCI } from 'repo-utils'
import { slugify, makeUniqueId } from '../../shared/component-helper'
import { configureToMatchImageSnapshot } from 'jest-image-snapshot'
import screenshotConfig from '../../../jest.config.screenshots'

const playwrightSettings =
  screenshotConfig.testEnvironmentOptions['jest-playwright']
const headlessTimeout = playwrightSettings.launchOptions.headlessTimeout
const isHeadless = playwrightSettings.launchOptions.headless

const log = ora()

export const config = {
  DIR: path.join(os.tmpdir(), 'jest_puppeteer_global_setup'),
  testScreenshotOnHost: 'localhost',
  testScreenshotOnPort: 8000,
  retryTimes: isCI ? 5 : 0,
  timeout: isHeadless ? 30e3 : headlessTimeout,
  pixelGrid: 8,
  pageViewport: {
    width: 1280,
    height: 2048,
  },
  matchConfig: {
    failureThreshold: isCI ? 0.001 : 0, // Chromium needs 0.03, while webkit needs 0.04 or even more
    failureThresholdType: 'percent',
    comparisonMethod: 'pixelmatch',
    customSnapshotIdentifier: ({ currentTestName }) => {
      return slugify(currentTestName) + '.snap'
    },
  },
  // We may use one of these: load, domcontentloaded, networkidle2
  waitUntil: isCI ? 'load' : 'load',
}
export { isCI }

type ActionName = 'click' | 'hover' | 'focus' | 'focusclick' | 'active'
type Action = { action?: ActionName; selector?: string; keypress?: string }
type Simulate = Action | ActionName | (Action | ActionName)[]

export const makeScreenshot = async (
  {
    page = global.page,
    url = null,
    themeName = null,
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
    simulateAfter = null,
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
    recalculateHeightAfterSimulate = false,
  }: {
    page?
    url?: string
    themeName?: string
    pageViewport?: { width?: number; height?: number }
    headers?
    /** Reloads the page before making changes to the elements */
    reload?: boolean
    fullscreen?: boolean
    /** Main selector for the element to prepare, screenshot, and simulate. */
    selector: string
    /** Custom style to apply to the selected element */
    style?: Record<string, string>
    /** A css class, or list of classes, that is added to the `<html>` tag. Is removed in the next test. */
    rootClassName?: string | string[]
    /**
     * Set to `false` to skip adding a wrapper. Used when the wrapper styling ruins the screenshot.
     *
     * Default: `true`
     */
    addWrapper?: boolean
    executeBeforeSimulate?: () => void
    executeBeforeScreenshot?: () => void
    /** An action, or list of action, to simulate */
    simulate?: Simulate
    /** An action, or list of action, to simulate right after screenshot is taken, used for cleanup before the next test */
    simulateAfter?: Simulate
    /** Delay at the end, right before returning the result */
    waitBeforeFinish?: number
    /** Delay right before running simulations and right after simulation element has been selected */
    waitBeforeSimulate?: number
    /** Delay after all simulations have run */
    waitAfterSimulate?: number
    /** Selector for an element. After all simulations have run, delay until this element is visible. */
    waitAfterSimulateSelector?: string
    /** Overrides the main selector when the screenshot is taken */
    screenshotSelector?: string
    /** Overrides the main selector when applying custom style */
    styleSelector?: string
    /** Overrides the main selector when simulating action */
    simulateSelector?: string
    /** Custom style to apply to the element wrapping the selected element */
    wrapperStyle?: Record<string, string>
    measureElement?: string
    matchConfig?
    /**
     * Used if your simulation changes the height of the component
     *
     * Default `false`
     */
    recalculateHeightAfterSimulate?: boolean
  } = { selector: undefined }
) => {
  await makePageReady({
    page,
    url,
    themeName,
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

  const simulationValues = await handleSimulation({
    page,
    element,
    simulate,
    simulateSelector,
    waitAfterSimulateSelector,
    waitAfterSimulate,
    waitBeforeSimulate,
  })
  const { delaySimulation } = simulationValues
  let { lastMouseAction } = simulationValues

  if (recalculateHeightAfterSimulate) {
    await handleWrapperHeightChange({
      page,
      selector,
      element,
    })
  }

  await handleMeasureOfElement({
    page,
    measureElement,
    selector,
  })

  if (executeBeforeScreenshot) {
    await page.evaluate(executeBeforeScreenshot)
  }

  if (lastMouseAction === 'click' || lastMouseAction === 'focusclick') {
    await page.mouse.move(0, 0) // reset after click simulations, because the mouse still hovers
  }

  const screenshot = await takeScreenshot({
    page,
    screenshotElement,
    screenshotSelector,
  })

  if (simulateAfter) {
    const { lastMouseAction: lastMouseActionAfter } =
      await handleSimulation({
        page,
        element,
        simulate: simulateAfter,
      })
    lastMouseAction = lastMouseActionAfter
  }

  // Only for dev
  if (!isCI && !isHeadless) {
    await page.waitForTimeout(headlessTimeout)
  }

  if (delaySimulation > 0) {
    await page.waitForTimeout(delaySimulation)
  }

  await wrapperCleanup({
    page,
    selector,
    addWrapper,
  })

  await page.mouse.move(0, 0)

  if (lastMouseAction === 'active') {
    await page.mouse.up() // reset mouse.down() after move (to avoid a click) for subsequent tests
  }

  if (waitBeforeFinish) {
    await page.waitForTimeout(waitBeforeFinish)
  }

  return screenshot
}

export const setMatchConfig = (matchConfig) => {
  const cfg = {
    ...config.matchConfig,
    ...matchConfig,
  }
  const toMatchImageSnapshot = configureToMatchImageSnapshot(cfg)
  expect.extend({ toMatchImageSnapshot })
}

export const setupPageScreenshot = (
  {
    page = global.page,
    url,
    themeName = null,
    pageViewport = null,
    headers = null,
    fullscreen = false,
    timeout = 60e3,
    matchConfig = null,
  } = { url: undefined }
) => {
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

  beforeAll(before, timeout)
}

async function handleElement({
  page,
  selector = null,
  style = null,
  rootClassName = null,
  styleSelector = null,
}) {
  const countSelectorElements = await page.evaluate(
    ({ selector }) => {
      const mainSelector = selector.match(
        /(data-visual-test="([^"]*)")/
      )?.[0]

      try {
        return document.querySelectorAll(
          mainSelector ? `[${mainSelector}]` : selector
        ).length
      } catch (e) {
        console.error(e)
      }
    },
    {
      selector,
    }
  )

  if (countSelectorElements > 1) {
    throw new Error(
      `Ensure the selector '${selector}' exists only once! Found ${countSelectorElements}.`
    )
  } else if (isNaN(parseFloat(countSelectorElements))) {
    log.warn(`Count not extract main selector from '${selector}'!`)
  }

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

  if (rootClassName || global.rootClassName) {
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

    global.themeName = themeName
    global.pageUrl = createUrl(url, fullscreen, themeName)

    await page.goto(global.pageUrl, {
      waitUntil: config.waitUntil,
      timeout: config.timeout,
    })

    await page.evaluate(() => {
      // Remove all stored
      window.localStorage.clear()
    })
  }

  if (global.retryAttempt) {
    await page.reload()
  }

  global.IS_TEST = true
  await page.evaluate(() => {
    try {
      window['IS_TEST'] = true
      document.documentElement.setAttribute('data-visual-test', 'true')
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
  simulateSelector = undefined,
  waitAfterSimulateSelector = undefined,
  waitAfterSimulate = undefined,
  waitBeforeSimulate = undefined,
}: {
  page
  element
  simulate: Simulate
  simulateSelector?: string
  waitAfterSimulateSelector?: string
  waitAfterSimulate?: number
  waitBeforeSimulate?: number
}) {
  if (simulateSelector) {
    element = await page.$(simulateSelector)
  }

  if (waitBeforeSimulate) {
    await page.waitForTimeout(waitBeforeSimulate)
  }

  const elementsToDispose = []
  let delaySimulation = 0
  let lastMouseAction: ActionName = undefined
  if (simulate) {
    const simulations = Array.isArray(simulate) ? simulate : [simulate]
    for await (const simulation of simulations) {
      const simulate =
        typeof simulation === 'string'
          ? { action: simulation }
          : simulation

      let elementToSimulate = element

      if (simulate.selector) {
        elementToSimulate = await page.$(simulate.selector)
        await page.mouse.move(0, 0) // reset between simulations
      }

      if (simulate.action) {
        lastMouseAction = simulate.action

        switch (simulate.action) {
          case 'hover': {
            await elementToSimulate.hover({ force: true })
            break
          }

          case 'click': {
            await elementToSimulate.click()
            break
          }

          /**
           * Useful in situations,
           * where a click with a focus is needed (ToggleButton).
           */
          case 'focusclick': {
            delaySimulation = isCI ? 200 : 100
            await elementToSimulate.click({
              force: true,
            })

            await page.keyboard.press('Tab')
            await elementToSimulate.focus()
            break
          }

          case 'active': {
            await elementToSimulate.hover({ force: true }) // Slider needs "force: true", in order to ignore "pointer-events: none"
            await page.mouse.down()

            break
          }

          case 'focus': {
            await page.keyboard.press('Tab') // to simulate pressing tab key before focus
            await elementToSimulate.focus({ force: true })
            break
          }
        }
      }

      if (simulate.keypress) {
        await page.keyboard.press(simulate.keypress)
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
  if (waitAfterSimulate) {
    await page.waitForTimeout(waitAfterSimulate)
  }

  return {
    elementsToDispose,
    delaySimulation,
    lastMouseAction,
  }
}

async function wrapperCleanup({ page, selector, addWrapper }) {
  if (addWrapper) {
    await page.evaluate(
      ({ selector }) => {
        const element = document.querySelector(selector)
        const wrapperElement = element.closest(
          '[data-visual-test-wrapper]'
        )

        if (wrapperElement) {
          wrapperElement.replaceWith(...wrapperElement.childNodes)
        }

        return wrapperElement
      },
      {
        selector,
      }
    )
  }
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
        const element = document.querySelector(selector)?.parentNode

        const backgroundColor = window
          .getComputedStyle(element)
          ?.getPropertyValue('background-color')

        // if transparent, do nothing
        if (!element || backgroundColor === 'rgba(0, 0, 0, 0)') {
          return null
        }

        return backgroundColor
      },
      {
        selector,
      }
    )

    // get the height we want to have on the wrapper
    const { height, y } = await element.boundingBox()

    // prevent 1px height rounding error by moving wrapper to a whole numbered coordinate
    const yDecimals = y.toString().split('.')[1] || 0

    // build the styles
    const style = makeStyles({
      background,
      top: `0.${yDecimals}px`,
      height: `${height + 32}px`, // because we use "inline-block" - we have to make the height absolute
      ...(wrapperStyle ? wrapperStyle : {}),
    })

    // wrap the element/selector and give the wrapper also a style
    await page.$eval(
      selector,
      (element, { id, style, isHeadless }) => {
        const attrValue = element.getAttribute('data-visual-test')

        const wrapperElement = document.createElement('div')
        wrapperElement.setAttribute('data-visual-test-id', id)
        wrapperElement.setAttribute('data-visual-test-wrapper', attrValue)

        element.parentNode.appendChild(wrapperElement)
        wrapperElement.appendChild(element)

        wrapperElement.setAttribute('style', style)

        const elRec = element.getBoundingClientRect()
        const wrRec = wrapperElement.getBoundingClientRect()

        if (wrRec.top - elRec.top > 0 && isHeadless) {
          throw new Error(
            `Top of element is ${
              wrRec.top - elRec.top
            }px above the screenshot area.`
          )
        }

        if (elRec.bottom - wrRec.bottom > 0 && isHeadless) {
          throw new Error(
            `Bottom of element is ${
              elRec.bottom - wrRec.bottom
            }px below the screenshot area.`
          )
        }

        return element
      },
      {
        id: wrapperId,
        style,
        isHeadless,
      }
    )

    await page.waitForSelector(`[data-visual-test-id="${wrapperId}"]`)
    return await page.$(`[data-visual-test-id="${wrapperId}"]`)
  }

  return element
}

async function handleWrapperHeightChange({ page, selector, element }) {
  const { height } = await element.boundingBox()

  await page.evaluate(
    ({ selector, height }) => {
      const element = document.querySelector(selector)
      const wrapperElement = element.closest('[data-visual-test-wrapper]')

      if (wrapperElement) {
        wrapperElement.style.height = `${height + 32}px`
      }
      return wrapperElement
    },
    {
      selector,
      height,
    }
  )
}

export const loadImage = async (imagePath) =>
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
