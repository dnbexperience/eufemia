import { createContext } from 'react'
import { ContainerMode } from '../Array/types'

type ElementBlockContext = {
  mode?: ContainerMode
  handleRemoveBlock?: () => void
}

const ElementBlockContext = createContext<ElementBlockContext>(null)

export default ElementBlockContext
