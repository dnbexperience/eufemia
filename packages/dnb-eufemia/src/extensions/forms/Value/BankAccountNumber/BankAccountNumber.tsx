import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import SharedContext from '../../../../shared/Context'

export type Props = StringValueProps

function BankAccountNumber(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label:
      props.label ??
      (props.inline
        ? undefined
        : sharedContext?.translation.Forms.bankAccountNumberLabel),
    prepare: (value) =>
      format(cleanNumber(value), {
        ban: true,
      }).toString(),
  }
  return <StringValue {...stringValueProps} />
}

BankAccountNumber._supportsSpacingProps = true
export default BankAccountNumber
