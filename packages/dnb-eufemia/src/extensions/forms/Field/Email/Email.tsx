import React from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useErrorMessage from '../../hooks/useErrorMessage'
import { useLocale } from '../../../../shared/useLocale'

export type Props = StringFieldProps

function Email(props: Props) {
  const translations = useLocale().Forms.email

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.error.required,
    pattern: translations.error.pattern,
  })

  const StringFieldProps: Props = {
    label: translations.label,
    autoComplete: 'email',
    inputMode: 'email',
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    trim: true,
    ...props,
    errorMessages,
  }

  return <StringField {...StringFieldProps} />
}

Email._supportsSpacingProps = true
export default Email
