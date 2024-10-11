/**
 * Jest Setup
 *
 */

import { axe, toHaveNoViolations } from 'jest-axe'
import fs from 'fs-extra'
import path from 'path'
import sass from 'sass'

export { axe, toHaveNoViolations }

expect.extend(toHaveNoViolations)

export const wait = (t) => new Promise((r) => setTimeout(r, t))

export const loadScss = (file, options = {}) => {
  try {
    const before = window.location

    const importPath1 = path.dirname(file)
    const importPath2 = path.resolve(__dirname, '../../style/core/')

    delete window.location
    window.location = {
      href: 'file://',
    }

    const sassResult = sass.renderSync({
      file,
      includePaths: [importPath1, importPath2], // use loadPaths for new API
      sourceMap: false,
      ...options,
    })

    window.location = before

    return String(sassResult.css)
  } catch (e) {
    console.error('loadScss error:', e)
    return e
  }
}

export const mockClipboard = () => {
  let memory
  Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: jest.fn().mockImplementation((v) => {
        memory = v
        return Promise.resolve(v)
      }),
      readText: jest
        .fn()
        .mockImplementation(() => Promise.resolve(memory)),
    },
  })

  const mockRange = new (class Range {
    constructor() {
      this.startContainer = {
        parentNode: document.createElement('div'),
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
    },
  })
}

export const loadImage = async (imagePath) =>
  await fs.readFile(path.resolve(imagePath))

export const axeComponent = async (...components) => {
  const html = components
    .map((Component) => {
      // Support @testing-library/react
      if (Component?.container) {
        return Component.container.outerHTML
      }

      return null
    })
    .filter(Boolean)
    .join('\n')

  return await axe(
    `<main>${html}</main>`,
    typeof components[1] === 'object' ? components[1] : null
  )
}
