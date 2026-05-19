/**
 * Vitest setup.
 *
 * Provides:
 * - @testing-library/jest-dom matchers
 * - Custom matchers (toNeverResolve)
 * - jest-axe setup
 * - bypassActWarning
 */

import { expect, beforeEach, beforeAll, afterAll } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { waitFor } from '@testing-library/react'

// Tell React 18+ that this environment supports act()
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Clean up the DOM between tests
beforeEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
  }
})

expect.extend({
  async toNeverResolve(callable: () => void | Promise<void>) {
    try {
      await waitFor(callable)
      return {
        pass: false,
        message: () => 'Expected the function to reject, but it resolved.',
      }
    } catch (error) {
      return {
        pass: true,
        message: () =>
          'Expected the function to resolve, but it correctly rejected.',
      }
    }
  },

  toEqualClassNames(received: string[], expected: unknown) {
    const pass =
      typeof expected === 'object' &&
      expected !== null &&
      'asymmetricMatch' in expected &&
      typeof expected.asymmetricMatch === 'function'
        ? expected.asymmetricMatch(received)
        : this.equals(
            [...received].sort(),
            [...(expected as string[])].sort()
          )

    return {
      pass,
      message: () =>
        `Expected ${this.utils.printReceived(received)} ${
          pass ? 'not ' : ''
        }to equal class names ${this.utils.printExpected(expected)}`,
    }
  },
})

if (typeof window !== 'undefined') {
  // Vitest's populateGlobal creates accessor (get/set) properties on
  // globalThis that delegate to dom.window. Since jsdom doesn't implement
  // matchMedia, the accessor returns undefined. But the accessor's
  // existence prevents mock-match-media/polyfill from installing itself
  // (it checks `'matchMedia' in window`). And vi.spyOn/restoreAllMocks
  // can't handle accessor→data→accessor transitions.
  // Fix: remove the empty accessor so mock-match-media can polyfill it,
  // and so vi.spyOn gets a plain data property to work with.
  const matchMediaDesc = Object.getOwnPropertyDescriptor(
    window,
    'matchMedia'
  )
  if (matchMediaDesc && !window.matchMedia) {
    delete (window as unknown as Record<string, unknown>).matchMedia
  }
}

// Silence known noisy console output globally
const originalError = console.error
const originalLog = console.log
const originalWarn = console.warn

// ANSI escape prefix used by Eufemia's warn() helper
const eufemiaAnsiPrefix =
  '\u001b[0m\u001b[1m\u001b[38;5;23m\u001b[48;5;152m'

beforeAll(() => {
  console.error = (...args) => {
    const msg = String(args[0] ?? '')
    if (
      /not wrapped in act/.test(msg) ||
      /not configured to support act/.test(msg) ||
      /component suspended inside an `act` scope/.test(msg) ||
      /Not implemented: navigation/.test(msg)
    ) {
      return
    }
    originalError.call(console, ...args)
  }

  console.log = (...args) => {
    const first = String(args[0] ?? '')
    if (first.startsWith(eufemiaAnsiPrefix)) {
      return // stop here
    }
    originalLog.call(console, ...args)
  }

  console.warn = (...args) => {
    const msg = String(args[0] ?? '')
    if (msg.startsWith(eufemiaAnsiPrefix)) {
      return // stop here
    }
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.log = originalLog
  console.warn = originalWarn
})
