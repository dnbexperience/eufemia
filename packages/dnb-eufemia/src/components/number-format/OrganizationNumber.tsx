import type { NumberFormatAllProps } from './NumberFormatBase'
import { formatOrganizationNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatOrganizationNumberProps = Omit<
  NumberFormatAllProps,
  | 'currency'
  | 'currencyDisplay'
  | 'currencyPosition'
  | 'compact'
  | 'decimals'
  | 'rounding'
  | 'signDisplay'
>

const NumberFormatOrganizationNumber =
  withFormatter<NumberFormatOrganizationNumberProps>(
    'NumberFormat.OrganizationNumber',
    formatOrganizationNumber
  )

export default NumberFormatOrganizationNumber
