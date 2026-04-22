import React from 'react'

export type ValueBlockContextProps = {
  composition?: boolean
}

const ValueBlockContext = React.createContext<
  ValueBlockContextProps | undefined
>(undefined)

export default ValueBlockContext
