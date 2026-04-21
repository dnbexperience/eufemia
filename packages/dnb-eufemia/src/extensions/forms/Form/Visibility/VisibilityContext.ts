import { createContext } from 'react'
import type { FormVisibilityProps } from './Visibility'

type VisibilityContext = {
  isVisible: boolean
  keepInDOM: boolean
  inheritVisibility?: boolean
  props?: FormVisibilityProps
}

const VisibilityContext = createContext<VisibilityContext>(null)

export default VisibilityContext
