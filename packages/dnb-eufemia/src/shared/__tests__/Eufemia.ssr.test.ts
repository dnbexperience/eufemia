/**
 * @jest-environment node
 */

describe('Eufemia SSR', () => {
  it('should not initialize Eufemia when window is undefined', () => {
    expect(typeof window).toBe('undefined')

    const { init } = require('../Eufemia')
    // Should not throw when window is undefined
    expect(() => init()).not.toThrow()
  })
})
