import type { ReactNode } from 'react'
import { clsx } from 'clsx'

export type FilterHeaderProps = {
  className?: string
  children?: ReactNode
}

function FilterHeader({ className, children }: FilterHeaderProps) {
  return (
    <div className={clsx('dnb-filter__header', className)}>{children}</div>
  )
}

export default FilterHeader
