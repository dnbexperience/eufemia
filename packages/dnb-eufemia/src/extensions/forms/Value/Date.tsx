import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

export default function ValueDate(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.dateLabel,
  }
  return <StringComponent {...stringProps} />
}
