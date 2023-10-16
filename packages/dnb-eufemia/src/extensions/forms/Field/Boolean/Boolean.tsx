import React, { useContext } from 'react'
import Toggle, { Props as ToggleProps } from '../Toggle'
import SharedContext from '../../../../shared/Context'

export type Props = Omit<
  ToggleProps,
  'valueOn' | 'valueOff' | 'textOn' | 'textOff'
> & {
  trueText?: string
  falseText?: string
}

function BooleanComponent(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { trueText, falseText, ...restProps } = props
  return (
    <Toggle
      {...restProps}
      valueOn={true}
      valueOff={false}
      textOn={trueText ?? sharedContext?.translation.Forms.booleanYes}
      textOff={falseText ?? sharedContext?.translation.Forms.booleanNo}
    />
  )
}

BooleanComponent._supportsSpacingProps = true
export default BooleanComponent
