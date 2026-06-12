import { useCallback, useContext, useMemo, useRef } from 'react'
import MultiSelection from '../../extensions/forms/Field/MultiSelection/MultiSelection'
import type {
  FieldMultiSelectionProps,
  MultiSelectionItem,
} from '../../extensions/forms/Field/MultiSelection/MultiSelection'
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
      'Filter.MultiSelection must be used inside a Filter.Root.'
    )
  }

  const { state, replaceFilters } = context

  const filtersRef = useRef(state.filters)
  filtersRef.current = state.filters

  const prefix = `${filterKey}/`

  // Reconstruct the selected values from individual filter entries
  const currentValue = useMemo(() => {
    const values = Object.keys(state.filters)
      .filter((key) => key.startsWith(prefix))
      .map((key) => key.slice(prefix.length))

    return values.length > 0 ? values : undefined
  }, [state.filters, prefix])

  const handleChange = useCallback(
    (value: Array<number | string> | undefined) => {
      const nextValues = Array.from(
        new Set((value ?? []).map((v) => String(v)))
      )

      // Read current filters from ref to avoid stale closure
      const currentFilters = { ...filtersRef.current }

      // Remove all previous entries for this prefix
      for (const key of Object.keys(currentFilters)) {
        if (key.startsWith(prefix)) {
          delete currentFilters[key]
        }
      }

      // Add newly selected entries
      for (const v of nextValues) {
        const key = `${prefix}${v}`
        const item = data.find((d) => String(d.value) === v)
        currentFilters[key] = {
          value: v,
          label: item ? String(item.title) : v,
          categoryLabel: label,
        }
      }

      replaceFilters(currentFilters)
    },
    [replaceFilters, prefix, label, data]
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
        onChange={handleChange as FieldMultiSelectionProps['onChange']}
        variant="inline"
        showSearchField
      />
    </FilterItem>
  )
}

export default FilterMultiSelection
