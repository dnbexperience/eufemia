import { useContext } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { FilterContext } from './FilterContext'

export type FilterQuickFilterProps = {
  className?: string
  children?: ReactNode
}

function FilterQuickFilter({
  className,
  children,
}: FilterQuickFilterProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.QuickFilter must be used inside a Filter.Container.'
    )
  }

  return (
    <div className={clsx('dnb-filter__quick-filter', className)}>
      {children}
    </div>
  )
}

export default FilterQuickFilter
