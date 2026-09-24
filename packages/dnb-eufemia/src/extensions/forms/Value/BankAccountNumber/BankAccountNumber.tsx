import { useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import {
  formatBankAccountNumberByType,
  type BankAccountType,
} from '../../../../components/number-format/utils/formatBankAccountNumber'
import NumberFormatBankAccountNumber from '../../../../components/number-format/BankAccountNumber'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type { BankAccountType } from '../../../../components/number-format/utils/formatBankAccountNumber'

export type ValueBankAccountNumberProps = StringValueProps & {
  /**
   * The type of bank account number, used for label and formatting. Can be `norwegianBban`, `swedishBban`, `swedishBankgiro`, `swedishPlusgiro`, or `iban`. Defaults to `norwegianBban`.
   */
  bankAccountType?: BankAccountType
}

function BankAccountNumber(props: ValueBankAccountNumberProps) {
  const { bankAccountType = 'norwegianBban', ...restProps } = props
  const translations = useTranslation().BankAccountNumber

  const toInput = useCallback(
    (external: unknown) => {
      if (isValueEmpty(external)) {
        return undefined
      }

      return formatBankAccountNumberByType(
        String(external),
        bankAccountType
      ).number
    },
    [bankAccountType]
  )

  const renderValue = useCallback(
    (value: ReactNode) =>
      typeof value === 'string' ? (
        <NumberFormatBankAccountNumber
          bankAccountType={bankAccountType}
          value={value}
        />
      ) : (
        value
      ),
    [bankAccountType]
  )

  const label = useMemo(() => {
    if (restProps.label !== undefined) {
      return restProps.label
    }

    if (restProps.inline) {
      return undefined
    }

    switch (bankAccountType) {
      case 'swedishBban':
        return translations.labelSwedishBban
      case 'swedishBankgiro':
        return translations.labelSwedishBankgiro
      case 'swedishPlusgiro':
        return translations.labelSwedishPlusgiro
      case 'iban':
        return translations.labelIban
      default:
        return translations.label
    }
  }, [restProps.label, restProps.inline, bankAccountType, translations])

  const stringValueProps: ValueBankAccountNumberProps = {
    ...restProps,
    label,
    toInput,
  }
  return <StringValue {...stringValueProps} renderValue={renderValue} />
}

withComponentMarkers(BankAccountNumber, {
  _supportsSpacingProps: true,
})

export default BankAccountNumber
