import { useContext } from 'react'
import { clsx } from 'clsx'
import SharedContext from '../../shared/Context'
import { FilterContext } from './FilterContext'
import Tag from '../tag/Tag'
import HeightAnimation from '../height-animation/HeightAnimation'

export type FilterActiveFiltersProps = {
  label?: string
  showFilterLabel?: boolean
  className?: string
}

function FilterActiveFilters({
  label,
  showFilterLabel,
  className,
}: FilterActiveFiltersProps) {
  const sharedContext = useContext(SharedContext)
  const { activeFiltersLabel } = sharedContext.getTranslation({}).Filter
  const resolvedLabel = label ?? activeFiltersLabel
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.ActiveFilters must be used inside a Filter.Container.'
    )
  }

  const entries = Object.entries(context.state.filters)

  return (
    <HeightAnimation open={entries.length > 0}>
      <div className={clsx('dnb-filter__active-filters', className)}>
        <span className="dnb-filter__active-filters__label">
          {resolvedLabel}
        </span>
        <Tag.Group label={resolvedLabel}>
          {entries.map(([filterKey, filterValue]) => {
            const tagLabel =
              showFilterLabel && filterValue.filterLabel
                ? `${filterValue.filterLabel}: ${filterValue.label}`
                : filterValue.label

            return (
              <Tag
                key={filterKey}
                variant="removable"
                onClick={() => context.removeFilter(filterKey)}
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
