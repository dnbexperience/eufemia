import React from 'react'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type React from 'react'

type WithChildrenProps = {
  children?: React.ReactNode
}

function withChildren<T>(
  Component: React.ComponentType<T>
): React.ComponentType<T & WithChildrenProps> {
  withComponentMarkers(Component, { _supportsSpacingProps: 'children' })
  return Component
}

export default withChildren
