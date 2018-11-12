/**
 * Default Component Test Setup
 *
 */

import '../startup/required'

import { axe, toHaveNoViolations } from 'jest-axe'
import fakeProps, { fakeDataForProps } from 'react-fake-props'
import { mount, render, shallow } from './enzyme'

import ReactDOMServer from 'react-dom/server'
import fs from 'fs-extra'
import onceImporter from 'node-sass-once-importer'
import path from 'path'
import puppeteer from 'puppeteer'
import sass from 'node-sass'
import { setupJestScreenshot } from 'jest-screenshot'
import { toBeType } from 'jest-tobetype'
import toJson from 'enzyme-to-json'

export { fakeProps, fakeDataForProps }
export { shallow, mount, render }
export { toJson }
export { axe, toHaveNoViolations }

expect.extend({ toBeType })
expect.extend(toHaveNoViolations)

// > Screenshot testing is not working properly yet under heavy test conditions

// > this may be interesting later
// import snapshotDiff, { toMatchDiffSnapshot } from 'snapshot-diff'
// expect.extend({ toMatchDiffSnapshot })
// expect.addSnapshotSerializer(snapshotDiff.getSnapshotDiffSerializer())

// > we do not use emotion in here yet
// import * as emotion from 'emotion'
// import { createSerializer } from 'jest-emotion'
// expect.addSnapshotSerializer(
//   createSerializer(emotion, {
//     classNameReplacer(className, index) {
//       return `jest-class-name-${index}`
//     }
//   })
// )

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

export const setupPageScreenshot = (options = {}) =>
  new Promise((resolve, reject) => {
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

    beforeAll(async () => {
      try {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        })

        global.browser = browser
      } catch (err) {
        console.error('Unable to start puppeteer.', err)
        reject(err)
      }
    })

    afterAll(async () => {
      await global.browser.close()
    })

    beforeEach(async () => {
      const page = await global.browser.newPage()

      // await page.setViewport({ width: 1920, height: 1080 })

      // some optimisations?
      // await page.setRequestInterception(true)
      // page.on('request', req => {
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

      global.page = page
    })

    // make sure jest is waiting for 10 sec
    jest.setTimeout(10e3)

    resolve()
  })

export const loadImage = async imagePath => {
  return await fs.readFile(path.resolve(imagePath))
}

export const axeComponent = async Component => {
  const html = ReactDOMServer.renderToStaticMarkup(Component)
  return await axe(html)
}

// global.shallow = enzyme.shallow
// global.render = enzyme.render
// global.mount = enzyme.mount

function jestSetup() {}

export default jestSetup
