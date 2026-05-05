import { createContext } from 'react'
export type CardContextValue = {
  isNested?: boolean
}

const CardContext = createContext<CardContextValue | undefined>(undefined)

export default CardContext
