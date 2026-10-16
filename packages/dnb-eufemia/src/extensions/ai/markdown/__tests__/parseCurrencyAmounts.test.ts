import { createCurrencyParser } from '../parseCurrencyAmounts'

const parse = createCurrencyParser('nb-NO', 'NOK')
const amounts = (text: string) =>
  parse(text).filter((part) => typeof part !== 'string')

describe('currency amounts', () => {
  it.each([
    0x20, 0xa0, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005,
    0x2006, 0x2007, 0x2008, 0x2009, 0x200a, 0x202f, 0x205f, 0x3000,
  ])('keeps the whole amount with Unicode grouping space %s', (code) => {
    const space = String.fromCharCode(code)
    for (const text of [
      'Pris 1' + space + '234 kr i dag.',
      'Pris kr 1' + space + '234.',
    ]) {
      expect(amounts(text)).toEqual([
        { value: 1234, currency: 'NOK', decimals: 0 },
      ])
    }
    expect(parse('NOK 12' + space + '34')).toEqual([
      'NOK 12' + space + '34',
    ])
    const prefixWithProse = 'Pris kr 1' + space + '234 i dag.'
    expect(parse(prefixWithProse)).toEqual([prefixWithProse])
  })

  it.each([
    'mill.',
    'million',
    'millioner',
    'millions',
    'miljoner',
    'milliarder',
    'milliard',
    'mrd.',
    'mia.',
    'billion',
    'billioner',
    'bn',
    'trillion',
    'thousand',
    'tusen',
    'tusind',
    'k',
    'm',
  ])('leaves scaled amounts with %s unchanged', (scale) => {
    for (const text of [
      'NOK 1,5 ' + scale,
      '1,5 ' + scale + ' kr',
      'NOK 1,5 ' + scale + ' i dag.',
    ]) {
      expect(parse(text)).toEqual([text])
    }
  })

  it.each([
    'EUR 1,5 Millionen',
    'EUR 1,5 millones',
    'EUR 1,5 milhões',
    'NOK 150 betales nå.',
    'NOK 150 minimum.',
    'NOK 150 \u0301million',
    'NOK 150 百万',
    'NOK 150 \u{10400}',
  ])('preserves prefix amounts followed by words in %s', (text) => {
    expect(parse(text)).toEqual([text])
  })

  it('recognizes suffix amounts followed by normal prose', () => {
    expect(amounts('150 kr betales nå.')).toEqual([
      { value: 150, currency: 'NOK', decimals: 0 },
    ])
  })

  it('recognizes explicit currencies before and after amounts', () => {
    expect(amounts('NOK 12 400,50; 200 kr, EUR 19,95.')).toEqual([
      { value: 12400.5, currency: 'NOK', decimals: 2 },
      { value: 200, currency: 'NOK', decimals: 0 },
      { value: 19.95, currency: 'EUR', decimals: 2 },
    ])
  })

  it('uses the source locale for separators', () => {
    expect(createCurrencyParser('en-GB', 'NOK')('USD 1,234.50')).toEqual([
      { value: 1234.5, currency: 'USD', decimals: 2 },
    ])
    expect(amounts('NOK 1.234,50')).toEqual([
      { value: 1234.5, currency: 'NOK', decimals: 2 },
    ])
  })

  it('supports Unicode grouping spaces and negative values', () => {
    expect(amounts('−1 234,50 kr; -2 000 NOK')).toEqual([
      { value: -1234.5, currency: 'NOK', decimals: 2 },
      { value: -2000, currency: 'NOK', decimals: 0 },
    ])
  })

  it('leaves ambiguous, malformed and unsafe-precision values unchanged', () => {
    for (const text of [
      '100',
      '$100',
      '100 dollars',
      '100 krone',
      'NOK 12 34',
      'NOK 1,234',
      'NOK 1.23.456',
      'idNOK 100',
      'NOK 9007199254740993',
      'NOK 10/20',
    ]) {
      expect(parse(text)).toEqual([text])
    }
  })

  it('does not assume which currency kr means outside Nordic currencies', () => {
    expect(createCurrencyParser('en-GB', 'USD')('100 kr')).toEqual([
      '100 kr',
    ])
    expect(createCurrencyParser('sv-SE', 'SEK')('100 kr')).toEqual([
      { value: 100, currency: 'SEK', decimals: 0 },
    ])
  })

  it('keeps currency symbols explicit and preserves surrounding text', () => {
    expect(
      createCurrencyParser(
        'en-GB',
        'NOK'
      )('Pay €19.95, £20; 100 USD today.')
    ).toEqual([
      'Pay ',
      { value: 19.95, currency: 'EUR', decimals: 2 },
      ', ',
      { value: 20, currency: 'GBP', decimals: 0 },
      '; ',
      { value: 100, currency: 'USD', decimals: 0 },
      ' today.',
    ])
  })

  it('does not merge currencies, units or identifiers', () => {
    for (const text of [
      'USD 10e3',
      'USD 10.5.7',
      'USD 1,00',
      'USD +10',
      'USD 90071992547409.91',
      'ØNOK 100',
      '100 USD/month',
      "CHF 1'000",
      'CHF 1’000',
      '1’000 CHF',
      "1'000 CHF",
      '10–20 NOK',
      'NOK 100%',
      '$100 NOK',
      'NOK 100 USD',
      '<span title="NOK 100">data</span>',
    ]) {
      expect(createCurrencyParser('en-GB', 'NOK')(text)).toEqual([text])
    }
    expect(amounts('100 NOK 200')).toHaveLength(1)
  })

  it('preserves an invalid source locale without throwing', () => {
    expect(
      createCurrencyParser('invalid_locale', 'NOK')('NOK 100')
    ).toEqual(['NOK 100'])
  })

  it('handles large malformed input without partial numeric matches', () => {
    const text = 'NOK ' + '1,2 '.repeat(10000)
    expect(parse(text)).toEqual([text])
  })

  it('waits for a boundary when an amount is still streaming', () => {
    expect(parse('NOK 12', true)).toEqual(['NOK 12'])
    expect(parse('NOK 12,', true)).toEqual(['NOK 12,'])
    expect(parse('NOK 12,50. Paid', true)).toEqual([
      { value: 12.5, currency: 'NOK', decimals: 2 },
      '. Paid',
    ])
    expect(parse('100 kr', true)).toEqual(['100 kr'])
  })

  it('never formats a partial prefix while streaming', () => {
    const text = 'NOK 12 345,67'
    for (let i = 1; i <= text.length; i++) {
      expect(parse(text.slice(0, i), true)).toEqual([text.slice(0, i)])
    }
  })

  it('never formats a partially streamed scale word', () => {
    for (const text of [
      'NOK 1,5 milliarder',
      'NOK 4,5 billion',
      'EUR 1,5 Millionen',
      'EUR 1,5 millones',
      'NOK 150 betales nå.',
    ]) {
      for (let i = 1; i <= text.length; i++) {
        expect(parse(text.slice(0, i), true)).toEqual([text.slice(0, i)])
      }
    }
  })

  it('does not reject other amounts when a prefix is followed by a word', () => {
    expect(
      amounts('EUR 1,5 millones; 200 kr betales nå. NOK 100.')
    ).toEqual([
      { value: 200, currency: 'NOK', decimals: 0 },
      { value: 100, currency: 'NOK', decimals: 0 },
    ])
  })
})
