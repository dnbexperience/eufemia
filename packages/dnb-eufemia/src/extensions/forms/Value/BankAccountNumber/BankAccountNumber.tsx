import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import { Context } from '../../DataContext'

export type Props = StringValueProps

function BankAccountNumber(props: Props) {
  const context = useContext(Context)
  const translations = context.translations.bankAccountNumber

  const stringValueProps: Props = {
    ...props,
    label: props.label ?? (props.inline ? undefined : translations.label),
    prepare: (value) =>
      format(cleanNumber(value), {
        ban: true,
      }).toString(),
  }
  return <StringValue {...stringValueProps} />
}

BankAccountNumber._supportsSpacingProps = true
export default BankAccountNumber
