/**
 * @jest-environment node
 */
// @vitest-environment node

describe('Eufemia SSR', () => {
  it('should not initialize Eufemia when window is undefined', async () => {
    expect(typeof window).toBe('undefined')

    const { init } = await import('../Eufemia')
    // Should not throw when window is undefined
    expect(() => init()).not.toThrow()
  })
})
