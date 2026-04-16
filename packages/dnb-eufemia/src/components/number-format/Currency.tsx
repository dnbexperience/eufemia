import type {
  NumberFormatAllProps,
  NumberFormatProps,
} from './NumberFormatBase'
import { formatCurrency } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatCurrencyProps = Omit<
  NumberFormatAllProps,
  'ban' | 'nin' | 'phone' | 'org' | 'percent' | 'link'
> & {
  /** Currency code (ISO 4217) or `true` to use the default `NOK`. Defaults to `true`. */
  currency?: NumberFormatProps['currency']
}

const NumberFormatCurrency = withFormatter<NumberFormatCurrencyProps>(
  'NumberFormat.Currency',
  formatCurrency,
  { currency: true }
)

export default NumberFormatCurrency
