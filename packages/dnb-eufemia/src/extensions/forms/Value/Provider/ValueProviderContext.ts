import React from 'react'
import { ValueProps } from '../../types'

export type ValueProviderContextProps = {
  extend: <T = ValueProps>(props: T) => T
  inheritedProps?: ValueProps
  inheritedContext?: ValueProps
}

const extend: ValueProviderContextProps['extend'] = (props) => props
const ValueProviderContext =
  React.createContext<ValueProviderContextProps>({
    extend,
  })

export default ValueProviderContext
