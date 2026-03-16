import React from 'react'
import Container from './Container'
import type { FlexContainerAllProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type Props = Omit<FlexContainerAllProps, 'direction'>

function Vertical({ children, ...props }: Props) {
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
