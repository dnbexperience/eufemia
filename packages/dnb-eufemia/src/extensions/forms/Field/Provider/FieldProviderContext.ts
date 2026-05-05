import { createContext } from 'react'
import type { UseFieldProps } from '../../types'

export type FieldProviderContextProps = {
  extend: <T = UseFieldProps>(props: T) => T
  inheritedProps?: UseFieldProps
  inheritedContext?: UseFieldProps
}

const extend: FieldProviderContextProps['extend'] = (props) => props
const FieldProviderContext = createContext<FieldProviderContextProps>({
  extend,
})

export default FieldProviderContext
