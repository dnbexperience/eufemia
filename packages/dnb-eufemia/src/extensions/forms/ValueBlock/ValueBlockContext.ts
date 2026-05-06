import { createContext } from 'react'
export type ValueBlockContextProps = {
  composition?: boolean
}

const ValueBlockContext = createContext<
  ValueBlockContextProps | undefined
>(undefined)

export default ValueBlockContext
