import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function EmailInput(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringInputProps: Props = {
    ...props,
    type: props.type ?? 'email',
    pattern:
      props.pattern ??
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    label: props.label ?? sharedContext?.translation.Forms.emailLabel,
    errorMessages: {
      required: sharedContext?.translation.Forms.emailErrorRequired,
      pattern: sharedContext?.translation.Forms.emailErrorPattern,
      ...props.errorMessages,
    },
  }

  return <StringComponent {...stringInputProps} />
}
