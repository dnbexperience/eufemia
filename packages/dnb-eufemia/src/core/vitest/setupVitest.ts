/**
 * Vitest setup — replaces setupJest.ts
 *
 * Provides:
 * - jest→vi compatibility (so existing test files work unchanged)
 * - @testing-library/jest-dom matchers
 * - Custom matchers (toBeType, toNeverResolve)
 * - jest-axe setup
 * - bypassActWarning
 */

import { vi, expect, beforeEach, beforeAll, afterAll } from 'vitest'
import type { MockedFunction } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { waitFor } from '@testing-library/react'
import { toBeType } from 'jest-tobetype'

// ──────────────────────────────────────────────
// jest → vi compatibility shim
// Allows existing test files using jest.fn(), jest.spyOn(), jest.mock(), etc.
// to work without any code changes.
// ──────────────────────────────────────────────
const jestCompat = Object.assign(vi, {
  // jest.requireActual is sync in Jest but vi.importActual is async.
  // Inside vi.mock() factories, the factory can be async, so this works.
  requireActual: (moduleName: string) => {
    // Use a dynamic import that resolves synchronously if already cached
    // This won't work for all cases but handles the common jest.mock() factory pattern
    return vi.importActual(moduleName)
  },
  // jest.mocked() returns the mock-typed version of a function
  mocked: <T>(fn: T) =>
    fn as MockedFunction<T extends (...args: any[]) => any ? T : never>,
  // jest.setTimeout() maps to vi.setConfig
  setTimeout: (timeout: number) => vi.setConfig({ testTimeout: timeout }),
  // jest.retryTimes() — no direct vitest equivalent via setConfig, no-op
  retryTimes: (_numRetries: number) => {}, // eslint-disable-line @typescript-eslint/no-empty-function
})
globalThis.jest = jestCompat as any

// Tell React 18+ that this environment supports act()
globalThis.IS_REACT_ACT_ENVIRONMENT = true

// Clean up the DOM between tests
beforeEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
  }
})

// Custom matchers
expect.extend({ toBeType })

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
})

// For Yarn v3 we need this fix to make jest-axe work properly
// https://github.com/nickcolley/jest-axe/issues/147
if (typeof window !== 'undefined') {
  const { getComputedStyle } = window
  window.getComputedStyle = (...args) => getComputedStyle(...args)

  // jsdom's window.scrollTo throws "Not implemented" — replace unconditionally
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
  Element.prototype.scrollTo =
    vi.fn() as unknown as typeof Element.prototype.scrollTo

  // Suppress jsdom "Not implemented: navigation" errors emitted via virtualConsole
  const win = window as unknown as Record<string, unknown>
  const virtualConsole = win._virtualConsole as
    | { emit: (...args: unknown[]) => boolean }
    | undefined
  if (virtualConsole) {
    const origEmit = virtualConsole.emit.bind(virtualConsole)
    virtualConsole.emit = (...allArgs: unknown[]) => {
      const [event, ...args] = allArgs
      if (
        event === 'jsdomError' &&
        args[0] instanceof Error &&
        /Not implemented/.test(args[0].message)
      ) {
        return false
      }
      return origEmit(event, ...args)
    }
  }

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
