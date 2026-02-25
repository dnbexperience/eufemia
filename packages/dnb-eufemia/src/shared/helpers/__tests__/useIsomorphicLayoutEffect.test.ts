/**
 * Tests for useIsomorphicLayoutEffect (browser environment)
 *
 * SSR test is in useIsomorphicLayoutEffect.ssr.test.ts using @jest-environment node
 */

import { useLayoutEffect } from 'react'
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

describe('useIsomorphicLayoutEffect', () => {
  it('should be useLayoutEffect in browser environment', () => {
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect)
  })
})
