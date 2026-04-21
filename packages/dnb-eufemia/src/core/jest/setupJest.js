/**
 * Jest Setup for testing
 *
 */

import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { toBeType } from 'jest-tobetype'

// To cleanup axe test leftovers from a test run before the current one
beforeEach(() => {
  if (typeof document !== 'undefined') {
    document.body.innerHTML = ''
  }
})

expect.extend({ toBeType })

expect.extend({
  async toNeverResolve(callable) {
    try {
      await waitFor(callable)
      return {
        pass: false,
        message: () => 'Expected the function to reject, but it resolved.',
      }
    } catch (error) {
      // If it rejects, the test passes
      return {
        pass: true,
        message: () =>
          'Expected the function to resolve, but it correctly rejected.',
      }
    }
  },
})

// For Yarn v3 we need this fix in order to make jest-axe work properly
// https://github.com/nickcolley/jest-axe/issues/147
if (typeof window !== 'undefined') {
  const { getComputedStyle } = window
  window.getComputedStyle = (...args) => getComputedStyle(...args)
}

const originalError = console.error
export function bypassActWarning() {
  // Silence React "not wrapped in act" and Suspense scope warnings in tests
  beforeAll(() => {
    console.error = (...args) => {
      const msg = String(args[0] ?? '')
      if (
        /not wrapped in act/.test(msg) ||
        /component suspended inside an `act` scope/.test(msg)
      ) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterAll(() => {
    console.error = originalError
  })
}

// Called globally because it uses beforeAll / afterAll
bypassActWarning()
