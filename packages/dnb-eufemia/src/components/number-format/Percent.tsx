import type { NumberFormatAllProps } from './NumberFormatBase'
import { formatPercent } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatPercentProps = Omit<
  NumberFormatAllProps,
  'currency' | 'currencyDisplay' | 'currencyPosition' | 'compact'
>

const NumberFormatPercent = withFormatter<NumberFormatPercentProps>(
  'NumberFormat.Percent',
  formatPercent,
)

export default NumberFormatPercent
