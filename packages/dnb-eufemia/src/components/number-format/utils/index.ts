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
  formatNumberCore,
  alignCurrencySymbol,
  prepareMinus,
  enhanceSR,
  formatToParts,
} from './formatNumberCore'

export { formatDecimals, countDecimals, roundHalfEven } from './decimals'

export { cleanNumber } from './cleanNumber'

export { formatNumber } from './formatNumber'
export { formatPercent } from './formatPercent'
export { formatCurrency } from './formatCurrency'
export { formatPhoneNumber } from './formatPhoneNumber'
export {
  formatBankAccountNumber,
  formatBankAccountNumberByType,
} from './formatBankAccountNumber'
export type { BankAccountType } from './formatBankAccountNumber'
export { formatNationalIdentityNumber } from './formatNationalIdentityNumber'
export { formatOrganizationNumber } from './formatOrganizationNumber'

export { getFallbackCurrencyDisplay } from './currencyDisplay'
export {
  getDecimalSeparator,
  getThousandsSeparator,
  getCurrencySymbol,
} from './separators'

export { runIOSSelectionFix } from './iOS'
