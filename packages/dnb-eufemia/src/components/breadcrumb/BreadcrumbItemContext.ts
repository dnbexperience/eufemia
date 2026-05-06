import { createContext } from 'react'
export type BreadcrumbItemContextValue = {
  itemNo?: number
}

const BreadcrumbItemContext =
  createContext<BreadcrumbItemContextValue | null>(null)

export default BreadcrumbItemContext
