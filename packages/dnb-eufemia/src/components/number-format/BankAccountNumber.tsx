import type { NumberFormatAllProps } from './NumberFormatBase'
import { formatBankAccountNumber } from './utils'
import { withFormatter } from './withFormatter'

export type NumberFormatBankAccountNumberProps = Omit<
  NumberFormatAllProps,
  'currency' | 'currencyDisplay' | 'currencyPosition' | 'compact'
>

const NumberFormatBankAccountNumber =
  withFormatter<NumberFormatBankAccountNumberProps>(
    'NumberFormat.BankAccountNumber',
    formatBankAccountNumber,
  )

export default NumberFormatBankAccountNumber
