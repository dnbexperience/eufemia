/**
 * Jest Setup for testing
 *
 */

import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import { toBeType } from 'jest-tobetype'

// To cleanup axe test leftovers from a test run before the current one
beforeEach(() => {
  document.body.innerHTML = ''
})

expect.extend({ toBeType })

expect.extend({
  async neverToResolve(callable) {
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
  // this is just a little hack to silence a warning that we'll get until we
  // upgrade to 16.9. See also: https://github.com/facebook/react/pull/14853
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return
      }
      originalError.call(console, ...args)
    }
  })

  afterAll(() => {
    console.error = originalError
  })
}

// Call it for now regardless
// TODO: We may call this later only if enzyme is used
// but we can't call it "inside a test", because we use beforeAll / afterAll
bypassActWarning()
