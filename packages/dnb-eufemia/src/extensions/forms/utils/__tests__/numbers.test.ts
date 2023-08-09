import { formatNumber, parseFormattedNumber } from '../numbers'

describe('numbers util', () => {
  describe('formatNumber', () => {
    it('should return the full number as a string when no options are given', () => {
      expect(formatNumber(315)).toEqual('315')
      expect(formatNumber(874378347284328)).toEqual('874378347284328')
      expect(formatNumber(12345.67)).toEqual('12345,67')
    })

    it('should format correctly with thousandSeparator', () => {
      expect(formatNumber(5432, { thousandSeparator: ' ' })).toEqual(
        '5 432'
      )
      expect(formatNumber(64976, { thousandSeparator: "'" })).toEqual(
        "64'976"
      )
      expect(formatNumber(836512, { thousandSeparator: '--' })).toEqual(
        '836--512'
      )
      expect(formatNumber(1234567890, { thousandSeparator: '.' })).toEqual(
        '1.234.567.890'
      )
    })

    it('should format correctly with decimalSymbol', () => {
      expect(formatNumber(75, { decimalSymbol: '.' })).toEqual('75')
      expect(formatNumber(32.56, { decimalSymbol: '.' })).toEqual('32.56')
      expect(formatNumber(12345.6789, { decimalSymbol: '?' })).toEqual(
        '12345?6789'
      )
    })

    it('should round correctly with decimals', () => {
      expect(formatNumber(12.34, { decimalLimit: 1 })).toEqual('12,3')
      expect(formatNumber(12.34, { decimalLimit: 2 })).toEqual('12,34')
      expect(formatNumber(12.34, { decimalLimit: 3 })).toEqual('12,34')
      expect(formatNumber(12.34, { decimalLimit: 4 })).toEqual('12,34')
      expect(formatNumber(12.34, { decimalLimit: 5 })).toEqual('12,34')
    })

    it('should round correctly with fixed decimals and add leading zeros', () => {
      expect(formatNumber(87.6543, { fixedDecimals: 1 })).toEqual('87,7')
      expect(formatNumber(87.6543, { fixedDecimals: 2 })).toEqual('87,65')
      expect(formatNumber(87.6543, { fixedDecimals: 3 })).toEqual('87,654')
      expect(formatNumber(87.6543, { fixedDecimals: 4 })).toEqual(
        '87,6543'
      )
      expect(formatNumber(87.6543, { fixedDecimals: 5 })).toEqual(
        '87,65430'
      )
      expect(formatNumber(87.6543, { fixedDecimals: 6 })).toEqual(
        '87,654300'
      )
    })

    it('should recalculate correctly based on magnitude', () => {
      expect(formatNumber(85000, { magnitude: 3 })).toEqual('85')
      expect(formatNumber(16777216, { magnitude: 6 })).toEqual('16,777216')
      expect(formatNumber(1050000, { magnitude: 5 })).toEqual('10,5')
    })

    it('should add prefix', () => {
      expect(formatNumber(25, { prefix: 'Kr ' })).toEqual('Kr 25')
      expect(formatNumber(25, { prefix: '$' })).toEqual('$25')
    })

    it('should add suffix', () => {
      expect(formatNumber(120, { suffix: ' kr' })).toEqual('120 kr')
      expect(formatNumber(120, { suffix: 'kWh' })).toEqual('120kWh')
    })

    it('should format correctly with combinations of options', () => {
      expect(
        formatNumber(42000000.5, {
          magnitude: 6,
          fixedDecimals: 0,
          prefix: 'the answer is ',
        })
      ).toEqual('the answer is 42')
      expect(
        formatNumber(12345678, {
          thousandSeparator: ' ',
          decimalSymbol: 'x',
          decimalLimit: 2,
          magnitude: 3,
        })
      ).toEqual('12 345x68')
      expect(
        formatNumber(120000000, { magnitude: 6, suffix: ' MNOK' })
      ).toEqual('120 MNOK')
    })
  })

  describe('parseFormattedNumber', () => {
    it('should parse default formatted numbers', () => {
      expect(parseFormattedNumber('24')).toEqual(24)
      expect(parseFormattedNumber('42,53')).toEqual(42.53)
      expect(parseFormattedNumber('12345,678')).toEqual(12345.678)
    })

    it('should parse based on thousandSeparator', () => {
      expect(
        parseFormattedNumber('1 234', { thousandSeparator: ' ' })
      ).toEqual(1234)
      expect(
        parseFormattedNumber('12 345', { thousandSeparator: ' ' })
      ).toEqual(12345)
      expect(
        parseFormattedNumber('123 456', { thousandSeparator: ' ' })
      ).toEqual(123456)
      expect(
        parseFormattedNumber("123'456'789'101'112", {
          thousandSeparator: "'",
        })
      ).toEqual(123456789101112)
    })

    it('should parse based on decimalSymbol', () => {
      expect(parseFormattedNumber('99', { decimalSymbol: '.' })).toEqual(
        99
      )
      expect(
        parseFormattedNumber('45.44', { decimalSymbol: '.' })
      ).toEqual(45.44)
      expect(
        parseFormattedNumber('9876x5432', { decimalSymbol: 'x' })
      ).toEqual(9876.5432)
    })

    it('should recalculate correctly based on magnitude', () => {
      expect(parseFormattedNumber('85,3', { magnitude: 3 })).toEqual(85300)
      expect(parseFormattedNumber('123,4', { magnitude: 6 })).toEqual(
        123400000
      )
    })

    it('should parse formatted values with prefix', () => {
      expect(parseFormattedNumber('Kr 200', { prefix: 'Kr ' })).toEqual(
        200
      )
      expect(parseFormattedNumber('€5000', { prefix: '€' })).toEqual(5000)
    })

    it('should parse formatted values with suffix', () => {
      expect(parseFormattedNumber('2500 NOK', { suffix: ' NOK' })).toEqual(
        2500
      )
      expect(parseFormattedNumber('300kg', { suffix: 'kg' })).toEqual(300)
    })

    it('should parse correctly with combinations of options', () => {
      expect(
        parseFormattedNumber('This is a number: 35.8', {
          prefix: 'This is a number: ',
          magnitude: 2,
        })
      ).toEqual(3580)
      expect(
        parseFormattedNumber('1 350.00MRD', {
          suffix: 'MRD',
          decimalSymbol: '.',
          thousandSeparator: ' ',
          magnitude: 1,
        })
      ).toEqual(13500)
    })
  })
})
