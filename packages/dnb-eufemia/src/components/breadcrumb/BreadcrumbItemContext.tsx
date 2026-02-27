import React from 'react'

export type BreadcrumbItemContextValue = {
  itemNo?: number
}

const BreadcrumbItemContext =
  React.createContext<BreadcrumbItemContextValue | null>(null)

export default BreadcrumbItemContext
