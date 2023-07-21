import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function DataInputFirstName(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringInputProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.firstNameLabel,
    errorMessages: {
      required: sharedContext?.translation.Forms.firstNameErrorRequired,
      ...props.errorMessages,
    },
  }

  return <StringComponent {...stringInputProps} />
}
