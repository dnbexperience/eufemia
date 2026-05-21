import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Skeleton from '../skeleton/Skeleton'
import { useSharedState } from '../../shared/helpers/useSharedState'
import type { FilterState } from './FilterContext'
import HeightAnimation from '../HeightAnimation'

export type FilterResultsContainerProps = {
  connectedTo: string
  className?: string
  children?: ReactNode
}

function FilterResultsContainer({
  connectedTo,
  className,
  children,
}: FilterResultsContainerProps) {
  const { data } = useSharedState<FilterState>(connectedTo)

  const isLoading = data?.resultLoading ?? false

  return (
    <Skeleton
      show={isLoading}
      className={clsx('dnb-filter__results-container', className)}
    >
      <HeightAnimation>{children}</HeightAnimation>
    </Skeleton>
  )
}

export default FilterResultsContainer
