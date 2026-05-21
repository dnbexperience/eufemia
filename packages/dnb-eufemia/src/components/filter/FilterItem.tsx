import { useCallback, useContext } from 'react'
import type { ReactNode } from 'react'
import List from '../list/List'
import { FilterContext } from './FilterContext'

export type FilterItemProps = {
  label: string
  filterKey: string
  defaultOpen?: boolean
  className?: string
  children?: ReactNode
}

function FilterItem({
  label,
  filterKey,
  defaultOpen,
  children,
}: FilterItemProps) {
  const context = useContext(FilterContext)

  const remembered = context?.getAccordionOpen(filterKey)
  const isOpen = remembered ?? defaultOpen ?? false

  const handleChange = useCallback(
    ({ expanded }: { expanded: boolean }) => {
      context?.setAccordionOpen(filterKey, expanded)
    },
    [context, filterKey]
  )

  return (
    <List.Item.Accordion
      title={label}
      open={isOpen}
      onChange={handleChange}
    >
      <List.Item.Accordion.Content innerSpace>
        {children}
      </List.Item.Accordion.Content>
    </List.Item.Accordion>
  )
}

export default FilterItem
