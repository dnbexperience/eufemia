// @vitest-environment node

import formatDateRange from '../utils/formatDateRange'

describe('formatDateRange', () => {
  it('returns undefined when both from and to are null', () => {
    expect(formatDateRange(null, null)).toBeUndefined()
  })

  it('returns undefined when both from and to are undefined', () => {
    expect(formatDateRange(undefined, undefined)).toBeUndefined()
  })

  it('formats a single from date in long style', () => {
    const result = formatDateRange('2026-01-15', null, 'nb-NO')
    expect(result).toBe('15. januar 2026')
  })

  it('formats a single to date in long style', () => {
    const result = formatDateRange(null, '2026-06-05', 'nb-NO')
    expect(result).toBe('5. juni 2026')
  })

  it('formats a date range in long style', () => {
    const result = formatDateRange('2026-01-15', '2026-06-05', 'nb-NO')
    expect(result).toBe('15. januar–5. juni 2026')
  })

  it('formats a single date when from and to are equal', () => {
    const result = formatDateRange('2026-03-10', '2026-03-10', 'nb-NO')
    expect(result).toBe('10. mars 2026')
  })

  it('formats with en-GB locale', () => {
    const result = formatDateRange('2026-01-15', '2026-06-05', 'en-GB')
    expect(result).toBe('15 January\u2009–\u20095 June 2026')
  })

  it('formats a single date with en-GB locale', () => {
    const result = formatDateRange('2026-01-15', null, 'en-GB')
    expect(result).toBe('15 January 2026')
  })
})
