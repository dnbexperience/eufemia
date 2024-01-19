import React, { useContext } from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import SharedContext from '../../../../shared/Context'

export type Props = StringValueProps

function DateComponent(props: Props) {
  const sharedContext = useContext(SharedContext)

  const stringProps: Props = {
    ...props,
    label: props.label ?? sharedContext?.translation.Forms.dateLabel,
  }
  return <StringValue {...stringProps} />
}

DateComponent._supportsSpacingProps = true
export default DateComponent
