/**
 * Jest Setup
 *
 */

import { axe, toHaveNoViolations } from 'jest-axe'
import fakeProps from 'react-fake-props'
import { mount, render } from './enzyme'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs-extra'
import onceImporter from 'node-sass-once-importer'
import path from 'path'
import sass from 'node-sass'
import { toBeType } from 'jest-tobetype'
import toJson from 'enzyme-to-json'

export {
  fakeProps, // we have also our own replacement function called "fakeAllProps"
  mount,
  render,
  toJson,
  axe,
  toHaveNoViolations
}

expect.extend({ toBeType })
expect.extend(toHaveNoViolations)

export const loadScss = (file, options = {}) => {
  try {
    const sassResult = sass.renderSync({
      file,
      includePaths: [path.resolve(__dirname, '../../style/core/')],
      importer: [onceImporter()],
      ...options
    })
    return String(sassResult.css)
  } catch (e) {
    console.log('Error', e)
    return e
  }
}

export const loadImage = async imagePath =>
  await fs.readFile(path.resolve(imagePath))

export const toHtml = Component =>
  ReactDOMServer.renderToStaticMarkup(Component)

export const axeComponent = async (...components) => {
  return await axe(
    components
      .filter(Component =>
        // enzyme names the mounted wrapper: ReactWrapper
        /react/i.test(String(Component.constructor))
      )
      .map(Component => toHtml(Component))
      .join('\n'),
    typeof components[1] === 'object' ? components[1] : null
  )
}

function jestSetup() {}

export default jestSetup
