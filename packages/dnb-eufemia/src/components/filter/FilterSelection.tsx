import { useCallback, useContext, useMemo } from 'react'
import Checkbox from '../checkbox/Checkbox'
import Flex from '../flex/Flex'
import { FilterContext } from './FilterContext'
import FilterItem from './FilterItem'

export type FilterSelectionItem = {
  value: string
  label: string
}

export type FilterSelectionProps = {
  label: string
  filterKey: string
  defaultOpen?: boolean
  data: FilterSelectionItem[]
}

function FilterSelection({
  label,
  filterKey,
  defaultOpen,
  data: options,
}: FilterSelectionProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('Filter.Selection must be used inside a Filter.Root.')
  }

  const { state, setFilter, removeFilter } = context

  const prefix = `${filterKey}/`

  const currentValue = useMemo(() => {
    return Object.keys(state.filters)
      .filter((key) => key.startsWith(prefix))
      .map((key) => key.slice(prefix.length))
  }, [state.filters, prefix])

  const handleChange = useCallback(
    (optionValue: string, checked: boolean) => {
      const key = `${prefix}${optionValue}`

      if (checked) {
        const option = options.find((opt) => opt.value === optionValue)
        setFilter(key, {
          value: optionValue,
          label: option?.label ?? optionValue,
          categoryLabel: label,
        })
      } else {
        removeFilter(key)
      }
    },
    [setFilter, removeFilter, prefix, label, options]
  )

  return (
    <FilterItem
      label={label}
      filterKey={filterKey}
      defaultOpen={defaultOpen}
    >
      <Flex.Vertical gap="small">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={currentValue.includes(option.value)}
            onChange={({ checked }) => handleChange(option.value, checked)}
          />
        ))}
      </Flex.Vertical>
    </FilterItem>
  )
}

export default FilterSelection
