import { useCallback, useContext } from 'react'
import Checkbox from '../checkbox/Checkbox'
import { FilterContext } from './FilterContext'
import FilterItem from './FilterItem'

export type FilterSelectionOption = {
  value: string
  label: string
}

export type FilterSelectionProps = {
  label: string
  filterKey: string
  defaultOpen?: boolean
  options: FilterSelectionOption[]
}

function FilterSelection({
  label,
  filterKey,
  defaultOpen,
  options,
}: FilterSelectionProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.Selection must be used inside a Filter.Container.'
    )
  }

  const currentValue =
    (context.getFilter(filterKey)?.value as string[]) ?? []

  const handleChange = useCallback(
    (optionValue: string, checked: boolean) => {
      let next: string[]

      if (checked) {
        next = [...currentValue, optionValue]
      } else {
        next = currentValue.filter((v) => v !== optionValue)
      }

      if (next.length === 0) {
        context.removeFilter(filterKey)
        return // stop here
      }

      const selectedLabels = options
        .filter((opt) => next.includes(opt.value))
        .map((opt) => opt.label)

      context.setFilter(filterKey, {
        value: next,
        label: selectedLabels.join(', '),
        filterLabel: label,
      })
    },
    [context, filterKey, label, options, currentValue]
  )

  return (
    <FilterItem
      label={label}
      filterKey={filterKey}
      defaultOpen={defaultOpen}
    >
      {options.map((option) => (
        <Checkbox
          key={option.value}
          label={option.label}
          checked={currentValue.includes(option.value)}
          onChange={({ checked }) => handleChange(option.value, checked)}
          bottom="x-small"
        />
      ))}
    </FilterItem>
  )
}

export default FilterSelection
