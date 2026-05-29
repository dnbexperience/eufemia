/**
 * NumberFormat namespace entry
 *
 * `NumberFormat` is exported as a plain object namespace of sub-components.
 * Rendering `<NumberFormat />` directly is no longer supported – use one of
 * the variants instead, e.g.
 * `<NumberFormat.Number />`, `<NumberFormat.Currency />`,
 * `<NumberFormat.Percent />`,
 * `<NumberFormat.PhoneNumber />`, `<NumberFormat.BankAccountNumber />`,
 * `<NumberFormat.NationalIdentityNumber />` or
 * `<NumberFormat.OrganizationNumber />`.
 *
 * We intentionally use a plain object rather than `import * as` (Module
 * Namespace exotic object) because the namespace form can break when
 * re-exported through barrel files and consumed via named imports
 * (`import { NumberFormat } from '@dnb/eufemia'`) in bundlers that
 * perform CJS/ESM interop or dependency pre-bundling.
 */

import NumberComponent from './Number'
import Currency from './Currency'
import Percent from './Percent'
import PhoneNumber from './PhoneNumber'
import BankAccountNumber from './BankAccountNumber'
import NationalIdentityNumber from './NationalIdentityNumber'
import OrganizationNumber from './OrganizationNumber'

const NumberFormat = {
  Number: NumberComponent,
  Currency,
  Percent,
  PhoneNumber,
  BankAccountNumber,
  NationalIdentityNumber,
  OrganizationNumber,
} as const

export default NumberFormat

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
  formatNationalIdentityNumber,
  formatOrganizationNumber,
} from './utils'
