import React from 'react'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = Omit<FlexContainerProps, 'direction'>

function Horizontal({ children, ...props }: Props) {
  return (
    <FlexContainer {...props} direction="horizontal">
      {children}
    </FlexContainer>
  )
}

Horizontal._supportsEufemiaSpacingProps = true
export default Horizontal
