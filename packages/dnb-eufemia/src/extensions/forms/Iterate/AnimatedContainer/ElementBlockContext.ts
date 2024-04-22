import { createContext } from 'react'

type ElementBlockContext = {
  handleRemoveBlock?: () => void
}

const ElementBlockContext = createContext<ElementBlockContext>(null)

export default ElementBlockContext
