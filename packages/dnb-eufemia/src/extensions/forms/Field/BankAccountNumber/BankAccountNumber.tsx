import React, { useContext, useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import { Context } from '../../DataContext/'
import useErrorMessage from '../../hooks/useErrorMessage'

export type Props = StringFieldProps & {
  validate?: boolean
  omitMask?: boolean
}

function BankAccountNumber(props: Props) {
  const context = useContext(SharedContext)
  const translations = context.translation.bankAccountNumber
  const { validate = true, omitMask } = props

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.error.required,
    pattern: translations.error.pattern,
  })
  const mask = useMemo(
    () =>
      omitMask
        ? [
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]
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
    [omitMask]
  )

  const StringFieldProps: Props = {
    ...props,
    className: 'dnb-forms-field-bank-account-number',
    pattern: props.pattern ?? (validate ? '^[0-9]{11}$' : undefined),
    label: props.label ?? translations.label,
    errorMessages,
    mask,
    width: props.width ?? 'medium',
    inputMode: 'numeric',
  }

  return <StringField {...StringFieldProps} />
}

BankAccountNumber._supportsSpacingProps = true
export default BankAccountNumber
