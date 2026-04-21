import { clamp } from '../clamp'

describe('clamp', () => {
  it('should return the value when within range', () => {
    expect(clamp(50)).toBe(50)
  })

  it('should clamp to min when value is below', () => {
    expect(clamp(-10)).toBe(0)
  })

  it('should clamp to max when value is above', () => {
    expect(clamp(150)).toBe(100)
  })

  it('should use custom min and max', () => {
    expect(clamp(5, 10, 20)).toBe(10)
    expect(clamp(25, 10, 20)).toBe(20)
    expect(clamp(15, 10, 20)).toBe(15)
  })

  it('should return min when value equals min', () => {
    expect(clamp(0)).toBe(0)
  })

  it('should return max when value equals max', () => {
    expect(clamp(100)).toBe(100)
  })

  it('should default min to 0 and max to 100', () => {
    expect(clamp(-1)).toBe(0)
    expect(clamp(101)).toBe(100)
  })
})
