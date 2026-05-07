import { isDeepEqual } from '../isDeepEqual'

describe('isDeepEqual', () => {
  it('should return true for identical primitives', () => {
    expect(isDeepEqual(1, 1)).toBe(true)
    expect(isDeepEqual('foo', 'foo')).toBe(true)
    expect(isDeepEqual(true, true)).toBe(true)
    expect(isDeepEqual(null, null)).toBe(true)
  })

  it('should return false for different primitives', () => {
    expect(isDeepEqual(1, 2)).toBe(false)
    expect(isDeepEqual('foo', 'bar')).toBe(false)
    expect(isDeepEqual(true, false)).toBe(false)
    expect(isDeepEqual(null, undefined)).toBe(false)
  })

  it('should return true for equal plain objects', () => {
    expect(isDeepEqual({ a: 1 }, { a: 1 })).toBe(true)
    expect(isDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(
      true
    )
  })

  it('should return false for objects with different values', () => {
    expect(isDeepEqual({ a: 1 }, { a: 2 })).toBe(false)
    expect(isDeepEqual({ a: 1 }, { b: 1 })).toBe(false)
  })

  it('should return true for equal arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 3])).toBe(true)
    expect(isDeepEqual([{ a: 1 }], [{ a: 1 }])).toBe(true)
  })

  it('should return false for arrays with different values', () => {
    expect(isDeepEqual([1, 2], [1, 3])).toBe(false)
    expect(isDeepEqual([1, 2], [1, 2, 3])).toBe(false)
  })

  it('should return true for same object reference', () => {
    const obj = { a: 1 }
    expect(isDeepEqual(obj, obj)).toBe(true)
  })

  it('should return false for object vs array', () => {
    expect(isDeepEqual({}, [])).toBe(false)
  })
})
