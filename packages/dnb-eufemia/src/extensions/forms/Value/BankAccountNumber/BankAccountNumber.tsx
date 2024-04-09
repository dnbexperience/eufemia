import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function BankAccountNumber(props: Props) {
  const translations = useTranslation().BankAccountNumber

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
