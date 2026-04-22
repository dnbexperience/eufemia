import type { PropertiesTableProps } from '../../../../shared/types'

export const BankAccountNumberValueProperties: PropertiesTableProps = {
  bankAccountType: {
    doc: 'The type of bank account number, used for label and formatting. Can be `norwegianBban`, `swedishBban`, `swedishBankgiro`, `swedishPlusgiro`, or `iban`. Defaults to `norwegianBban`.',
    type: 'string',
    status: 'optional',
  },
}
