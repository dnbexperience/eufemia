import { useContext, useId } from 'react'
import { clsx } from 'clsx'
import SharedContext from '../../shared/Context'
import { FilterContext } from './FilterContext'
import Tag from '../tag/Tag'
import HeightAnimation from '../height-animation/HeightAnimation'
import Accordion from '../accordion/Accordion'
import Button from '../button/Button'
import ScrollView from '../../fragments/scroll-view/ScrollView'
import Flex from '../flex/Flex'
import { close } from '../../icons'

export type FilterActiveFiltersProps = {
  label?: string
  showCategoryLabel?: boolean
  collapsibleThreshold?: number
  onRemove?: (filterKey: string) => void
  className?: string
}

function FilterActiveFilters({
  label,
  showCategoryLabel,
  collapsibleThreshold,
  onRemove,
  className,
}: FilterActiveFiltersProps) {
  const sharedContext = useContext(SharedContext)
  const { activeFiltersLabel, activeFiltersCountLabel, clearAllLabel } =
    sharedContext.getTranslation({}).Filter
  const resolvedLabel = label ?? activeFiltersLabel
  const context = useContext(FilterContext)
  const accordionId = useId()

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
  const isCollapsible =
    collapsibleThreshold != null && entries.length > collapsibleThreshold

  const handleRemove = (filterKey: string) => {
    if (context.behavior === 'manual') {
      context.removeAppliedFilter(filterKey)
    } else {
      context.removeFilter(filterKey)
    }
    onRemove?.(filterKey)
  }

  const handleClearAll = () => {
    context.resetFilters()
  }

  const tags = (
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
            onClick={() => handleRemove(filterKey)}
          >
            {tagLabel}
          </Tag>
        )
      })}
    </Tag.Group>
  )

  return (
    <HeightAnimation>
      {hasEntries && (
        <div className={clsx('dnb-filter__active-filters', className)}>
          {isCollapsible ? (
            <>
              <Flex.Horizontal
                className="dnb-filter__active-filters__header"
                justify="space-between"
                align="center"
              >
                <Accordion
                  variant="tertiary"
                  title={activeFiltersCountLabel.replace(
                    '%s',
                    String(entries.length)
                  )}
                  id={accordionId}
                  iconPosition="right"
                />
                <Button
                  variant="tertiary"
                  icon={close}
                  onClick={handleClearAll}
                >
                  {clearAllLabel}
                </Button>
              </Flex.Horizontal>

              <Accordion.Content id={accordionId}>
                <ScrollView className="dnb-filter__active-filters__scroll">
                  {tags}
                </ScrollView>
              </Accordion.Content>
            </>
          ) : (
            <>
              <Flex.Horizontal
                className="dnb-filter__active-filters__header"
                justify="space-between"
                align="center"
              >
                <span
                  className="dnb-filter__active-filters__label"
                  aria-hidden
                >
                  {resolvedLabel}
                </span>
                <Button
                  variant="tertiary"
                  icon={close}
                  onClick={handleClearAll}
                >
                  {clearAllLabel}
                </Button>
              </Flex.Horizontal>
              {tags}
            </>
          )}
        </div>
      )}
    </HeightAnimation>
  )
}

export default FilterActiveFilters
