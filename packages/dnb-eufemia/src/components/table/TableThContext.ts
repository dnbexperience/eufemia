import { createContext } from 'react'

type TableThContextProps = {
  reversed?: boolean
  onSortClick?: () => void
}

export const TableThContext = createContext<TableThContextProps>(null)
