import type { ComponentType, ReactNode } from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

type WithChildrenProps = {
  children?: ReactNode
}

function withChildren<T>(
  Component: ComponentType<T>
): ComponentType<T & WithChildrenProps> {
  withComponentMarkers(Component, { _supportsSpacingProps: 'children' })
  return Component
}

export default withChildren
