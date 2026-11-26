import { createContext } from 'react'
export type BreadcrumbItemContextValue = {
  itemNo?: number
  animate?: boolean
  motion?: 'enter' | 'exit'
}

const BreadcrumbItemContext =
  createContext<BreadcrumbItemContextValue | null>(null)

export default BreadcrumbItemContext
