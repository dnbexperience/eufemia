import React from 'react'
import Container from './Container'
import type { Props as FlexContainerProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type Props = Omit<FlexContainerProps, 'direction'>

function Vertical({ children, ...props }: Props) {
  return (
    <Container {...props} direction="vertical">
      {children}
    </Container>
  )
}

export default withComponentMarkers(Vertical, {
  _supportsSpacingProps: true,
})
