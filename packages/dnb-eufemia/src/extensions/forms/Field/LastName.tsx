import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function FieldLastName(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringComponentProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.lastNameLabel,
    errorMessages: {
      required: sharedContext?.translation.Forms.lastNameErrorRequired,
      ...props.errorMessages,
    },
  }

  return <StringComponent {...stringComponentProps} />
}
