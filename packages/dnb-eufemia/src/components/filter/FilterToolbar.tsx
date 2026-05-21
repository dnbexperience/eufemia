import { useContext } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { FilterContext } from './FilterContext'

export type FilterToolbarProps = {
  className?: string
  children?: ReactNode
}

function FilterToolbar({ className, children }: FilterToolbarProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.Toolbar must be used inside a Filter.Container.'
    )
  }

  return (
    <div className={clsx('dnb-filter__toolbar', className)}>
      {children}
    </div>
  )
}

export default FilterToolbar
