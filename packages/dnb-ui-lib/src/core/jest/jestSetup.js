/**
 * Jest Setup
 *
 */

import { axe, toHaveNoViolations } from 'jest-axe'
import fakeProps from 'react-fake-props'
import { shallow, mount, render } from './enzyme'
import ReactDOMServer from 'react-dom/server'
import fs from 'fs-extra'
import onceImporter from 'node-sass-once-importer'
import path from 'path'
import sass from 'node-sass'
import { toBeType } from 'jest-tobetype'
import toJson from 'enzyme-to-json'

export {
  fakeProps, // we have also our own replacement function called "fakeAllProps"
  shallow,
  mount,
  render,
  toJson,
  axe,
  toHaveNoViolations
}

if (typeof window !== 'undefined') {
  window.IS_TEST = true
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
    console.error('loadScss error:', e)
    return e
  }
}

export const mockGetSelection = () => {
  let memory
  Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: jest.fn().mockImplementation((v) => {
        memory = v
        return Promise.resolve(v)
      }),
      readText: jest.fn().mockImplementation(() => Promise.resolve(memory))
    }
  })

  const mockRange = new (class Range {
    constructor() {
      this.startContainer = {
        parentNode: document.createElement('div')
      }
    }
    getElement() {
      return this.node
    }
    insertNode(elem) {
      this.node = document.createElement('div')
      this.node.appendChild(elem)
      return this
    }
    cloneRange() {
      return this
    }
  })()

  let ranges = [mockRange]

  const mockValue = '1234.56'
  let value = mockValue
  let rangeCount = 9

  class RangeObj {
    rangeCount = rangeCount
    toString = () => value
    addRange(range = mockRange) {
      value = mockValue
      ranges.push(range)
      rangeCount = ranges.length
    }
    getRangeAt(index) {
      return ranges[index]
    }
    removeAllRanges() {
      value = ''
      ranges = []
      rangeCount = ranges.length
    }
  }

  Object.defineProperty(window, 'getSelection', {
    configurable: true,
    value: () => {
      return new RangeObj()
    }
  })
}

export const loadImage = async (imagePath) =>
  await fs.readFile(path.resolve(imagePath))

export const toHtml = (Component) =>
  ReactDOMServer.renderToStaticMarkup(Component)

export const axeComponent = async (...components) => {
  const html = components
    .filter((Component) =>
      // enzyme names the mounted wrapper: ReactWrapper
      /react/i.test(String(Component.constructor))
    )
    .map((Component) => toHtml(Component))
    .join('\n')

  return await axe(
    `<main>${html}</main>`,
    typeof components[1] === 'object' ? components[1] : null
  )
}

export function attachToBody() {
  let container = document.createElement('div')
  document.body.append(container)
  return container
}

function jestSetup() {}

export default jestSetup
