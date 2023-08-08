import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import {
  format,
  cleanNumber,
} from '../../../components/number-format/NumberUtils'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function ValueBankAccountNumber(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label:
      props.label ??
      (props.inline
        ? undefined
        : sharedContext?.translation.Forms.bankAccountNumberLabel),
    value: format(cleanNumber(props.value), {
      ban: true,
    }).toString(),
  }
  return <StringComponent {...stringValueProps} />
}
