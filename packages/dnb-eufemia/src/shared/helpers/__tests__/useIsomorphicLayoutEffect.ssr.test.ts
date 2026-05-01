/**
 * @jest-environment node
 */
// @vitest-environment node

describe('useIsomorphicLayoutEffect SSR', () => {
  it('should use useEffect during SSR', async () => {
    expect(typeof window).toBe('undefined')

    const { useIsomorphicLayoutEffect: ssrVersion } =
      await import('../useIsomorphicLayoutEffect')
    const { useEffect: reactUseEffect } = await import('react')

    expect(ssrVersion).toBe(reactUseEffect)
  })
})
