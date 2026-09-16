import Container from './Container'
import type { FlexContainerAllProps } from './Container'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type FlexVerticalProps = Omit<FlexContainerAllProps, 'direction'>

function Vertical({ children, ...props }: FlexVerticalProps) {
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
