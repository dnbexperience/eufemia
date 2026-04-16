import type {
  NumberFormatAllProps,
  NumberFormatInternalFormatter,
  NumberFormatProps,
} from './NumberFormatBase'
import { formatCurrency, formatPlainNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatCompactProps = Omit<
  NumberFormatAllProps,
  'ban' | 'nin' | 'phone' | 'org' | 'percent' | 'link'
> & {
  /** Compact display: `short` (e.g., 1.2K), `long` (e.g., 1.2 thousand) or `true` for short. Defaults to `short`. */
  compact?: NumberFormatProps['compact']
}

const formatCompact: NumberFormatInternalFormatter = (value, options) => {
  if (options.currency === true || typeof options.currency === 'string') {
    return formatCurrency(value, options)
  }
  return formatPlainNumber(value, options)
}

const NumberFormatCompact = withFormatter<NumberFormatCompactProps>(
  'NumberFormat.Compact',
  formatCompact,
  { compact: true }
)

export default NumberFormatCompact
