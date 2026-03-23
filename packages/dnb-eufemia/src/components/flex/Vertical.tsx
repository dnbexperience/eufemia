import React from 'react'
import Container from './Container'
import type { FlexContainerAllProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type VerticalProps = Omit<FlexContainerAllProps, 'direction'>

function Vertical({ children, ...props }: VerticalProps) {
  return (
    <Container {...props} direction="vertical">
      {children}
    </Container>
  )
}

withComponentMarkers(Vertical, {
  _supportsSpacingProps: true,
})

export default Vertical
