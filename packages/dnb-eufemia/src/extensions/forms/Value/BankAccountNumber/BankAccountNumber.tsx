import { useCallback, useMemo } from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import {
  formatBankAccountNumberByType,
  type BankAccountType,
} from '../../../../components/number-format/utils/formatBankAccountNumber'
import useTranslation from '../../hooks/useTranslation'
import { isValueEmpty } from '../../ValueBlock'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type { BankAccountType } from '../../../../components/number-format/utils/formatBankAccountNumber'

export type ValueBankAccountNumberProps = StringValueProps & {
  /**
   * The type of bank account number for formatting. Defaults to `norwegianBban`.
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
  return <StringValue {...stringValueProps} />
}

withComponentMarkers(BankAccountNumber, {
  _supportsSpacingProps: true,
})

export default BankAccountNumber
