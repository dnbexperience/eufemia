import { useContext } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  NumberFormatOptionParams,
  NumberFormatReturnType,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './NumberUtils'
import { formatPlainNumber } from './utils'

/**
 * Shape of a variant formatter (`formatPhoneNumber`, `formatCurrency`,
 * `formatPercent`, `formatPlainNumber`, …).
 */
export type NumberFormatter = (
  value: NumberFormatValue | null,
  options: NumberFormatOptionParams
) => NumberFormatReturnType | NumberFormatReturnValue | string

/**
 * Format a value with an explicit formatter, picking up `locale` and
 * `NumberFormat` defaults from the Eufemia `Provider`.
 *
 * `formatter` is optional and defaults to `formatPlainNumber` for
 * backwards compatibility with plain numeric values.
 *
 * Pass the variant formatter you need, e.g.
 * `useNumberFormat(value, formatCurrency, { decimals: 2 })`.
 */
function useNumberFormat(
  value: NumberFormatValue,
  formatter: NumberFormatter = formatPlainNumber,
  options: NumberFormatOptionParams = {}
) {
  const context = useContext(Context)
  const params = extendPropsWithContext(
    options,
    { locale: context.locale },
    context.NumberFormat
  )

  return formatter(value, params)
}

export default useNumberFormat
