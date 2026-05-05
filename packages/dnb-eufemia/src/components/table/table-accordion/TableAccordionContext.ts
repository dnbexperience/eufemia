/**
 * Web TableContext Context
 *
 */

import { createContext } from 'react'
import type { SyntheticEvent } from 'react'
import type { TableTrProps } from '../TableTr'

type TableAccordionContextProps = {
  toggleOpenTr: (
    event: SyntheticEvent,
    allowInteractiveElement?: boolean
  ) => void
  trIsOpen: boolean
  keepInDOM: TableTrProps['keepInDOM']
  countTds: number
  noAnimation: TableTrProps['noAnimation']
  onOpen: TableTrProps['onOpen']
  onClose: TableTrProps['onClose']
}

export const TableAccordionContext =
  createContext<TableAccordionContextProps>(null)
