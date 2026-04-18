/**
 * NumberFormat namespace entry
 *
 * `NumberFormat` is exported only as a namespace of sub-components for better
 * code splitting and tree shaking. Rendering `<NumberFormat />` directly is
 * no longer supported – use one of the variants instead, e.g.
 * `<NumberFormat.Number />`, `<NumberFormat.Currency />`,
 * `<NumberFormat.Percent />`,
 * `<NumberFormat.PhoneNumber />`, `<NumberFormat.BankAccountNumber />`,
 * `<NumberFormat.NationalIdentityNumber />` or
 * `<NumberFormat.OrganizationNumber />`.
 */

// For TypeScript compatibility we import and export it this way
import * as _default from './NumberFormatExport'
export { _default as default }

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

export { COPY_TOOLTIP_TIMEOUT } from './NumberFormatBase'

// Re-export the variant formatters
export {
  formatNumber,
  formatCurrency,
  formatPercent,
  formatPhoneNumber,
  formatBankAccountNumber,
  formatNationalIdentityNumber,
  formatOrganizationNumber,
} from './utils'
