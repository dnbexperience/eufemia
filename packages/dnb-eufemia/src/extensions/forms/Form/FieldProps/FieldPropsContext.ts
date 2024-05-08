import React from 'react'
import { UseFieldProps } from '../../types'

export type FieldPropsContextProps = {
  extend: <T = UseFieldProps>(props: T) => T
  inheritedContext?: UseFieldProps
}

const extend: FieldPropsContextProps['extend'] = (props) => props
const FieldPropsContext = React.createContext<FieldPropsContextProps>({
  extend,
})

export default FieldPropsContext
