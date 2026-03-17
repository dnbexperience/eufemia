import { createContext } from 'react'

export type ListVariant = 'basic'
export type ListContextValue = {
  variant: ListVariant
  separated: boolean
}

export const ListContext = createContext<ListContextValue | undefined>(
  undefined
)
