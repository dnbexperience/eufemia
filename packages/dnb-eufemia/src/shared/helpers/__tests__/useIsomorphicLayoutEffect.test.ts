/**
 * Tests for useIsomorphicLayoutEffect
 */

import { useEffect, useLayoutEffect } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

describe('useIsomorphicLayoutEffect', () => {
  it('should be useLayoutEffect in browser environment', () => {
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect)
  })

  it('should use useEffect during SSR', () => {
    const originalWindow = global.window
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (global as any).window

    // Re-import to get SSR version
    jest.resetModules()
    const {
      useIsomorphicLayoutEffect: ssrVersion,
    } = require('../useIsomorphicLayoutEffect')

    expect(ssrVersion).toBe(useEffect)

    // Restore window
    global.window = originalWindow
  })
})
