import { createContext } from 'react'

type VisibilityContext = {
  inheritVisibility?: boolean
  isVisible?: boolean
}

const VisibilityContext = createContext<VisibilityContext>(null)

export default VisibilityContext
