import { describe, it, expect } from 'vitest'
import { computeTocHighlight } from '../PortalToc'

const OFFSET = 96

describe('computeTocHighlight', () => {
  it('returns null when there are no headings', () => {
    expect(computeTocHighlight([], OFFSET)).toBeNull()
  })

  it('highlights the first heading while nothing has crossed the top', () => {
    expect(computeTocHighlight([200, 600, 1000], OFFSET)).toBe(0)
  })

  it('keeps the first heading current while it still occupies the top', () => {
    expect(computeTocHighlight([-100, 300, 900], OFFSET)).toBe(0)
  })

  it('highlights a middle heading once it crosses the top', () => {
    expect(computeTocHighlight([-400, 50, 700], OFFSET)).toBe(1)
  })

  it('highlights the last heading when scrolled to the bottom', () => {
    expect(computeTocHighlight([-900, -500, -100], OFFSET)).toBe(2)
  })

  it('highlights the only heading', () => {
    expect(computeTocHighlight([1000], OFFSET)).toBe(0)
  })

  it('includes each heading top margin when locating the top', () => {
    const tops = [-400, 120, 700]
    const margins = [0, 40, 0]
    expect(computeTocHighlight(tops, OFFSET)).toBe(0)
    expect(computeTocHighlight(tops, OFFSET, margins)).toBe(1)
  })
})
