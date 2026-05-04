/**
 * @vitest-environment jsdom
 */

/**
 * Tests for useIsomorphicLayoutEffect (browser environment)
 *
 * SSR test is in useIsomorphicLayoutEffect.ssr.test.ts using @jest-environment node
 */

describe('useIsomorphicLayoutEffect', () => {
  it('should be useLayoutEffect in browser environment', async () => {
    const { vi } = await import('vitest')
    vi.resetModules()

    const { useIsomorphicLayoutEffect } =
      await import('../useIsomorphicLayoutEffect')
    const { useLayoutEffect } = await import('react')

    expect(useIsomorphicLayoutEffect.toString()).toBe(
      useLayoutEffect.toString()
    )
  })
})
