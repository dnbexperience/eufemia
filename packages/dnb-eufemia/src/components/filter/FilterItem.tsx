import { useCallback, useContext } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Accordion from '../accordion/Accordion'
import { FilterContext } from './FilterContext'

export type FilterItemProps = {
  label: string
  filterKey: string
  defaultOpen?: boolean
  className?: string
  onOpenChange?: (open: boolean) => void
  children?: ReactNode
}

function FilterItem({
  label,
  filterKey,
  defaultOpen,
  className,
  onOpenChange,
  children,
}: FilterItemProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('Filter.Item must be used inside a Filter.Root.')
  }

  const remembered = context.getAccordionOpen(filterKey)
  const isOpen = remembered ?? defaultOpen ?? false

  const handleChange = useCallback(
    ({ expanded }: { expanded: boolean }) => {
      context.setAccordionOpen(filterKey, expanded)
      onOpenChange?.(expanded)
    },
    [context, filterKey, onOpenChange]
  )

  return (
    <Accordion
      variant="tertiary"
      title={label}
      expanded={isOpen}
      onChange={handleChange}
      className={clsx('dnb-filter__item', className)}
    >
      <div className="dnb-filter__item-content">{children}</div>
    </Accordion>
  )
}

export default FilterItem
