import type { MaskitoPostprocessor } from '@maskito/core'

// Define ElementState locally since it's not exported
interface ElementState {
  readonly value: string
  readonly selection: readonly [from: number, to: number]
}

export interface NumberFormattingOptions {
  prefix?: string
  suffix?: string
  includeThousandsSeparator?: boolean
  thousandsSeparatorSymbol?: string
  allowDecimal?: boolean
  decimalSymbol?: string
  decimalLimit?: number
  integerLimit?: number | false
  allowNegative?: boolean
}

// Add thousands separator to a number string
function addThousandsSeparator(
  n: string,
  thousandsSeparatorSymbol: string
): string {
  return n.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparatorSymbol)
}

// Remove non-digit characters except decimal separator and minus
function cleanNumber(value: string, decimalSymbol: string): string {
  const isNegative = value.startsWith('-')
  // Keep digits, decimal symbol, and minus sign
  const cleaned = value.replace(
    new RegExp(
      `[^\\d${decimalSymbol.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}]`,
      'g'
    ),
    ''
  )
  return isNegative ? '-' + cleaned : cleaned
}

// Format a number value according to the options
function formatNumberValue(
  value: string,
  options: NumberFormattingOptions
): string {
  const {
    prefix = '',
    suffix = '',
    includeThousandsSeparator = true,
    thousandsSeparatorSymbol = ' ',
    allowDecimal = false,
    decimalSymbol = ',',
    decimalLimit = 2,
    integerLimit = false,
    allowNegative = true,
  } = options

  // Handle empty value
  if (!value || value === '') {
    return prefix + suffix
  }

  // Clean the value
  let cleanedValue = cleanNumber(value, decimalSymbol)

  // Handle negative values
  const isNegative = cleanedValue.startsWith('-')
  if (isNegative) {
    cleanedValue = cleanedValue.substring(1)
  }

  // Split into integer and decimal parts
  const decimalIndex = cleanedValue.lastIndexOf(decimalSymbol)
  let integerPart = ''
  let decimalPart = ''

  if (decimalIndex !== -1 && allowDecimal) {
    integerPart = cleanedValue.substring(0, decimalIndex)
    decimalPart = cleanedValue.substring(decimalIndex + 1)

    // Limit decimal places
    if (decimalLimit > 0) {
      decimalPart = decimalPart.substring(0, decimalLimit)
    }
  } else {
    integerPart = cleanedValue
  }

  // Apply integer limit
  if (typeof integerLimit === 'number') {
    integerPart = integerPart.substring(0, integerLimit)
  }

  // Add thousands separator to integer part
  if (includeThousandsSeparator && integerPart.length > 0) {
    integerPart = addThousandsSeparator(
      integerPart,
      thousandsSeparatorSymbol
    )
  }

  // Build the formatted value
  let formattedValue = ''

  // Add prefix
  if (prefix) {
    formattedValue += prefix
  }

  // Add negative sign
  if (isNegative && allowNegative) {
    formattedValue += '-'
  }

  // Add integer part
  formattedValue += integerPart

  // Add decimal part
  if (decimalPart && allowDecimal) {
    formattedValue += decimalSymbol + decimalPart
  }

  // Add suffix
  if (suffix) {
    formattedValue += suffix
  }

  return formattedValue
}

// Create a number formatting postprocessor
export function createNumberFormattingProcessor(
  options: NumberFormattingOptions
): MaskitoPostprocessor {
  return (
    elementState: ElementState,
    initialElementState: ElementState
  ) => {
    const formattedValue = formatNumberValue(elementState.value, options)

    return {
      ...elementState,
      value: formattedValue,
    }
  }
}

// Create a currency formatting postprocessor
export function createCurrencyFormattingProcessor(
  options: NumberFormattingOptions & { currency?: string }
): MaskitoPostprocessor {
  const {
    currency = 'NOK',
    prefix = '',
    suffix = '',
    ...numberOptions
  } = options

  // Determine prefix/suffix based on currency
  let finalPrefix = prefix
  let finalSuffix = suffix

  if (currency === 'NOK' && !prefix && !suffix) {
    finalPrefix = 'NOK '
    finalSuffix = ' kr'
  } else if (currency === 'USD' && !prefix && !suffix) {
    finalPrefix = '$'
  } else if (currency === 'EUR' && !prefix && !suffix) {
    finalSuffix = ' €'
  }

  return createNumberFormattingProcessor({
    ...numberOptions,
    prefix: finalPrefix,
    suffix: finalSuffix,
    allowDecimal: true, // Currency typically allows decimals
  })
}

// Create a percentage formatting postprocessor
export function createPercentageFormattingProcessor(
  options: NumberFormattingOptions
): MaskitoPostprocessor {
  return createNumberFormattingProcessor({
    ...options,
    suffix: '%',
    allowDecimal: true, // Percentages typically allow decimals
    allowNegative: false, // Percentages are usually positive
  })
}

// Create a general number formatting postprocessor
export function createGeneralNumberFormattingProcessor(
  options: NumberFormattingOptions
): MaskitoPostprocessor {
  return createNumberFormattingProcessor({
    ...options,
    allowDecimal: options.allowDecimal ?? true,
  })
}
