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
}

// Silence known noisy console output globally
const originalError = console.error
const originalLog = console.log
const originalWarn = console.warn

// ANSI escape prefix used by Eufemia's warn() helper
const eufemiaAnsiPrefix =
  '\u001b[0m\u001b[1m\u001b[38;5;23m\u001b[48;5;152m'

// Known-noisy console.error output that should never reach the test report.
function isSilencedError(msg: string) {
  return (
    /not wrapped in act/.test(msg) ||
    /not configured to support act/.test(msg) ||
    /component suspended inside an `act` scope/.test(msg) ||
    /Not implemented: navigation/.test(msg)
  )
}

// jsdom reports its own errors (e.g. "Not implemented: navigation to another
// Document") through a VirtualConsole that captured a console reference when
// the environment was created — before the overrides below were installed — so
// those messages bypass the console.error override entirely. Re-point the
// jsdomError handler so it runs the same silence filter and forwards the rest
// through the captured originalError. Forwarding via originalError (rather than
// the live console.error) keeps jsdom's internal errors out of any per-test
// console.error spy, matching the behaviour before this redirect.
type JSDOMError = {
  type?: string
  message?: string
  cause?: { stack?: string }
}
type VirtualConsole = {
  removeAllListeners: (event: string) => void
  on: (event: string, listener: (error: JSDOMError) => void) => void
}

function redirectJSDOMErrors() {
  if (typeof window === 'undefined') {
    return // stop here
  }

  const virtualConsole = (
    window as unknown as { _virtualConsole?: VirtualConsole }
  )._virtualConsole

  if (!virtualConsole) {
    return // stop here
  }

  virtualConsole.removeAllListeners('jsdomError')
  virtualConsole.on('jsdomError', (error) => {
    const output =
      error?.type === 'unhandled-exception'
        ? error.cause?.stack
        : error?.message

    if (isSilencedError(String(output ?? ''))) {
      return // stop here
    }

    originalError.call(console, output)
  })
}

beforeAll(() => {
  console.error = (...args) => {
    const msg = String(args[0] ?? '')
    if (isSilencedError(msg)) {
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

  redirectJSDOMErrors()
})

afterAll(() => {
  console.error = originalError
  console.log = originalLog
  console.warn = originalWarn
})
