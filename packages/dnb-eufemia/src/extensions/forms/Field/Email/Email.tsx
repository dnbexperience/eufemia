import React, { useContext, useMemo } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps

function Email(props: Props) {
  const sharedContext = useContext(SharedContext)
  const tr = sharedContext?.translation.Forms

  const errorMessages = useMemo(
    () => ({
      required: tr.emailErrorRequired,
      pattern: tr.emailErrorPattern,
      ...props.errorMessages,
    }),
    [tr, props.errorMessages]
  )

  const stringComponentProps: Props = {
    ...props,
    type: props.type ?? 'email',
    pattern:
      props.pattern ??
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    label: props.label ?? sharedContext?.translation.Forms.emailLabel,
    errorMessages,
  }

  return <StringComponent {...stringComponentProps} />
}

Email._supportsSpacingProps = true
export default Email
