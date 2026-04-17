/**
 * Public barrel for number-format utilities.
 *
 * Internal files inside this `utils/` folder must NOT import from this
 * barrel – import the specific sibling file instead to avoid circular
 * initialization issues.
 */

export type {
  NumberFormatType,
  NumberFormatCurrencyPosition,
  NumberFormatReturnValue,
  NumberFormatValue,
  NumberFormatReturnType,
  NumberFormatOptions,
  NumberFormatOptionParams,
  NumberFormatFunction,
} from './types'

export { NUMBER_CHARS, NUMBER_MINUS } from './constants'

export {
  formatNumber,
  alignCurrencySymbol,
  prepareMinus,
  enhanceSR,
  formatToParts,
} from './formatNumber'

export { formatDecimals, countDecimals, roundHalfEven } from './decimals'

export { cleanNumber } from './cleanNumber'

export { formatPlainNumber } from './formatPlainNumber'
export { formatPercent } from './formatPercent'
export { formatCurrency } from './formatCurrency'
export { formatPhoneNumber } from './formatPhoneNumber'
export { formatBankAccountNumber } from './formatBankAccountNumber'
export { formatNationalIdentityNumber } from './formatNationalIdentityNumber'
export { formatOrganizationNumber } from './formatOrganizationNumber'

export { getFallbackCurrencyDisplay } from './currencyDisplay'
export {
  getDecimalSeparator,
  getThousandsSeparator,
  getCurrencySymbol,
} from './separators'

export { runIOSSelectionFix } from './iOS'
