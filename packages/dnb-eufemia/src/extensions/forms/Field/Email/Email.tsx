import React from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useErrorMessage from '../../hooks/useErrorMessage'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps

function Email(props: Props) {
  const translations = useTranslation().Email

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: translations.errorRequired,
    pattern: translations.errorPattern,
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
