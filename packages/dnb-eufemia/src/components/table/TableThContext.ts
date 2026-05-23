import { createContext } from 'react'

type TableThContextProps = {
  reversed?: boolean
}

export const TableThContext = createContext<TableThContextProps>(null)
