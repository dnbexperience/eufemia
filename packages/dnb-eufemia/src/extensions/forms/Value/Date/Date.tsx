import React, { useContext } from 'react'
import StringComponent, { Props as StringComponentProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringComponentProps

function DateComponent(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.dateLabel,
  }
  return <StringComponent {...stringProps} />
}

DateComponent._supportsEufemiaSpacingProps = true
export default DateComponent
