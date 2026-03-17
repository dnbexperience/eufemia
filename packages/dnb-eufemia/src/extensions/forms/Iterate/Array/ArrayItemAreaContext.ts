import { createContext } from 'react'
import type { ArrayItemAreaProps } from './ArrayItemArea'
import type { FlexContainerProps } from '../../../../components/flex/Container'

type ArrayItemAreaContext = {
  handleRemoveItem?: () => void
  variant?: ArrayItemAreaProps['variant']
  toolbarVariant?: ArrayItemAreaProps['toolbarVariant']
  divider?: FlexContainerProps['divider']
}

const ArrayItemAreaContext = createContext<ArrayItemAreaContext>(null)

export default ArrayItemAreaContext
