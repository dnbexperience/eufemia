/**
 * Jest Setup
 *
 */

import { axe, toHaveNoViolations } from 'jest-axe'
import fs from 'fs-extra'
import path from 'path'
import sass from 'sass'
import type { Options } from 'sass'

export { axe, toHaveNoViolations }

expect.extend(toHaveNoViolations)

export const wait = (t: number) => new Promise((r) => setTimeout(r, t))

export const loadScss = (
  file: string | null,
  options: Partial<Options<'sync'>> & { data?: string } = {}
) => {
  try {
    const { data, ...sassOptions } = options
    const importPath2 = path.resolve(__dirname, '../../style/core/')

    if (data) {
      const sassResult = sass.compileString(data, {
        loadPaths: [importPath2],
        sourceMap: false,
        ...sassOptions,
      })

      return sassResult.css
    }

    const importPath1 = path.dirname(file!)
    const sassResult = sass.compile(file!, {
      loadPaths: [importPath1, importPath2],
      sourceMap: false,
      ...sassOptions,
    })

    return sassResult.css
  } catch (e) {
    console.error('loadScss error:', e)
    return e
  }
}

export const mockClipboard = () => {
  let memory = ''
  const clipboardMock = {
    writeText: jest.fn().mockImplementation((v) => {
      memory = v
      return Promise.resolve(v)
    }),
    readText: jest.fn().mockImplementation(() => Promise.resolve(memory)),
  }

  Object.defineProperty(window.navigator, 'clipboard', {
    configurable: true,
    value: clipboardMock,
  })

  const mockRange = new (class Range {
    node: HTMLElement | undefined
    startContainer: { parentNode: HTMLElement }
    constructor() {
      this.startContainer = {
        parentNode: document.createElement('div'),
      }
    }
    getElement() {
      return this.node
    }
    insertNode(elem: HTMLElement) {
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
    getRangeAt(index: number) {
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

export const loadImage = async (imagePath: string) =>
  await fs.readFile(path.resolve(imagePath))

export const axeComponent = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...components: any[]
) => {
  const html = components
    .map((Component: { container?: HTMLElement }) => {
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

export function spyOnEufemiaWarn() {
  const originalConsoleLog = console.log
  const log = jest
    .spyOn(console, 'log')
    .mockImplementation((...message: string[]) => {
      if (!message[0].includes('Eufemia')) {
        originalConsoleLog(...message)
      }
    })

  return log
}
