import { createContext } from 'react'
import type { ValueProps } from '../../types'

export type ValueProviderContextProps = {
  extend: <T = ValueProps>(props: T) => T
  inheritedProps?: ValueProps
  inheritedContext?: ValueProps
}

const extend: ValueProviderContextProps['extend'] = (props) => props
const ValueProviderContext = createContext<ValueProviderContextProps>({
  extend,
})

export default ValueProviderContext
