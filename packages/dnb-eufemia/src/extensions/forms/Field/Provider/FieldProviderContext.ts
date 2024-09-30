import React from 'react'
import { UseFieldProps } from '../../types'

export type FieldProviderContextProps = {
  extend: <T = UseFieldProps>(props: T) => T
  inheritedProps?: UseFieldProps
  inheritedContext?: UseFieldProps
}

const extend: FieldProviderContextProps['extend'] = (props) => props
const FieldProviderContext =
  React.createContext<FieldProviderContextProps>({
    extend,
  })

export default FieldProviderContext
