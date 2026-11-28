import type { NumberFormatAllProps } from './NumberFormatBase'
import { formatBankAccountNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatBankAccountNumberProps = Omit<
  NumberFormatAllProps,
  | 'animate'
  | 'currency'
  | 'currencyDisplay'
  | 'currencyPosition'
  | 'compact'
  | 'decimals'
  | 'rounding'
  | 'signDisplay'
>

const NumberFormatBankAccountNumber =
  withFormatter<NumberFormatBankAccountNumberProps>(
    'NumberFormat.BankAccountNumber',
    formatBankAccountNumber
  )

export default NumberFormatBankAccountNumber
