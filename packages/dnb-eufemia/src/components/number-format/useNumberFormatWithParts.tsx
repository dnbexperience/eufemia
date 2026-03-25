import useNumberFormat from './useNumberFormat'
import type {
  NumberFormatOptionParams,
  NumberFormatValue,
  NumberFormatReturnValue,
} from './NumberUtils'

type UseNumberFormatWithPartsOptions = Omit<
  NumberFormatOptionParams,
  'currencyPosition'
> & {
  currencyPosition?: NumberFormatOptionParams['currencyPosition'] | 'auto'
  forceCurrencyAfterAmount?: boolean
}

export type NumberFormatParts = {
  sign: string | null
  signedNumber: string
  number: string
  currency: string | null
  currencyPosition: 'before' | 'after' | null
  spaceAfterCurrency: boolean
  spaceBeforeCurrency: boolean
  percent: string | null
  percentSpacing: string
}

function useNumberFormatWithParts(
  value: NumberFormatValue,
  options: UseNumberFormatWithPartsOptions = {}
) {
  const normalizedOptions: UseNumberFormatWithPartsOptions = {
    returnAria: true,
    ...options,
  }

  if (!Object.hasOwn(options, 'currency')) {
    normalizedOptions.currency = false
  }

  const formatOptions: NumberFormatOptionParams = {
    ...normalizedOptions,
    currencyPosition:
      normalizedOptions.currencyPosition === 'auto'
        ? null
        : normalizedOptions.currencyPosition,
  }

  const amountOnly = useNumberFormat(value, {
    ...formatOptions,
    omitCurrencySign: true,
    returnAria: true,
  })

  const result = useNumberFormat(value, formatOptions)

  if (
    !normalizedOptions.returnAria ||
    typeof result !== 'object' ||
    result === null
  ) {
    return result
  }

  const formatted = result as NumberFormatReturnValue

  if (formatted.type !== 'currency') {
    return {
      ...formatted,
      parts: getFallbackParts(formatted.number),
    } as NumberFormatReturnWithParts
  }

  if (typeof amountOnly !== 'object' || amountOnly === null) {
    return {
      ...formatted,
      parts: getFallbackParts(formatted.number),
    } as NumberFormatReturnWithParts
  }

  const unsignedAmount = amountOnly as NumberFormatReturnValue
  const splitAmount = splitLeadingSign(unsignedAmount.number)
  const splitFull = splitLeadingSign(formatted.number)
  const amountWithoutSign = splitAmount.value
  const fullWithoutSign = splitFull.value
  const amountPosition = fullWithoutSign.indexOf(amountWithoutSign)

  if (amountPosition < 0) {
    return {
      ...formatted,
      parts: {
        sign: splitAmount.sign,
        signedNumber: unsignedAmount.number,
        number: splitAmount.value,
        currency: null,
        currencyPosition: null,
        spaceAfterCurrency: false,
        spaceBeforeCurrency: false,
        percent: null,
        percentSpacing: '',
      },
    } as NumberFormatReturnWithParts
  }

  const beforeAmount = fullWithoutSign.slice(0, amountPosition).trim()
  const afterAmount = fullWithoutSign
    .slice(amountPosition + amountWithoutSign.length)
    .trim()
  const hasCurrencyBefore = beforeAmount.length > 0
  const currency = hasCurrencyBefore ? beforeAmount : afterAmount
  const hasCurrency = Boolean(currency)
  const usedCurrencyPosition = normalizedOptions.currencyPosition ?? 'auto'
  let renderCurrencyBefore = hasCurrencyBefore

  if (
    normalizedOptions.signDisplay === 'always' &&
    usedCurrencyPosition === 'auto'
  ) {
    renderCurrencyBefore = false
  }

  if (
    normalizedOptions.forceCurrencyAfterAmount &&
    usedCurrencyPosition === 'auto'
  ) {
    renderCurrencyBefore = false
  }

  const shouldOmitCurrencySpace =
    normalizedOptions.signDisplay === 'always' &&
    usedCurrencyPosition === 'auto'
  const spaceAfterCurrency =
    renderCurrencyBefore && hasCurrency && !shouldOmitCurrencySpace
  const spaceBeforeCurrency =
    !renderCurrencyBefore && hasCurrency && !shouldOmitCurrencySpace

  return {
    ...formatted,
    parts: {
      sign: splitAmount.sign,
      signedNumber: unsignedAmount.number,
      number: splitAmount.value,
      currency: currency || null,
      currencyPosition: hasCurrency
        ? renderCurrencyBefore
          ? 'before'
          : 'after'
        : null,
      spaceAfterCurrency,
      spaceBeforeCurrency,
      percent: null,
      percentSpacing: '',
    },
  } as NumberFormatReturnWithParts
}

type NumberFormatReturnWithParts = NumberFormatReturnValue & {
  parts: NumberFormatParts
}

function getFallbackParts(number: string): NumberFormatParts {
  const splitNumber = splitLeadingSign(number)
  const splitPercent = splitTrailingPercent(splitNumber.value)
  const hasPercent = Boolean(splitPercent)
  const valueWithoutPercent = hasPercent
    ? splitPercent.number
    : splitNumber.value

  return {
    sign: splitNumber.sign,
    signedNumber: `${splitNumber.sign ?? ''}${valueWithoutPercent}`,
    number: valueWithoutPercent,
    currency: null,
    currencyPosition: null,
    spaceAfterCurrency: false,
    spaceBeforeCurrency: false,
    percent: hasPercent ? splitPercent.percent : null,
    percentSpacing: hasPercent ? splitPercent.spacing : '',
  }
}

function splitTrailingPercent(value: string) {
  const match = String(value || '').match(/^(.*?)([\u00a0\s]*[%٪])$/)

  if (!match) {
    return null
  }

  const before = match[1]
  const suffix = match[2]
  const percent = suffix.trim()

  return {
    number: before,
    percent,
    spacing: suffix.slice(0, -percent.length),
  }
}

function splitLeadingSign(value: string) {
  const normalizedValue = String(value || '').replace(
    /^[\u200e\u200f\u061c\s]+/,
    ''
  )
  const match = normalizedValue.match(/^([+\-−])\s?(.*)$/)

  if (!match) {
    return {
      sign: null,
      value: normalizedValue,
    }
  }

  return {
    sign: match[1],
    value: match[2],
  }
}

export default useNumberFormatWithParts
