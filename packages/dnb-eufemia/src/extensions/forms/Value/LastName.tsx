import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'
import SharedContext from '../../../shared/Context'

export type Props = StringComponentProps

function LastName(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringValueProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.lastNameLabel,
  }
  return <StringComponent {...stringValueProps} />
}

LastName._supportsEufemiaSpacingProps = true
export default LastName
