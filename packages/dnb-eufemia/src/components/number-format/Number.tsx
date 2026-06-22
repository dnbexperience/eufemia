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
  /**
   * Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.
   */
  compact?: NumberFormatProps['compact']
}

const NumberFormatNumber = withFormatter<NumberFormatNumberProps>(
  'NumberFormat.Number',
  formatNumber
)

export default NumberFormatNumber
