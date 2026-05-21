import { useCallback, useContext, useMemo } from 'react'
import MultiSelection from '../../extensions/forms/Field/MultiSelection/MultiSelection'
import type { MultiSelectionItem } from '../../extensions/forms/Field/MultiSelection/MultiSelection'
import { FilterContext } from './FilterContext'
import FilterItem from './FilterItem'

export type FilterMultiSelectionProps = {
  label: string
  filterKey: string
  defaultOpen?: boolean
  data: MultiSelectionItem[]
}

function FilterMultiSelection({
  label,
  filterKey,
  defaultOpen,
  data,
}: FilterMultiSelectionProps) {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error(
      'Filter.MultiSelection must be used inside a Filter.Container.'
    )
  }

  const prefix = `${filterKey}/`

  // Reconstruct the selected values from individual filter entries
  const currentValue = useMemo(() => {
    const values = Object.keys(context.state.filters)
      .filter((key) => key.startsWith(prefix))
      .map((key) => key.slice(prefix.length))

    return values.length > 0 ? values : undefined
  }, [context.state.filters, prefix])

  const handleChange = useCallback(
    (value: Array<number | string> | undefined) => {
      const prevKeys = Object.keys(context.state.filters).filter((key) =>
        key.startsWith(prefix)
      )

      const nextValues = new Set((value ?? []).map((v) => String(v)))

      // Remove deselected entries
      for (const key of prevKeys) {
        const itemValue = key.slice(prefix.length)
        if (!nextValues.has(itemValue)) {
          context.removeFilter(key)
        }
      }

      // Add newly selected entries
      for (const v of nextValues) {
        const key = `${prefix}${v}`
        if (!context.getFilter(key)) {
          const item = data.find((d) => String(d.value) === v)
          context.setFilter(key, {
            value: v,
            label: item ? String(item.title) : v,
            filterLabel: label,
          })
        }
      }
    },
    [context, prefix, label, data]
  )

  return (
    <FilterItem
      label={label}
      filterKey={filterKey}
      defaultOpen={defaultOpen}
    >
      <MultiSelection
        label={label}
        labelSrOnly
        data={data}
        value={currentValue}
        onChange={handleChange}
        variant="inline"
        showSearchField
      />
    </FilterItem>
  )
}

export default FilterMultiSelection
