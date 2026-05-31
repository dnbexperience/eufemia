import { useContext } from 'react'
import { clsx } from 'clsx'
import SharedContext from '../../shared/Context'
import { FilterContext } from './FilterContext'
import Tag from '../tag/Tag'
import HeightAnimation from '../height-animation/HeightAnimation'

export type FilterActiveFiltersProps = {
  label?: string
  showCategoryLabel?: boolean
  onRemove?: (filterKey: string) => void
  className?: string
}

function FilterActiveFilters({
  label,
  showCategoryLabel,
  onRemove,
  className,
}: FilterActiveFiltersProps) {
  const sharedContext = useContext(SharedContext)
  const { activeFiltersLabel } = sharedContext.getTranslation({}).Filter
  const resolvedLabel = label ?? activeFiltersLabel
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.ActiveFilters must be used inside a Filter.Root.'
    )
  }

  const entries = Object.entries(
    context.behavior === 'manual'
      ? context.appliedState.filters
      : context.state.filters
  )
  const hasEntries = entries.length > 0

  return (
    <HeightAnimation open={hasEntries} keepInDOM>
      <div className={clsx('dnb-filter__active-filters', className)}>
        {/* aria-hidden because Tag.Group provides the accessible label */}
        <span className="dnb-filter__active-filters__label" aria-hidden>
          {resolvedLabel}
        </span>
        <Tag.Group label={resolvedLabel}>
          {entries.map(([filterKey, filterValue]) => {
            const tagLabel =
              showCategoryLabel && filterValue.categoryLabel
                ? `${filterValue.categoryLabel}: ${filterValue.label}`
                : filterValue.label

            return (
              <Tag
                key={filterKey}
                variant="removable"
                onClick={() => {
                  if (context.behavior === 'manual') {
                    context.removeAppliedFilter(filterKey)
                  } else {
                    context.removeFilter(filterKey)
                  }
                  onRemove?.(filterKey)
                }}
              >
                {tagLabel}
              </Tag>
            )
          })}
        </Tag.Group>
      </div>
    </HeightAnimation>
  )
}

export default FilterActiveFilters
