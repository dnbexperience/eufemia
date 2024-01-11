import React from 'react'

type WithChildrenProps = {
  children?: React.ReactNode
}

function withChildren<T>(
  Component: React.ComponentType<T>
): React.ComponentType<T & WithChildrenProps> {
  Component['_supportsSpacingProps'] = 'children'
  return Component
}

export default withChildren
