import type {
  NumberFormatAllProps,
  NumberFormatProps,
} from './NumberFormatBase'
import { formatPlainNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatNumberProps = Omit<
  NumberFormatAllProps,
  | 'currency'
  | 'currencyDisplay'
  | 'currencyPosition'
  | 'compact'
  | 'ban'
  | 'nin'
  | 'phone'
  | 'org'
  | 'percent'
  | 'link'
> & {
  /** Compact display: `short` (e.g., 1.2K), `long` (e.g., 1.2 thousand) or `true` for short. */
  compact?: NumberFormatProps['compact']
}

const NumberFormatNumber = withFormatter<NumberFormatNumberProps>(
  'NumberFormat.Number',
  formatPlainNumber
)

export default NumberFormatNumber
