/**
 * Row-level context for Table.Tr → Table.Td communication
 */

import { createContext } from 'react'

type TableTrContextProps = {
  highlight?: boolean
}

export const TableTrContext = createContext<TableTrContextProps>(null)
