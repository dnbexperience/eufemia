/**
 * Default Component Test Setup
 *
 */

import '../startup/required'

import { axe, toHaveNoViolations } from 'jest-axe'
// TODO: fakeDataForProps gets not exported properly
// import fakeProps, { fakeDataForProps } from 'react-fake-props'
// This is the reason, why we use our own "copy"
import fakeProps, {
  fakeDataForProps as _fakeDataForProps
} from './react-fake-props'
import { mount, render, shallow } from './enzyme'

import * as reactDocs from 'react-docgen'
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
  // fakeDataForProps,
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

const fakeDataForProps = (props, options) => {
  // there is a bug in "react-docgen"
  // to make sure we don't return enum strings with an \'...\' inside, we remove it here
  for (let i in props) {
    if (props[i].type.name === 'enum' && props[i].type.value) {
      if (Array.isArray(props[i].type.value))
        props[i].type.value = props[i].type.value.map(({ value }) => ({
          // no, we dont want this in a string
          value: value.replace(new RegExp("'", 'g'), '')
        }))
    }
  }
  return _fakeDataForProps(props, options)
}

// Note: replace this code later, once "react-fake-props" is exporting fakeDataForProps properly
export const fakeAllProps = (file, options) => {
  const source = fs.readFileSync(file, 'utf-8')
  const componentInfo = reactDocs.parse(
    source,
    reactDocs.resolver.findAllComponentDefinitions
  )
  return componentInfo.props
    ? fakeDataForProps(componentInfo.props, options)
    : // in case we use findAllComponentDefinitions
    // we have to walk thouh all the results
    Array.isArray(componentInfo)
    ? componentInfo.reduce(
        (acc, cur) => ({
          ...acc,
          ...fakeDataForProps(cur.props, options)
        }),
        {}
      )
    : {}
}

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
