import {
  formatOrdinalDay,
  getInstallmentDayDisplayValue,
} from '../InstallmentDayDisplay'

describe('formatOrdinalDay', () => {
  it('formats English ordinals (st/nd/rd/th)', () => {
    expect(formatOrdinalDay(1, 'en-GB')).toBe('1st')
    expect(formatOrdinalDay(2, 'en-GB')).toBe('2nd')
    expect(formatOrdinalDay(3, 'en-GB')).toBe('3rd')
    expect(formatOrdinalDay(4, 'en-GB')).toBe('4th')
    expect(formatOrdinalDay(11, 'en-GB')).toBe('11th')
    expect(formatOrdinalDay(12, 'en-GB')).toBe('12th')
    expect(formatOrdinalDay(13, 'en-GB')).toBe('13th')
    expect(formatOrdinalDay(21, 'en-GB')).toBe('21st')
    expect(formatOrdinalDay(22, 'en-GB')).toBe('22nd')
    expect(formatOrdinalDay(23, 'en-GB')).toBe('23rd')
    expect(formatOrdinalDay(28, 'en-GB')).toBe('28th')
  })

  it('formats Norwegian ordinals as the number followed by a period', () => {
    expect(formatOrdinalDay(1, 'nb-NO')).toBe('1.')
    expect(formatOrdinalDay(2, 'nb-NO')).toBe('2.')
    expect(formatOrdinalDay(3, 'nb-NO')).toBe('3.')
    expect(formatOrdinalDay(21, 'nb-NO')).toBe('21.')
    expect(formatOrdinalDay(31, 'nb-NO')).toBe('31.')
  })

  it('formats Danish ordinals as the number followed by a period', () => {
    expect(formatOrdinalDay(1, 'da-DK')).toBe('1.')
    expect(formatOrdinalDay(3, 'da-DK')).toBe('3.')
    expect(formatOrdinalDay(31, 'da-DK')).toBe('31.')
  })

  it('formats Swedish ordinals with :a / :e suffixes', () => {
    expect(formatOrdinalDay(1, 'sv-SE')).toBe('1:a')
    expect(formatOrdinalDay(2, 'sv-SE')).toBe('2:a')
    expect(formatOrdinalDay(3, 'sv-SE')).toBe('3:e')
    expect(formatOrdinalDay(4, 'sv-SE')).toBe('4:e')
    expect(formatOrdinalDay(21, 'sv-SE')).toBe('21:a')
    expect(formatOrdinalDay(22, 'sv-SE')).toBe('22:a')
    expect(formatOrdinalDay(23, 'sv-SE')).toBe('23:e')
    expect(formatOrdinalDay(31, 'sv-SE')).toBe('31:a')
  })

  it('falls back to the plain number for unknown languages', () => {
    expect(formatOrdinalDay(3, 'de-DE')).toBe('3')
  })
})

describe('getInstallmentDayDisplayValue', () => {
  const nb = {
    dayDisplay: '{day} dagen i måneden',
    lastDayLabel: 'Siste dagen i måneden',
    locale: 'nb-NO',
  }

  it('returns undefined for a nullish value', () => {
    expect(getInstallmentDayDisplayValue(undefined, nb)).toBeUndefined()
  })

  it('returns the last day label for "last"', () => {
    expect(getInstallmentDayDisplayValue('last', nb)).toBe(
      'Siste dagen i måneden'
    )
  })

  it('interpolates the locale-aware ordinal into the template', () => {
    expect(getInstallmentDayDisplayValue(3, nb)).toBe('3. dagen i måneden')
    expect(
      getInstallmentDayDisplayValue(1, {
        dayDisplay: '{day} day of the month',
        lastDayLabel: 'Last day of month',
        locale: 'en-GB',
      })
    ).toBe('1st day of the month')
    expect(
      getInstallmentDayDisplayValue(3, {
        dayDisplay: '{day} dagen i månaden',
        lastDayLabel: 'Sista dagen i månaden',
        locale: 'sv-SE',
      })
    ).toBe('3:e dagen i månaden')
    expect(
      getInstallmentDayDisplayValue(3, {
        dayDisplay: '{day} dag i måneden',
        lastDayLabel: 'Sidste dag i måneden',
        locale: 'da-DK',
      })
    ).toBe('3. dag i måneden')
  })
})
