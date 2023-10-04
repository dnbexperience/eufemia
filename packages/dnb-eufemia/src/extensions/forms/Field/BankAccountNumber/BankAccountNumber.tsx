import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps & {
  validate?: boolean
  omitMask?: boolean
}

function BankAccountNumber(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { validate = true, omitMask } = props

  const stringComponentProps: Props = {
    ...props,
    className: 'dnb-forms-field-bank-account-number',
    pattern: props.pattern ?? (validate ? '^[0-9]{11}$' : undefined),
    label:
      props.label ??
      sharedContext?.translation.Forms.bankAccountNumberLabel,
    errorMessages: {
      required:
        sharedContext?.translation.Forms.bankAccountNumberErrorRequired,
      pattern:
        sharedContext?.translation.Forms.bankAccountNumberErrorPattern,
      ...props.errorMessages,
    },
    mask: omitMask
      ? [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
      : [
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          ' ',
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          /\d/,
        ],
    width: props.width ?? 'medium',
  }

  return <StringComponent {...stringComponentProps} />
}

BankAccountNumber._supportsEufemiaSpacingProps = true
export default BankAccountNumber
