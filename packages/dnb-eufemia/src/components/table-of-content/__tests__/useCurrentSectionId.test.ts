import { findCurrentSectionIndex } from '../useCurrentSectionId'

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

  it('finds the last section when scrolled to the bottom', () => {
    expect(findCurrentSectionIndex([-900, -500, -100], OFFSET)).toBe(2)
  })

  it('finds the only section', () => {
    expect(findCurrentSectionIndex([1000], OFFSET)).toBe(0)
  })

  it('counts a section as started exactly at the offset', () => {
    expect(findCurrentSectionIndex([-400, OFFSET, 700], OFFSET)).toBe(1)
  })
})
