/**
 * Web NumberFormat utility barrel.
 *
 * The implementation lives in `./utils/`. This file keeps the public API
 * stable for existing consumers. Prefer importing from `./utils` in new code.
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
  BankAccountType,
} from './utils'

export {
  NUMBER_CHARS,
  NUMBER_MINUS,
  formatNumber,
  prepareMinus,
  enhanceSR,
  formatToParts,
  formatDecimals,
  countDecimals,
  roundHalfEven,
  cleanNumber,
  formatPercent,
  formatCurrency,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatBankAccountNumberByType,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
  getFallbackCurrencyDisplay,
  getDecimalSeparator,
  getThousandsSeparator,
  getCurrencySymbol,
  runIOSSelectionFix,
} from './utils'
