import type { MaskitoOptions } from '@maskito/core'
import type { CreateNumberMaskOptions } from './addons/createNumberMask'
import {
  createNumberFormattingProcessor,
  createCurrencyFormattingProcessor,
  createPercentageFormattingProcessor,
  createGeneralNumberFormattingProcessor,
} from './MaskitoProcessors'

// Convert createNumberMask options to Maskito number options
export class MaskitoNumberConverter {
  static convertNumberMaskOptions(
    options: CreateNumberMaskOptions
  ): MaskitoOptions {
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

    // Create a simple mask that allows digits and decimal separator
    const mask: Array<RegExp | string> = []

    // Add prefix
    if (prefix) {
      mask.push(...prefix.split(''))
    }

    // Add negative sign if allowed
    if (allowNegative) {
      mask.push(/-/)
    }

    // Add digits with thousands separator
    if (includeThousandsSeparator) {
      mask.push(
        /\d/,
        /\d/,
        /\d/,
        thousandsSeparatorSymbol,
        /\d/,
        /\d/,
        /\d/
      )
    } else {
      mask.push(/\d/, /\d/, /\d/, /\d/, /\d/, /\d/)
    }

    // Add decimal part if allowed
    if (allowDecimal) {
      mask.push(decimalSymbol, /\d/, /\d/)
    }

    // Add suffix
    if (suffix) {
      mask.push(...suffix.split(''))
    }

    // Create formatting processor
    const processor = createGeneralNumberFormattingProcessor({
      prefix,
      suffix,
      includeThousandsSeparator,
      thousandsSeparatorSymbol,
      allowDecimal,
      decimalSymbol,
      decimalLimit,
      integerLimit,
      allowNegative,
    })

    return {
      mask,
      postprocessors: [processor],
    }
  }

  // Convert currency mask options
  static convertCurrencyMaskOptions(
    options: CreateNumberMaskOptions & { currency?: string }
  ): MaskitoOptions {
    const {
      prefix = '',
      suffix = '',
      includeThousandsSeparator = true,
      thousandsSeparatorSymbol = ' ',
      allowDecimal = true,
      decimalSymbol = ',',
      decimalLimit = 2,
      integerLimit = false,
      allowNegative = true,
      currency = 'NOK',
    } = options

    // Create currency mask
    const mask: Array<RegExp | string> = []

    // Add prefix
    if (prefix) {
      mask.push(...prefix.split(''))
    }

    // Add negative sign if allowed
    if (allowNegative) {
      mask.push(/-/)
    }

    // Add digits with thousands separator
    if (includeThousandsSeparator) {
      mask.push(
        /\d/,
        /\d/,
        /\d/,
        thousandsSeparatorSymbol,
        /\d/,
        /\d/,
        /\d/
      )
    } else {
      mask.push(/\d/, /\d/, /\d/, /\d/, /\d/, /\d/)
    }

    // Add decimal part
    mask.push(decimalSymbol, /\d/, /\d/)

    // Add suffix
    if (suffix) {
      mask.push(...suffix.split(''))
    }

    // Create currency formatting processor
    const processor = createCurrencyFormattingProcessor({
      prefix,
      suffix,
      includeThousandsSeparator,
      thousandsSeparatorSymbol,
      allowDecimal,
      decimalSymbol,
      decimalLimit,
      integerLimit,
      allowNegative,
      currency,
    })

    return {
      mask,
      postprocessors: [processor],
    }
  }

  // Convert percentage mask options
  static convertPercentMaskOptions(
    options: CreateNumberMaskOptions
  ): MaskitoOptions {
    const {
      prefix = '',
      suffix = '%',
      includeThousandsSeparator = true,
      thousandsSeparatorSymbol = ' ',
      allowDecimal = true,
      decimalSymbol = ',',
      decimalLimit = 2,
      integerLimit = false,
      allowNegative = false, // Percentages are usually positive
    } = options

    // Create percentage mask
    const mask: Array<RegExp | string> = []

    // Add prefix
    if (prefix) {
      mask.push(...prefix.split(''))
    }

    // Add digits with thousands separator
    if (includeThousandsSeparator) {
      mask.push(
        /\d/,
        /\d/,
        /\d/,
        thousandsSeparatorSymbol,
        /\d/,
        /\d/,
        /\d/
      )
    } else {
      mask.push(/\d/, /\d/, /\d/, /\d/, /\d/, /\d/)
    }

    // Add decimal part
    mask.push(decimalSymbol, /\d/, /\d/)

    // Add suffix
    if (suffix) {
      mask.push(...suffix.split(''))
    }

    // Create percentage formatting processor
    const processor = createPercentageFormattingProcessor({
      prefix,
      suffix,
      includeThousandsSeparator,
      thousandsSeparatorSymbol,
      allowDecimal,
      decimalSymbol,
      decimalLimit,
      integerLimit,
      allowNegative,
    })

    return {
      mask,
      postprocessors: [processor],
    }
  }
}
