import { createContext } from 'react'

type VisibilityProviderContext = {
  inheritVisibility?: boolean
}

const VisibilityProviderContext =
  createContext<VisibilityProviderContext>(null)

export default VisibilityProviderContext
