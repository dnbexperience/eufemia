/**
 * Types for the NumberFormat namespace entry
 *
 * Re-exported from the surrounding modules, so the entry can expose them from
 * a single place without widening NumberFormatBase.
 */

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
