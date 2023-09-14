import React from 'react'
import FlexContainer, { FlexContainerProps } from './FlexContainer'

export type RowProps = Omit<FlexContainerProps, 'direction'>

function Row({ children, ...props }: RowProps) {
  return (
    <FlexContainer direction="row" {...props}>
      {children}
    </FlexContainer>
  )
}

Row._supportsEufemiaSpacingProps = true
export default Row
