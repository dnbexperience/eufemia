import { structuredClone } from '../structuredClone'

describe('structuredClone', () => {
  it('should clone primitive values', () => {
    expect(structuredClone(42)).toBe(42)
    expect(structuredClone('test')).toBe('test')
    expect(structuredClone(true)).toBe(true)
    expect(structuredClone(null)).toBe(null)
  })

  it('should clone objects deeply', () => {
    const original = { a: 1, b: { c: 2, d: [3, 4] } }
    const cloned = structuredClone(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned.b).not.toBe(original.b)
    expect(cloned.b.d).not.toBe(original.b.d)
  })

  it('should clone arrays deeply', () => {
    const original = [1, 2, { a: 3 }, [4, 5]]
    const cloned = structuredClone(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned[2]).not.toBe(original[2])
    expect(cloned[3]).not.toBe(original[3])
  })

  it('should handle Date objects', () => {
    const original = new Date('2026-02-09')
    const cloned = structuredClone(original)

    expect(cloned).toEqual(original)
    expect(cloned).not.toBe(original)
    expect(cloned.getTime()).toBe(original.getTime())
  })

  it('should handle nested structures', () => {
    const original = {
      name: 'Test',
      values: [1, 2, 3],
      nested: {
        deep: {
          value: 'test',
        },
      },
    }

    const cloned = structuredClone(original)

    // Modify cloned object
    cloned.values.push(4)
    cloned.nested.deep.value = 'modified'

    // Original should remain unchanged
    expect(original.values).toEqual([1, 2, 3])
    expect(original.nested.deep.value).toBe('test')
  })
})
