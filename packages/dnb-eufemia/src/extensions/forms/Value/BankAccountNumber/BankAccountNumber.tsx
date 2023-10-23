import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import {
  format,
  cleanNumber,
} from '../../../../components/number-format/NumberUtils'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps

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
  return <StringComponent {...stringValueProps} />
}

BankAccountNumber._supportsSpacingProps = true
export default BankAccountNumber
