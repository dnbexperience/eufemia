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
} from './utils'

export {
  NUMBER_CHARS,
  NUMBER_MINUS,
  formatNumberIntl,
  alignCurrencySymbol,
  prepareMinus,
  enhanceSR,
  formatToParts,
  formatDecimals,
  countDecimals,
  roundHalfEven,
  cleanNumber,
  formatPlainNumber,
  formatNumber,
  formatPercent,
  formatCurrency,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
  getFallbackCurrencyDisplay,
  getDecimalSeparator,
  getThousandsSeparator,
  getCurrencySymbol,
  runIOSSelectionFix,
} from './utils'
