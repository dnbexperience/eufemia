import { createContext } from 'react'

type TableThContextProps = {
  active?: boolean
  reversed?: boolean
}

export const TableThContext = createContext<TableThContextProps>(null)
