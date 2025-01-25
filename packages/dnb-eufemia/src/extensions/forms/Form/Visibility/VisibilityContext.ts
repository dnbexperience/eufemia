import { createContext } from 'react'
import { Props } from './Visibility'

type VisibilityContext = {
  inheritVisibility?: boolean
  isVisible?: boolean
  props?: Props
}

const VisibilityContext = createContext<VisibilityContext>(null)

export default VisibilityContext
