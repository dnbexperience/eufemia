import {
  formatDate,
  formatDateRange,
  getOsloDate,
  getRelativeTime,
  getRelativeTimeNextUpdateMs,
  parseDuration,
  formatDuration,
  isValidDuration,
  FormatDateOptions,
} from '../DateFormatUtils'

describe('DateFormatUtils', () => {
  describe('formatDate', () => {
    it('formats a date using locale options', () => {
      const opts: FormatDateOptions = {
        locale: 'en-GB',
        options: { dateStyle: 'short' },
      }
      expect(formatDate('2024-10-05', opts)).toBe('05/10/2024')
    })

    it('accepts Date objects and falls back to default locale', () => {
      const d = new Date('2024-10-06T00:00:00.000Z')
      // Default locale uses a short date style like day.month.year
      expect(formatDate(d)).toMatch(/\d{2}[./]\d{2}[./]\d{4}/)
    })

    it('formats dates using Intl.DateTimeFormat', () => {
      const spy = jest.spyOn(Intl, 'DateTimeFormat')

      formatDate('2024-10-05', {
        locale: 'en-GB',
        options: { dateStyle: 'short' },
      })

      expect(spy).toHaveBeenCalledWith(
        'en-GB',
        expect.objectContaining({ dateStyle: 'short' })
      )

      spy.mockRestore()
    })
  })

  describe('formatDateRange', () => {
    it('formats a date range using formatRange when available', () => {
      const opts: FormatDateOptions = {
        locale: 'en-GB',
        options: { dateStyle: 'long' },
      }
      // We cannot assert exact string because the i18n API may vary per environment,
      // but we can assert it contains both formatted dates separated by something
      const res = formatDateRange(
        { startDate: '2024-10-01', endDate: '2024-10-31' },
        opts
      )
      expect(res).toContain('2024')
    })
  })

  describe('getRelativeTime', () => {
    beforeAll(() => {
      jest.useFakeTimers({ now: new Date('2024-10-05T12:00:00.000Z') })
    })
    afterAll(() => {
      jest.useRealTimers()
    })

    it('returns past time in words', () => {
      const past = new Date('2024-10-05T11:00:00.000Z')
      const res = getRelativeTime(past, 'en', {
        numeric: 'always',
        style: 'long',
      })
      expect(typeof res).toBe('string')
      expect(res).toMatch(/hour|minute|second/)
    })

    it('returns future time in words', () => {
      const future = new Date('2024-10-05T13:30:00.000Z')
      const res = getRelativeTime(future, 'en', {
        numeric: 'always',
        style: 'long',
      })
      expect(res).toMatch(/in|minute|hour|second/)
    })

    it('should use custom relativeTimeReference Date for relative time calculation', () => {
      const referenceDate = new Date('2024-10-05T12:00:00.000Z')
      const past = new Date('2024-10-05T11:00:00.000Z')
      const res = getRelativeTime(
        past,
        'en',
        {
          numeric: 'always',
          style: 'long',
        },
        undefined,
        referenceDate
      )
      expect(res).toMatch(/hour|minute|second/)
      expect(res).toMatch(/ago|since/)
    })

    it('should use custom relativeTimeReference function for relative time calculation', () => {
      const referenceDate = new Date('2024-10-05T12:00:00.000Z')
      const past = new Date('2024-10-05T11:00:00.000Z')
      const relativeTimeReferenceFn = () => referenceDate
      const res = getRelativeTime(
        past,
        'en',
        {
          numeric: 'always',
          style: 'long',
        },
        undefined,
        relativeTimeReferenceFn
      )
      expect(res).toMatch(/hour|minute|second/)
      expect(res).toMatch(/ago|since/)
    })

    it('defaults to current time when relativeTimeReference is not provided', () => {
      const past = new Date('2024-10-05T11:00:00.000Z')
      const res = getRelativeTime(past, 'en', {
        numeric: 'always',
        style: 'long',
      })
      expect(typeof res).toBe('string')
      expect(res).toMatch(/hour|minute|second/)
    })
  })

  describe('getRelativeTimeNextUpdateMs', () => {
    it('returns minimum threshold for seconds granularity', () => {
      const relativeTimeReference = new Date('2024-10-05T12:00:00.000Z')
      const date = new Date(relativeTimeReference.getTime() + 5_500) // 5.5s in future
      const ms = getRelativeTimeNextUpdateMs(date, relativeTimeReference)
      expect(ms).toBeGreaterThanOrEqual(500)
      expect(ms).toBeLessThan(2000)
    })

    it('returns a sane delay for larger units', () => {
      const relativeTimeReference = new Date('2024-10-05T12:00:00.000Z')
      const date = new Date(
        relativeTimeReference.getTime() + 60 * 60 * 1000
      ) // +1h
      const ms = getRelativeTimeNextUpdateMs(date, relativeTimeReference)
      expect(ms).toBeGreaterThan(1000)
    })

    it('accepts relativeTimeReference as a function', () => {
      const relativeTimeReference = new Date('2024-10-05T12:00:00.000Z')
      const relativeTimeReferenceFn = () => relativeTimeReference
      const date = new Date(relativeTimeReference.getTime() + 5_500) // 5.5s in future
      const ms = getRelativeTimeNextUpdateMs(date, relativeTimeReferenceFn)
      expect(ms).toBeGreaterThanOrEqual(500)
      expect(ms).toBeLessThan(2000)
    })

    it('defaults to current time when relativeTimeReference is not provided', () => {
      const date = new Date(Date.now() + 5_500) // 5.5s in future
      const ms = getRelativeTimeNextUpdateMs(date)
      expect(ms).toBeGreaterThanOrEqual(500)
    })
  })

  describe('parseDuration', () => {
    it('parses ISO 8601 durations', () => {
      expect(parseDuration('PT30S')).toBe(30_000)
      expect(parseDuration('PT2M')).toBe(120_000)
      expect(parseDuration('PT1H30M')).toBe(90 * 60 * 1000)
      expect(parseDuration('P1DT2H')).toBe(
        24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000
      )
      expect(parseDuration('P1W')).toBe(7 * 24 * 60 * 60 * 1000)
    })

    it('should handle invalid or empty strings as 0', () => {
      expect(parseDuration('')).toBe(0)
      expect(parseDuration(null)).toBe(0)
      expect(parseDuration('INVALID')).toBe(0)
    })
  })

  describe('formatDuration', () => {
    type DurationFormatCtor = new (
      locales?: string | string[],
      options?: { style?: 'long' | 'short' | 'narrow' }
    ) => { format(value: Record<string, number>): string }
    type IntlWithDuration = typeof Intl & {
      DurationFormat?: DurationFormatCtor
    }
    const intlRef = Intl as IntlWithDuration
    const originalDuration = intlRef.DurationFormat

    beforeEach(() => {
      // Mock Intl.DurationFormat where available behavior is uncertain
      intlRef.DurationFormat = class {
        constructor(
          public locales?: string | string[],
          public options?: { style?: 'long' | 'short' | 'narrow' }
        ) {
          // touch props to avoid unused warnings
          void this.locales
          void this.options
        }
        format(obj: Record<string, number>): string {
          return Object.entries(obj)
            .filter(([, v]) => typeof v === 'number')
            .map(([k, v]) => `${v} ${k}`)
            .join(' ')
        }
      }
    })

    afterEach(() => {
      intlRef.DurationFormat = originalDuration
    })

    it('formats non-zero durations using Intl.DurationFormat when present', () => {
      const ms = parseDuration('PT1H30M20S')
      const str = formatDuration(ms, 'en', 'long', 'PT1H30M20S')
      expect(str).toContain('1 hours')
      expect(str).toContain('30 minutes')
      expect(str).toContain('20 seconds')
    })

    it('falls back to manual formatting when 0 and no output from formatter', () => {
      // Force formatter to return empty string for zero
      intlRef.DurationFormat = class {
        // eslint-disable-next-line class-methods-use-this
        format() {
          return ''
        }
      }

      expect(formatDuration(0, 'en')).toBe('0')
    })

    it('manual fallback lists units when Intl.DurationFormat not available', () => {
      intlRef.DurationFormat = undefined
      const ms = parseDuration('PT2H15M')
      const str = formatDuration(ms, 'en')
      expect(str).toMatch(/2 hours/)
      expect(str).toMatch(/15 minutes/)
    })
  })

  describe('isValidDuration', () => {
    it('accepts valid ISO 8601 duration strings', () => {
      expect(isValidDuration('PT0S')).toBe(true)
      expect(isValidDuration('P1DT2H')).toBe(true)
      expect(isValidDuration('P1Y2M3W4D')).toBe(true)
      expect(isValidDuration('PT5H6M7S')).toBe(true)
    })

    it('rejects invalid strings', () => {
      expect(isValidDuration('')).toBe(false)
      expect(isValidDuration(null)).toBe(false)
      expect(isValidDuration('P')).toBe(false)
      expect(isValidDuration('PT')).toBe(false)
      expect(isValidDuration('INVALID')).toBe(false)
    })
  })

  describe('getOsloDate', () => {
    let previousTZ: string | undefined

    beforeEach(() => {
      previousTZ = process.env.TZ
    })

    afterEach(() => {
      process.env.TZ = previousTZ
    })

    it('returns Oslo date as UTC Date object with midnight when runtime is ahead of Oslo', () => {
      process.env.TZ = 'Pacific/Auckland'
      const date = new Date('2025-11-25T22:00:00.000Z') // 26th in Auckland, still 25th in Oslo
      const result = getOsloDate(date)
      expect(result).toBeInstanceOf(Date)
      expect(result.toISOString()).toBe('2025-11-25T00:00:00.000Z')
    })

    it('returns Oslo date as UTC Date object with midnight when runtime is behind Oslo', () => {
      process.env.TZ = 'America/New_York'
      const date = new Date('2025-11-25T02:00:00.000Z') // 24th in NYC, 25th in Oslo
      const result = getOsloDate(date)
      expect(result).toBeInstanceOf(Date)
      expect(result.toISOString()).toBe('2025-11-25T00:00:00.000Z')
    })
  })
})
