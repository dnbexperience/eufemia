import { useContext } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'
import HeightAnimation from '../height-animation/HeightAnimation'
import { FilterContext } from './FilterContext'

export type FilterIndicatorProps = {
  className?: string
  children?: ReactNode
}

function FilterIndicator({ className, children }: FilterIndicatorProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.Indicator must be used inside a Filter.Container.'
    )
  }

  return (
    <HeightAnimation open={context.resultLoading}>
      <span className={clsx('dnb-filter__indicator', className)}>
        <ProgressIndicator type="circular" size="small" />
        {children}
      </span>
    </HeightAnimation>
  )
}

export default FilterIndicator
