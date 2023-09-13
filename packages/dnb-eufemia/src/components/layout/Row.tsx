import React from 'react'
import FlexContainer, {
  Props as FlexContainerProps,
} from './FlexContainer'

export type Props = Omit<FlexContainerProps, 'direction'>

function Row({ children, ...props }: Props) {
  return (
    <FlexContainer direction="row" {...props}>
      {children}
    </FlexContainer>
  )
}

Row._supportsEufemiaSpacingProps = true
export default Row
