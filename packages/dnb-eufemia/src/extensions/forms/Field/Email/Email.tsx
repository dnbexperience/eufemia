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
    label: sharedContext?.translation.Forms.emailLabel,
    autoComplete: 'email',
    inputMode: 'email',
    pattern:
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
    trim: true,
    ...props,
    errorMessages,
  }

  return <StringComponent {...stringComponentProps} />
}

Email._supportsSpacingProps = true
export default Email
