import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps

function Email(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringComponentProps: Props = {
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

  return <StringComponent {...stringComponentProps} />
}

Email._supportsEufemiaSpacingProps = true
export default Email
