import { createContext } from 'react'
import type { Props } from './Visibility'

type VisibilityContext = {
  isVisible: boolean
  keepInDOM: boolean
  inheritVisibility?: boolean
  props?: Props
}

const VisibilityContext = createContext<VisibilityContext>(null)

export default VisibilityContext
