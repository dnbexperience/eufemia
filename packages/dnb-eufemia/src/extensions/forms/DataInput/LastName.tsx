import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function DataInputLastName(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringInputProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.lastNameLabel,
    errorMessages: {
      required: sharedContext?.translation.Forms.lastNameErrorRequired,
      ...props.errorMessages,
    },
  }

  return <StringComponent {...stringInputProps} />
}
