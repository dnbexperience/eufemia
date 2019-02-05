/**
 * Default Component Test Setup
 *
 */

// import '@babel/polyfill' // jest v24 may have usage of this
import { axe, toHaveNoViolations } from 'jest-axe'
import fakeProps from 'react-fake-props'
import { mount, render, shallow } from './enzyme'

// import * as reactDocs from 'react-docgen'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs-extra'
import onceImporter from 'node-sass-once-importer'
import path from 'path'
import puppeteer from 'puppeteer'
import sass from 'node-sass'
import { setupJestScreenshot } from 'jest-screenshot'
import { toBeType } from 'jest-tobetype'
import toJson from 'enzyme-to-json'

export {
  fakeProps, // we have also our own replacement function called "fakeAllProps"
  shallow,
  mount,
  render,
  toJson,
  axe,
  toHaveNoViolations,
  setupJestScreenshot
}

expect.extend({ toBeType })
expect.extend(toHaveNoViolations)

export const loadScss = file => {
  try {
    const sassResult = sass.renderSync({
      file: file,
      includePaths: [path.resolve(__dirname, '../../style/core/')],
      importer: [onceImporter()]
    })
    return String(sassResult.css)
  } catch (e) {
    console.log('Error', e)
  }
}

export const setupPageScreenshot = (options = { timeout: 10e3 }) => {
  // just setup this one time
  if (global.browser) return

  setupJestScreenshot(
    options
    // {
    // // ...{
    // //   // detectAntialiasing: true, // Whether to attempt to detect antialiasing and ignore related changes when comparing both images.
    // //   // pixelThresholdRelative: 0, // If specified, jest-screenshot will fail if more than the specified relative amount of pixels are different from the snapshot. When setting this to 0.5 for example, more than 50% of the pixels need to be different for the test to fail.
    // //   // colorThreshold: 1 // A number in the range from 0 to 1 describing how sensitive the comparison of two pixels should be.
    // //   // colorThreshold: 0
    // // },
    // // ...options
    // }
  )

  beforeAll(async done => {
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      })

      global.browser = browser
    } catch (err) {
      console.error('Unable to start puppeteer.', err)
    }
    done()
  })

  afterAll(async done => {
    if (!global.browser) {
      done()
    }
    await global.browser.close()
    done()
  })

  beforeEach(async done => {
    if (!global.browser || !global.browser.newPage) {
      done()
    }
    global.page = await global.browser.newPage()

    // await global.page.setViewport({ width: 1920, height: 1080 })

    // some optimisations?
    // await global.page.setRequestInterception(true)
    // global.page.on('request', req => {
    //   switch (req.resourceType()) {
    //     case 'image':
    //       // case 'stylesheet':
    //       // case 'script':
    //       // case 'font':
    //       // case 'xhr':
    //       // case 'eventsource':
    //       // case 'document':
    //       req.abort()
    //       break
    //     default:
    //       req.continue()
    //   }
    // })

    done()
  })

  // make sure jest is waiting for 10 sec
  jest.setTimeout(options.timeout)
}

export const loadImage = async imagePath =>
  await fs.readFile(path.resolve(imagePath))

export const toHtml = Component =>
  ReactDOMServer.renderToStaticMarkup(Component)

export const axeComponent = async (...components) =>
  await axe(components.map(Component => toHtml(Component)).join('\n'))

// global.shallow = enzyme.shallow
// global.render = enzyme.render
// global.mount = enzyme.mount

function jestSetup() {}

export default jestSetup
