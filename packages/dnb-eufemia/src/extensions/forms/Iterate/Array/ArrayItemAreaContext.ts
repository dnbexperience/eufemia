import { createContext } from 'react'
import { ArrayItemAreaProps } from './ArrayItemArea'
import { FlexContainerProps } from '../../../../components/flex/Container'

type ArrayItemAreaContext = {
  handleRemoveItem?: () => void
  variant?: ArrayItemAreaProps['variant']
  toolbarVariant?: ArrayItemAreaProps['toolbarVariant']
  divider?: FlexContainerProps['divider']
}

const ArrayItemAreaContext = createContext<ArrayItemAreaContext>(null)

export default ArrayItemAreaContext
