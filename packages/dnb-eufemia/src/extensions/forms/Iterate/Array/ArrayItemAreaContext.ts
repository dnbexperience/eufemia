import { createContext } from 'react'

type ArrayItemAreaContext = {
  handleRemoveItem?: () => void
}

const ArrayItemAreaContext = createContext<ArrayItemAreaContext>(null)

export default ArrayItemAreaContext
