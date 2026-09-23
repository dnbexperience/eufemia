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

type JSDOMError = Error & { type?: string }

type GlobalWithJSDOM = typeof globalThis & {
  jsdom?: {
    virtualConsole?: {
      removeAllListeners: (eventName: string) => void
      on: (
        eventName: 'jsdomError',
        listener: (error: JSDOMError) => void
      ) => void
    }
  }
}

// Tell React 18+ that this environment supports act()
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Clean up the DOM between tests
beforeEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
  }
})

expect.extend({
  async toNeverResolve(
    callable: () => void | Promise<void>,
    options?: { timeout?: number; interval?: number }
  ) {
    // This matcher asserts that a condition never becomes true, so
    // waitFor always polls for the full duration. The default waitFor
    // timeout (1000ms) made every assertion needlessly slow; a short
    // window is enough to confirm the negative. Callers can opt into a
    // longer window via options when a slower condition must be ruled out.
    const { timeout = 100, interval = 20 } = options ?? {}

    try {
      await waitFor(callable, { timeout, interval })
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

  // jsdom does not implement the Window scroll methods and logs a noisy
  // "Not implemented: Window's scrollTo() method" error through its virtual
  // console whenever a component calls them during a test. Provide no-op
  // stubs so the methods behave like a real browser (a silent no-op) while
  // remaining plain data properties that individual tests can still spy on
  // or override.
  window.scrollTo = () => undefined
  window.scroll = () => undefined
  window.scrollBy = () => undefined
}

// jsdom reports its internal problems ("not implemented" notices, uncaught
// exceptions inside the document and resource errors) as "jsdomError" events
// on its virtual console, which forwards them to the Node console captured
// while the environment was created. That bypasses Vitest's console
// interception, so the output is printed without any test attribution.
// Replace the forwarder with one that drops the navigation notices — emitted
// whenever a test clicks a real link, which jsdom cannot follow — and reports
// everything else through Vitest's console.
const { virtualConsole } = (globalThis as GlobalWithJSDOM).jsdom ?? {}
virtualConsole?.removeAllListeners('jsdomError')
virtualConsole?.on('jsdomError', (error) => {
  if (/Not implemented: navigation/.test(error.message)) {
    return // stop here
  }

  console.error(
    error.type === 'unhandled-exception'
      ? (error.cause as Error | undefined)?.stack
      : error.message
  )
})

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
      /component suspended inside an `act` scope/.test(msg)
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
