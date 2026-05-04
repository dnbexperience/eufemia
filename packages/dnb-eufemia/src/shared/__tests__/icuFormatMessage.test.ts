import { icu } from '../icuFormatMessage'

const { isICU, format } = icu

describe('isICU', () => {
  it('should detect plural syntax', () => {
    expect(isICU('{count, plural, one {# item} other {# items}}')).toBe(
      true
    )
  })

  it('should detect select syntax', () => {
    expect(
      isICU('{gender, select, male {He} female {She} other {They}}')
    ).toBe(true)
  })

  it('should detect selectordinal syntax', () => {
    expect(
      isICU(
        '{pos, selectordinal, one {#st} two {#nd} few {#rd} other {#th}}'
      )
    ).toBe(true)
  })

  it('should detect number formatting', () => {
    expect(isICU('Price: {amount, number}')).toBe(true)
  })

  it('should detect date formatting', () => {
    expect(isICU('Created: {date, date, medium}')).toBe(true)
  })

  it('should detect time formatting', () => {
    expect(isICU('At: {time, time, short}')).toBe(true)
  })

  it('should return false for simple placeholders', () => {
    expect(isICU('Hello {name}')).toBe(false)
  })

  it('should return false for plain text', () => {
    expect(isICU('Hello world')).toBe(false)
  })

  it('should return false for empty string', () => {
    expect(isICU('')).toBe(false)
  })
})

describe('format', () => {
  describe('simple placeholder', () => {
    it('should replace a simple placeholder', () => {
      expect(format('Hello {name}', { name: 'World' }, 'en-GB')).toBe(
        'Hello World'
      )
    })

    it('should replace multiple placeholders', () => {
      expect(
        format(
          '{greeting} {name}!',
          { greeting: 'Hi', name: 'Alice' },
          'en-GB'
        )
      ).toBe('Hi Alice!')
    })
  })

  describe('plural', () => {
    it('should handle one and other', () => {
      const message =
        'You have {count, plural, one {# item} other {# items}}.'

      expect(format(message, { count: 1 }, 'en-GB')).toBe(
        'You have 1 item.'
      )

      expect(format(message, { count: 5 }, 'en-GB')).toBe(
        'You have 5 items.'
      )
    })

    it('should handle =0 exact match', () => {
      const message =
        '{count, plural, =0 {No items} one {# item} other {# items}}'

      expect(format(message, { count: 0 }, 'en-GB')).toBe('No items')

      expect(format(message, { count: 1 }, 'en-GB')).toBe('1 item')

      expect(format(message, { count: 42 }, 'en-GB')).toBe('42 items')
    })

    it('should handle =1 exact match', () => {
      const message = '{count, plural, =1 {Exactly one} other {Many: #}}'

      expect(format(message, { count: 1 }, 'en-GB')).toBe('Exactly one')

      expect(format(message, { count: 3 }, 'en-GB')).toBe('Many: 3')
    })

    it('should format # as locale-aware number', () => {
      const message = '{count, plural, other {# items}}'

      expect(format(message, { count: 1000 }, 'en-GB')).toBe('1,000 items')

      expect(format(message, { count: 1000 }, 'nb-NO')).toMatch(
        /1[\s\u00a0]000 items/
      )
    })
  })

  describe('select', () => {
    it('should select based on string value', () => {
      const message =
        '{gender, select, male {He} female {She} other {They}} liked this.'

      expect(format(message, { gender: 'male' }, 'en-GB')).toBe(
        'He liked this.'
      )

      expect(format(message, { gender: 'female' }, 'en-GB')).toBe(
        'She liked this.'
      )

      expect(format(message, { gender: 'other' }, 'en-GB')).toBe(
        'They liked this.'
      )
    })

    it('should fall back to other for unknown values', () => {
      const message =
        '{category, select, a {Alpha} b {Beta} other {Unknown}}'

      expect(format(message, { category: 'c' }, 'en-GB')).toBe('Unknown')
    })
  })

  describe('selectordinal', () => {
    it('should format ordinal numbers in English', () => {
      const message =
        '{pos, selectordinal, one {#st} two {#nd} few {#rd} other {#th}} place'

      expect(format(message, { pos: 1 }, 'en-GB')).toBe('1st place')

      expect(format(message, { pos: 2 }, 'en-GB')).toBe('2nd place')

      expect(format(message, { pos: 3 }, 'en-GB')).toBe('3rd place')

      expect(format(message, { pos: 4 }, 'en-GB')).toBe('4th place')

      expect(format(message, { pos: 11 }, 'en-GB')).toBe('11th place')

      expect(format(message, { pos: 21 }, 'en-GB')).toBe('21st place')
    })
  })

  describe('number formatting', () => {
    it('should format numbers with locale', () => {
      const message = 'Total: {amount, number}'

      expect(format(message, { amount: 1234.5 }, 'en-GB')).toBe(
        'Total: 1,234.5'
      )
    })

    it('should format numbers with Norwegian locale', () => {
      const message = 'Total: {amount, number}'

      const result = format(message, { amount: 1234.5 }, 'nb-NO')
      expect(result).toMatch(/Total: 1[\s\u00a0]234,5/)
    })

    it('should format percent', () => {
      const message = '{pct, number, ::percent}'

      const result = format(message, { pct: 0.25 }, 'en-GB')
      expect(result).toContain('25')
      expect(result).toContain('%')
    })

    it('should format currency with skeleton', () => {
      const message = 'Balance: {amount, number, ::currency/NOK}'

      const result = format(message, { amount: 1234.5 }, 'nb-NO')
      expect(result).toContain('kr')
      expect(result).toMatch(/1[\s\u00a0]234/)
    })

    it('should format currency for different locales', () => {
      const message = 'Price: {amount, number, ::currency/EUR}'

      const enResult = format(message, { amount: 42 }, 'en-GB')
      expect(enResult).toContain('€')
      expect(enResult).toContain('42')

      const nbResult = format(message, { amount: 42 }, 'nb-NO')
      expect(nbResult).toContain('€')
      expect(nbResult).toContain('42')
    })

    it('should format compact numbers', () => {
      const message = '{amount, number, ::compact-short}'

      const result = format(message, { amount: 1500 }, 'en-GB')
      expect(result).toMatch(/1\.?5K/i)
    })
  })

  describe('date formatting', () => {
    it('should format dates with locale', () => {
      const message = 'Created: {date, date}'
      const date = new Date(2025, 0, 15)

      const result = format(message, { date }, 'en-GB')
      expect(result).toContain('2025')
      expect(result).toContain('15')
    })

    it('should format date with short style', () => {
      const message = '{d, date, short}'
      const d = new Date(2025, 0, 15)

      const result = format(message, { d }, 'en-GB')
      expect(result).toContain('15')
      expect(result).toContain('01') // short month as number
    })

    it('should format date with medium style', () => {
      const message = '{d, date, medium}'
      const d = new Date(2025, 0, 15)

      const result = format(message, { d }, 'en-GB')
      expect(result).toContain('Jan')
      expect(result).toContain('2025')
    })

    it('should format date with long style', () => {
      const message = '{d, date, long}'
      const d = new Date(2025, 0, 15)

      const result = format(message, { d }, 'en-GB')
      expect(result).toContain('January')
      expect(result).toContain('2025')
    })

    it('should format date with full style', () => {
      const message = '{d, date, full}'
      const d = new Date(2025, 0, 15) // Wednesday

      const result = format(message, { d }, 'en-GB')
      expect(result).toContain('Wednesday')
      expect(result).toContain('January')
      expect(result).toContain('2025')
    })

    it('should format date with Norwegian locale', () => {
      const message = '{d, date, long}'
      const d = new Date(2025, 0, 15)

      const result = format(message, { d }, 'nb-NO')
      expect(result).toContain('januar')
      expect(result).toContain('2025')
    })
  })

  describe('time formatting', () => {
    it('should format time with short style', () => {
      const message = 'At: {t, time, short}'
      const t = new Date(2025, 0, 15, 14, 30, 0)

      const result = format(message, { t }, 'en-GB')
      expect(result).toContain('14')
      expect(result).toContain('30')
    })

    it('should format time with medium style', () => {
      const message = '{t, time, medium}'
      const t = new Date(2025, 0, 15, 14, 30, 45)

      const result = format(message, { t }, 'en-GB')
      expect(result).toContain('14')
      expect(result).toContain('30')
      expect(result).toContain('45')
    })

    it('should format time with Norwegian locale', () => {
      const message = '{t, time, short}'
      const t = new Date(2025, 0, 15, 14, 30, 0)

      const result = format(message, { t }, 'nb-NO')
      expect(result).toContain('14')
      expect(result).toContain('30')
    })
  })

  describe('nested messages', () => {
    it('should handle select wrapping plural', () => {
      const message =
        '{gender, select, male {He has {count, plural, one {# cat} other {# cats}}} female {She has {count, plural, one {# cat} other {# cats}}} other {They have {count, plural, one {# cat} other {# cats}}}}'

      expect(format(message, { gender: 'male', count: 1 }, 'en-GB')).toBe(
        'He has 1 cat'
      )

      expect(
        format(message, { gender: 'female', count: 3 }, 'en-GB')
      ).toBe('She has 3 cats')

      expect(format(message, { gender: 'other', count: 0 }, 'en-GB')).toBe(
        'They have 0 cats'
      )
    })
  })

  describe('locale-specific plural rules', () => {
    it('should apply English plural rules (one vs other)', () => {
      const message = '{count, plural, one {# item} other {# items}}'

      expect(format(message, { count: 1 }, 'en-GB')).toBe('1 item')

      expect(format(message, { count: 2 }, 'en-GB')).toBe('2 items')
    })

    it('should apply Norwegian plural rules (one vs other)', () => {
      const message =
        '{count, plural, one {# element} other {# elementer}}'

      expect(format(message, { count: 1 }, 'nb-NO')).toBe('1 element')

      expect(format(message, { count: 2 }, 'nb-NO')).toBe('2 elementer')
    })
  })

  describe('edge cases', () => {
    it('should handle message with no values needed', () => {
      expect(format('Hello world', {}, 'en-GB')).toBe('Hello world')
    })

    it('should handle escaped braces (apostrophe quoting)', () => {
      const message = "This '{isn''t}' a placeholder"

      expect(format(message, {}, 'en-GB')).toBe(
        "This {isn't} a placeholder"
      )
    })

    it('should cache formatter instances', () => {
      const message = '{count, plural, one {# item} other {# items}}'

      const result1 = format(message, { count: 1 }, 'en-GB')
      const result2 = format(message, { count: 2 }, 'en-GB')

      expect(result1).toBe('1 item')
      expect(result2).toBe('2 items')
    })
  })
})
