import { useContext } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './NumberUtils'
import { formatNumber } from './utils'

/**
 * Shape of a variant formatter (`formatPhoneNumber`, `formatCurrency`,
 * `formatPercent`, `formatNumber`, …).
 */
export type NumberFormatter = {
  (
    value: NumberFormatValue | null,
    options: NumberFormatOptionParams & { returnAria: true }
  ): NumberFormatReturnValue
  (
    value: NumberFormatValue | null,
    options?: NumberFormatOptionParams
  ): string
}

/**
 * Format a value with an explicit formatter, picking up `locale` and
 * `NumberFormat` defaults from the Eufemia `Provider`.
 *
 * `formatter` is optional and defaults to `formatNumber` for
 * backwards compatibility with plain numeric values.
 *
 * Pass the variant formatter you need, e.g.
 * `useNumberFormat(value, formatCurrency, { decimals: 2 })`.
 */
function useNumberFormat(
  value: NumberFormatValue,
  formatter: NumberFormatter,
  options: NumberFormatOptionParams & { returnAria: true }
): NumberFormatReturnValue
function useNumberFormat(
  value: NumberFormatValue,
  formatter?: NumberFormatter,
  options?: NumberFormatOptionParams
): string
function useNumberFormat(
  value: NumberFormatValue,
  formatter: NumberFormatter = formatNumber,
  options: NumberFormatOptionParams = {}
): NumberFormatReturnValue | string {
  const context = useContext(Context)
  const params = extendPropsWithContext(
    options,
    { locale: context.locale },
    context.NumberFormat
  ) as NumberFormatOptionParams

  return formatter(value, params)
}

export default useNumberFormat
