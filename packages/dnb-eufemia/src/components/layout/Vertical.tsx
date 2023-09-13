import React from 'react'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = Omit<FlexContainerProps, 'direction'>

function Vertical({ children, ...props }: Props) {
  return (
    <FlexContainer {...props} direction="vertical">
      {children}
    </FlexContainer>
  )
}

Vertical._supportsEufemiaSpacingProps = true
export default Vertical
