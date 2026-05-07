import { createContext } from 'react'
export type BreadcrumbItemContextValue = {
  itemNo?: number
  hideIcon?: boolean
}

const BreadcrumbItemContext =
  createContext<BreadcrumbItemContextValue | null>(null)

export default BreadcrumbItemContext
