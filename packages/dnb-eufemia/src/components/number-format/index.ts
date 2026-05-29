/**
 * Component Entry
 *
 * `NumberFormat` is exposed as a namespace of sub-components.
 */

export { default } from './NumberFormat'

// Re-export the Hooks
export { default as useNumberFormat } from './useNumberFormat'
export { default as useNumberFormatWithParts } from './useNumberFormatWithParts'

// Re-export the public TypeScript types
export type {
  NumberFormatProps,
  NumberFormatAllProps,
  NumberFormatValue,
  NumberFormatPrefix,
  NumberFormatSuffix,
  NumberFormatCurrency,
  NumberFormatCurrencyPosition,
  NumberFormatCompact,
  NumberFormatLink,
  NumberFormatSignDisplay,
  NumberFormatDecimals,
  NumberFormatElement,
  NumberFormatTooltip,
  NumberFormatChildren,
} from './NumberFormatBase'
export type { NumberFormatOptions } from './NumberUtils'
export type {
  NumberFormatReturnValue,
  NumberFormatOptionParams,
  NumberFormatReturnType,
  NumberFormatType,
} from './utils'
export type { NumberFormatter } from './useNumberFormat'
export type {
  NumberFormatParts,
  NumberFormatReturnWithParts,
} from './useNumberFormatWithParts'

export { COPY_TOOLTIP_TIMEOUT } from './NumberFormatBase'

// Re-export the variant formatters and helpers
export {
  cleanNumber,
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatBankAccountNumberByType,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
} from './utils'
export type { BankAccountType } from './utils'
