import type { NumberFormatAllProps } from './NumberFormatBase'
import { formatNationalIdentityNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatNationalIdentityNumberProps = Omit<
  NumberFormatAllProps,
  | 'currency'
  | 'currencyDisplay'
  | 'currencyPosition'
  | 'compact'
  | 'decimals'
  | 'rounding'
  | 'signDisplay'
>

const NumberFormatNationalIdentityNumber =
  withFormatter<NumberFormatNationalIdentityNumberProps>(
    'NumberFormat.NationalIdentityNumber',
    formatNationalIdentityNumber
  )

export default NumberFormatNationalIdentityNumber
