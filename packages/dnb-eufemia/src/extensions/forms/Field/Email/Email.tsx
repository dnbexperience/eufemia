import React, { useContext } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import SharedContext from '../../../../shared/Context'
import useErrorMessage from '../../hooks/useErrorMessage'

export type Props = StringFieldProps

function Email(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const errorMessages = useErrorMessage(props.path, props.errorMessages, {
    required: tr.emailErrorRequired,
    pattern: tr.emailErrorPattern,
  })

  const StringFieldProps: Props = {
    label: sharedContext?.translation.Forms.emailLabel,
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
