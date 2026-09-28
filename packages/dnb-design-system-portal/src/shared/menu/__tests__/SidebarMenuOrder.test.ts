import { describe, it, expect } from 'vitest'
import { createOrderKey } from '../SidebarMenuOrder'

const sortByOrder = (orders: Array<number>) =>
  [...orders].sort((a, b) => {
    const keyA = createOrderKey(a, 0)
    const keyB = createOrderKey(b, 0)

    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0
  })

describe('createOrderKey', () => {
  it('puts positive order first, unordered and 0 in the middle, and negative last', () => {
    expect(createOrderKey(1, 0)).toBe('1001')
    expect(createOrderKey(0, 0)).toBe('2000')
    expect(createOrderKey(undefined, 0)).toBe('2000')
    expect(createOrderKey(-1, 0)).toBe('3999')

    expect(createOrderKey(1, 0) < createOrderKey(undefined, 0)).toBe(true)
    expect(createOrderKey(undefined, 0) < createOrderKey(-1, 0)).toBe(true)
  })

  it('sorts numerically, regardless of how many digits the order has', () => {
    expect(sortByOrder([100, 2, 999, 11, 1])).toEqual([1, 2, 11, 100, 999])
    expect(sortByOrder([-1, -100, -999, -11])).toEqual([
      -999, -100, -11, -1,
    ])
  })

  it('sorts a fractional order between its surrounding integers', () => {
    expect(sortByOrder([101, 4, 4.5, 5, -4, -4.18, -5])).toEqual([
      4, 4.5, 5, 101, -5, -4.18, -4,
    ])
  })

  it('never lets an ordered page overlap with an unordered page', () => {
    const highest = createOrderKey(999, 0)
    const lowest = createOrderKey(-999, 0)

    for (const fallbackIndex of [0, 1, 99, 999, 1000, 12345]) {
      const unordered = createOrderKey(undefined, fallbackIndex)

      expect(highest < unordered).toBe(true)
      expect(unordered < lowest).toBe(true)
    }
  })

  it('clamps an order outside the supported range', () => {
    expect(createOrderKey(1000, 0)).toBe(createOrderKey(999, 0))
    expect(createOrderKey(-1000, 0)).toBe(createOrderKey(-999, 0))

    expect(createOrderKey(1000, 0) > createOrderKey(998, 0)).toBe(true)
    expect(createOrderKey(-1000, 0) < createOrderKey(-998, 0)).toBe(true)
  })

  it('keeps unordered pages in their sibling order', () => {
    expect(
      [2, 0, 1]
        .map((fallbackIndex) => createOrderKey(undefined, fallbackIndex))
        .sort()
    ).toEqual(['2000', '2001', '2002'])
  })
})
