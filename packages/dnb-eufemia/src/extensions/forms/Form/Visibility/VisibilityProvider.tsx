import React from 'react'
import VisibilityProviderContext from './VisibilityProviderContext'

export type Props = {
  inheritVisibility?: boolean
  children: React.ReactNode
}

function VisibilityProvider(props: Props) {
  const { inheritVisibility, children } = props
  return (
    <VisibilityProviderContext.Provider value={{ inheritVisibility }}>
      {children}
    </VisibilityProviderContext.Provider>
  )
}

VisibilityProvider._supportsSpacingProps = 'children'

export default VisibilityProvider
