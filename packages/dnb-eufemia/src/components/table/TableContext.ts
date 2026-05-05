/**
 * Web TableContext Context
 *
 */

import { createContext } from 'react'
import type { RefObject } from 'react'
import type { Translation } from '../../shared/Context'
import type { TableAllProps } from './Table'

type TableContextProps = {
  trCountRef: RefObject<{
    count: number
  }>
  rerenderAlias: Record<string, never>
  collapseTrCallbacks: RefObject<(() => void)[]>
  allProps: TableAllProps & Translation['Table']
  hasAccordionRows?: boolean
}

export const TableContext = createContext<TableContextProps>(null)
