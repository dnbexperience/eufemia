import {
  findCurrentSectionIndex,
  fitSectionTopsToScrollRange,
} from '../useCurrentSectionId'

const OFFSET = 96

describe('findCurrentSectionIndex', () => {
  it('returns null when there are no sections', () => {
    expect(findCurrentSectionIndex([], OFFSET)).toBeNull()
  })

  it('finds the first section while nothing has crossed the offset', () => {
    expect(findCurrentSectionIndex([200, 600, 1000], OFFSET)).toBe(0)
  })

  it('keeps the first section current while it still occupies the top', () => {
    expect(findCurrentSectionIndex([-100, 300, 900], OFFSET)).toBe(0)
  })

  it('finds a middle section once it crosses the offset', () => {
    expect(findCurrentSectionIndex([-400, 50, 700], OFFSET)).toBe(1)
  })

  it('finds the last section once its heading crosses the offset', () => {
    expect(findCurrentSectionIndex([-900, -500, -100], OFFSET)).toBe(2)
  })

  it('finds the only section', () => {
    expect(findCurrentSectionIndex([1000], OFFSET)).toBe(0)
  })

  it('counts a section as started exactly at the offset', () => {
    expect(findCurrentSectionIndex([-400, OFFSET, 700], OFFSET)).toBe(1)
  })
})

describe('fitSectionTopsToScrollRange', () => {
  const positions = [184, 368, 608, 1332, 2164, 3236, 3444, 3684]
  const maximum = 2981

  it('selects every heading in order while slowly scrolling, including the short final sections', () => {
    const selected = new Set<number>()
    for (let scrollTop = 0; scrollTop <= maximum; scrollTop++) {
      const tops = positions.map((position) => position - scrollTop)
      const fitted = fitSectionTopsToScrollRange(
        tops,
        OFFSET,
        scrollTop,
        maximum
      )
      selected.add(findCurrentSectionIndex(fitted, OFFSET))
    }
    expect([...selected]).toEqual([0, 1, 2, 3, 4, 5, 6, 7])
  })

  it('keeps ordinary thresholds until the last heading that can reach the offset', () => {
    const fitted = fitSectionTopsToScrollRange(
      positions,
      OFFSET,
      0,
      maximum
    )
    expect(fitted.slice(0, 5)).toEqual(positions.slice(0, 5))
    expect(fitted[5]).toBeGreaterThan(positions[4])
    expect(fitted[6]).toBeGreaterThan(fitted[5])
    expect(fitted[7]).toBeLessThan(maximum + OFFSET)
  })

  it('leaves fully reachable headings and non-scrolling pages unchanged', () => {
    expect(
      fitSectionTopsToScrollRange([0, 200, 400], OFFSET, 0, 800)
    ).toEqual([0, 200, 400])
    expect(fitSectionTopsToScrollRange([100, 300], OFFSET, 0, 0)).toEqual([
      100, 300,
    ])
  })

  it('does not collapse final headings when an earlier heading exactly reaches maximum scroll', () => {
    const positions = [100, 396, 500, 600]
    const selected = new Set<number>()
    for (let scrollTop = 0; scrollTop <= 300; scrollTop++) {
      selected.add(
        findCurrentSectionIndex(
          fitSectionTopsToScrollRange(
            positions.map((position) => position - scrollTop),
            OFFSET,
            scrollTop,
            300
          ),
          OFFSET
        )
      )
    }
    expect([...selected]).toEqual([0, 1, 2, 3])
  })

  it('gives the final section an interval before the bottom, including fractional scroll positions', () => {
    for (const scrollTop of [maximum - 20, maximum - 0.5, maximum]) {
      const fitted = fitSectionTopsToScrollRange(
        positions.map((position) => position - scrollTop),
        OFFSET,
        scrollTop,
        maximum,
        1000
      )
      expect(findCurrentSectionIndex(fitted, OFFSET)).toBe(7)
    }
  })
})
