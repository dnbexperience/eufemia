import type {
  NumberFormatAllProps,
  NumberFormatProps,
} from './NumberFormatBase'
import { formatCurrency } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatCurrencyProps = Omit<
  NumberFormatAllProps,
  'compact'
> & {
  /**
   * Currency code (ISO 4217) or `true` to use the default `NOK`. Defaults to `true` when using `NumberFormat.Currency`. Uses two decimals by default.
   */
  currency?: NumberFormatProps['currency']
  /**
   * Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.
   */
  compact?: NumberFormatProps['compact']
}

const NumberFormatCurrency = withFormatter<NumberFormatCurrencyProps>(
  'NumberFormat.Currency',
  formatCurrency,
  { currency: true }
)

export default NumberFormatCurrency
