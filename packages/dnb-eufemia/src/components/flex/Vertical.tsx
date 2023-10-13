import React from 'react'
import Container from './Container'
import type { Props as FlexContainerProps } from './Container'

export type Props = Omit<FlexContainerProps, 'direction'>

function Vertical({ children, ...props }: Props) {
  return (
    <Container {...props} direction="vertical">
      {children}
    </Container>
  )
}

Vertical._supportsEufemiaSpacingProps = true
export default Vertical
