/**
 * @jest-environment node
 */

describe('useIsomorphicLayoutEffect SSR', () => {
  it('should use useEffect during SSR', () => {
    expect(typeof window).toBe('undefined')

    const {
      useIsomorphicLayoutEffect: ssrVersion,
    } = require('../useIsomorphicLayoutEffect')
    const { useEffect: reactUseEffect } = require('react')

    expect(ssrVersion).toBe(reactUseEffect)
  })
})
