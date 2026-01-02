// The original can be found here: https://github.com/text-mask/text-mask/tree/master/addons
// No license was given at the point of writing

const emptyString = ''
const minus = '-'
const minusRegExp = /-/
const nonDigitsRegExp = /\D+/g
const number = 'number'
const caretTrap = '[]'
const digitRegExp = /\d/

function convertToMask(strNumber: string): Array<string | RegExp> {
  return strNumber.split(emptyString).map((ch): string | RegExp => {
    return digitRegExp.test(ch) ? digitRegExp : ch
  })
}

export type CreateNumberMaskOptions = {
  prefix?: string
  suffix?: string
  includeThousandsSeparator?: boolean
  thousandsSeparatorSymbol?: string
  allowDecimal?: boolean
  decimalSymbol?: string
  decimalLimit?: number
  integerLimit?: number | false
  requireDecimal?: boolean
  allowNegative?: boolean
}

export type NumberMaskFunction = ((
  rawValue?: string
) => Array<string | RegExp>) & {
  instanceOf?: string
  maskParams?: Record<string, unknown>
}

export default function createNumberMask({
  prefix = emptyString,
  suffix = emptyString,
  includeThousandsSeparator = true,
  thousandsSeparatorSymbol = ' ',
  allowDecimal = false,
  decimalSymbol = ',',
  decimalLimit = 2,
  integerLimit = false,
  requireDecimal = false,
  allowNegative = true,
}: CreateNumberMaskOptions = {}): NumberMaskFunction {
  // http://stackoverflow.com/a/10899795/604296
  function addThousandsSeparator(
    n: string,
    thousandsSeparatorSymbol: string
  ) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol) // eslint-disable-line
  }

  const prefixLength = (prefix && prefix.length) || 0
  const suffixLength = (suffix && suffix.length) || 0

  const numberMask: NumberMaskFunction = function (
    rawValue: string = emptyString
  ) {
    const rawValueLength = rawValue.length

    if (
      rawValue === emptyString ||
      (rawValue[0] === prefix[0] && rawValueLength === 1)
    ) {
      return (prefix.split(emptyString) as Array<string | RegExp>)
        .concat([digitRegExp])
        .concat(suffix.split(emptyString) as Array<string | RegExp>)
    } else if (rawValue === decimalSymbol && allowDecimal) {
      return (prefix.split(emptyString) as Array<string | RegExp>)
        .concat(['0', decimalSymbol, digitRegExp])
        .concat(suffix.split(emptyString) as Array<string | RegExp>)
    }

    const isNegative = rawValue[0] === minus && allowNegative
    // If negative remove "-" sign
    if (isNegative) {
      rawValue = rawValue.toString().substring(1)
    }

    const indexOfLastDecimal = rawValue.lastIndexOf(decimalSymbol)
    const hasDecimal = indexOfLastDecimal !== -1

    let integer
    let fraction
    let mask

    // remove the suffix
    if (rawValue.slice(suffixLength * -1) === suffix) {
      rawValue = rawValue.slice(0, suffixLength * -1)
    }

    if (hasDecimal && (allowDecimal || requireDecimal)) {
      integer = rawValue.slice(
        rawValue.slice(0, prefixLength) === prefix ? prefixLength : 0,
        indexOfLastDecimal
      )

      fraction = rawValue.slice(indexOfLastDecimal + 1, rawValueLength)
      fraction = convertToMask(
        fraction.replace(nonDigitsRegExp, emptyString)
      )
    } else {
      if (rawValue.slice(0, prefixLength) === prefix) {
        integer = rawValue.slice(prefixLength)
      } else {
        integer = rawValue
      }
    }

    integer = integer.replace(nonDigitsRegExp, emptyString)

    if (typeof integerLimit === number) {
      integer = integer.slice(0, integerLimit)
    }

    integer = includeThousandsSeparator
      ? addThousandsSeparator(integer, thousandsSeparatorSymbol)
      : integer

    mask = convertToMask(integer)

    if ((hasDecimal && allowDecimal) || requireDecimal === true) {
      if (rawValue[indexOfLastDecimal - 1] !== decimalSymbol) {
        mask.push(caretTrap)
      }

      mask.push(decimalSymbol, caretTrap)

      if (fraction) {
        if (typeof decimalLimit === number) {
          fraction = fraction.slice(0, decimalLimit)
        }

        mask = mask.concat(fraction)
      }

      if (
        requireDecimal === true &&
        rawValue[indexOfLastDecimal - 1] === decimalSymbol
      ) {
        mask.push(digitRegExp)
      }
    }

    if (prefixLength > 0) {
      mask = prefix.split(emptyString).concat(mask)
    }

    if (isNegative) {
      // If user is entering a negative number, add a mask placeholder spot to attract the caret to it.
      if (mask.length === prefixLength) {
        mask.push(digitRegExp)
      }

      mask = [minusRegExp].concat(mask)
    }

    if (suffix.length > 0) {
      mask = mask.concat(suffix.split(emptyString))
    }

    return mask
  } as NumberMaskFunction

  numberMask.instanceOf = 'createNumberMask'

  return numberMask
}
