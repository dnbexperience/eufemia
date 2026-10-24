import { createContext } from 'react'

export const TableOfContentContext = createContext({
  currentId: null as string | null,
  maxDepth: 2,
  depth: 1,
  isSidebar: false,
  navigate: (_id: string) => {},
})
