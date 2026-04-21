import type {
  NumberFormatAllProps,
  NumberFormatProps,
} from './NumberFormatBase'
import { formatNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatNumberProps = Omit<
  NumberFormatAllProps,
  'currency' | 'currencyDisplay' | 'currencyPosition' | 'compact'
> & {
  /** Compact display: `short` (e.g., 1.2K), `long` (e.g., 1.2 thousand) or `true` for short. */
  compact?: NumberFormatProps['compact']
}

const NumberFormatNumber = withFormatter<NumberFormatNumberProps>(
  'NumberFormat.Number',
  formatNumber,
)

export default NumberFormatNumber
