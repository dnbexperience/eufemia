// @vitest-environment node

vi.hoisted(() => {
  // Simulate browsers without native structuredClone (e.g. Safari < 15.4)
  vi.stubGlobal('structuredClone', undefined)
})

import { structuredClone } from '../structuredClone'

describe('structuredClone without native support', () => {
  afterAll(() => {
    vi.unstubAllGlobals()
  })

  it('should not let cloned data change the prototype', () => {
    const data = JSON.parse('{"__proto__":{"injected":true},"name":"x"}')

    const cloned = structuredClone(data)

    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype)
    expect(cloned.injected).toBeUndefined()
    expect(cloned.name).toBe('x')
  })

  it('should clone an invalid Date', () => {
    const cloned = structuredClone({ date: new Date(NaN) })

    expect(cloned.date).toBeInstanceOf(Date)
    expect(Number.isNaN(cloned.date.getTime())).toBe(true)
  })
})
