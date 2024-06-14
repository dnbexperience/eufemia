/**
 * Web TableContext Context
 *
 */

import React from 'react'
import type { TableTrProps } from '../TableTr'

type TableAccordionContextProps = {
  toggleOpenTr: (
    event: React.SyntheticEvent,
    allowInteractiveElement?: boolean
  ) => void
  trIsOpen: boolean
  countTds: number
  noAnimation: TableTrProps['noAnimation']
  onOpened: TableTrProps['onOpened']
  onClosed: TableTrProps['onClosed']
}

export const TableAccordionContext =
  React.createContext<TableAccordionContextProps>(null)
