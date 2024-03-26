import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'

import useErrorMessage from '../../hooks/useErrorMessage'
import useLocale from '../../hooks/useLocale'

export type Props = StringFieldProps & {
  validate?: boolean
  omitMask?: boolean
}

function BankAccountNumber(props: Props) {
  const translations = useLocale().BankAccountNumber
  const { validate = true, omitMask } = props

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
    pattern: translations.errorPattern,
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
