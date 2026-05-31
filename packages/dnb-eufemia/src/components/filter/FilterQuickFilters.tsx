import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../space/SpacingUtils'
import type { SpacingProps } from '../../shared/types'

export type FilterQuickFiltersProps = {
  className?: string
  children?: ReactNode
} & SpacingProps

function FilterQuickFilters({
  className,
  children,
  ...spacingRest
}: FilterQuickFiltersProps) {
  const spacingProps = useSpacing(spacingRest, {
    className: clsx('dnb-filter__quick-filters', className),
  })

  return <div {...spacingProps}>{children}</div>
}

export default FilterQuickFilters
