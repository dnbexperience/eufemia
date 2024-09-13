import { createContext } from 'react'

type VisibilityContext = {
  isVisible?: boolean
}

const VisibilityContext = createContext<VisibilityContext>(null)

export default VisibilityContext
