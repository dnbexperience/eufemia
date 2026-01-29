import { createContext } from 'react'

export type ListVariant = 'basic' | (string & {})
export type ListContext = {
  variant: ListVariant
  separated: boolean
}

export const ListContext = createContext<ListContext | undefined>(
  undefined
)
