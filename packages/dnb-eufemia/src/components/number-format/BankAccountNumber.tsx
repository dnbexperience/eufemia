import NumberFormatBase, {
  type NumberFormatAllProps,
  type NumberFormatInternalFormatter,
} from './NumberFormatBase'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import {
  formatBankAccountNumber,
  formatBankAccountNumberByType,
  type BankAccountType,
} from './utils'
import { formatWith } from './utils/formatCore'

export type NumberFormatBankAccountNumberProps = Omit<
  NumberFormatAllProps,
  | 'currency'
  | 'currencyDisplay'
  | 'currencyPosition'
  | 'compact'
  | 'decimals'
  | 'rounding'
  | 'signDisplay'
> & {
  /**
   * The type of bank account number. Can be `norwegianBban`, `swedishBban`, `swedishBankgiro`, `swedishPlusgiro` or `iban`. Defaults to `norwegianBban`.
   */
  bankAccountType?: BankAccountType
}

const formatters: Partial<
  Record<BankAccountType, NumberFormatInternalFormatter>
> = {
  norwegianBban: formatBankAccountNumber,
}

function getFormatter(bankAccountType: BankAccountType) {
  return (formatters[bankAccountType] ??= formatWith('ban', (value) =>
    formatBankAccountNumberByType(value, bankAccountType)
  ))
}

function NumberFormatBankAccountNumber({
  bankAccountType = 'norwegianBban',
  ...props
}: NumberFormatBankAccountNumberProps) {
  return (
    <NumberFormatBase
      {...props}
      __format={getFormatter(bankAccountType)}
    />
  )
}

NumberFormatBankAccountNumber.displayName =
  'NumberFormat.BankAccountNumber'
withComponentMarkers(NumberFormatBankAccountNumber, {
  _supportsSpacingProps: true,
})

export default NumberFormatBankAccountNumber
