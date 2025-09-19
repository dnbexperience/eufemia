/**
 * Web TableContext Context
 *
 */

import React from 'react'
import type { Translation } from '../../shared/Context'
import type { TableAllProps } from './Table'

type TableContextProps = {
  trCountRef: React.MutableRefObject<{
    count: number
  }>
  rerenderAlias: Record<string, never>
  collapseTrCallbacks: React.MutableRefObject<(() => void)[]>
  allProps: TableAllProps & Translation['Table']
  hasAccordionRows?: boolean
}

export const TableContext = React.createContext<TableContextProps>(null)
