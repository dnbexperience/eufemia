import { createContext } from 'react'
import { ArrayItemAreaProps } from './ArrayItemArea'

type ArrayItemAreaContext = {
  handleRemoveItem?: () => void
  variant?: ArrayItemAreaProps['variant']
  toolbarVariant?: ArrayItemAreaProps['toolbarVariant']
}

const ArrayItemAreaContext = createContext<ArrayItemAreaContext>(null)

export default ArrayItemAreaContext
