import { createCurrencyParser } from '../parseCurrencyAmounts'

const parse = createCurrencyParser('nb-NO', 'NOK')
const amounts = (text: string) =>
  parse(text).filter((part) => typeof part !== 'string')

describe('currency amounts', () => {
  it('recognizes explicit currencies before and after amounts', () => {
    expect(amounts('NOK 12 400,50 and 200 kr, EUR 19,95.')).toEqual([
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
      )('Pay €19.95, £20 and 100 USD today.')
    ).toEqual([
      'Pay ',
      { value: 19.95, currency: 'EUR', decimals: 2 },
      ', ',
      { value: 20, currency: 'GBP', decimals: 0 },
      ' and ',
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
    expect(parse('NOK 12,50 paid', true)).toEqual([
      { value: 12.5, currency: 'NOK', decimals: 2 },
      ' paid',
    ])
    expect(parse('100 kr', true)).toEqual(['100 kr'])
  })

  it('never formats a partial prefix while streaming', () => {
    const text = 'NOK 12 345,67'
    for (let i = 1; i <= text.length; i++) {
      expect(parse(text.slice(0, i), true)).toEqual([text.slice(0, i)])
    }
  })
})
