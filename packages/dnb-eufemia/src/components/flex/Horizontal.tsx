import React from 'react'
import Container from './Container'
import type { FlexContainerAllProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type Props = Omit<FlexContainerAllProps, 'direction'>

function Horizontal({ children, ...props }: Props) {
  return (
    <Container {...props} direction="horizontal">
      {children}
    </Container>
  )
}

withComponentMarkers(Horizontal, {
  _supportsSpacingProps: true,
})

export default Horizontal
