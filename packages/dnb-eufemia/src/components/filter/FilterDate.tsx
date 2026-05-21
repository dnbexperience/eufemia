import { useCallback, useContext } from 'react'
import DatePicker from '../date-picker/DatePicker'
import type { DatePickerProps } from '../date-picker/DatePicker'
import { FilterContext } from './FilterContext'
import { ListContext } from '../list/ListContext'
import FilterItem from './FilterItem'

export type FilterDateProps = {
  label: string
  filterKey?: string
  defaultOpen?: boolean
} & Omit<DatePickerProps, 'onChange' | 'label'>

function FilterDate({
  label,
  filterKey = '/date',
  defaultOpen,
  ...rest
}: FilterDateProps) {
  const context = useContext(FilterContext)
  const listContext = useContext(ListContext)

  if (!context) {
    throw new Error('Filter.Date must be used inside a Filter.Container.')
  }

  const isInsideDialog = listContext !== undefined

  const currentValue = context.getFilter(filterKey)?.value as
    | { from: string; to: string }
    | undefined

  const handleChange = useCallback(
    ({
      startDate,
      endDate,
    }: {
      startDate?: string | null
      endDate?: string | null
    }) => {
      if (!startDate && !endDate) {
        context.removeFilter(filterKey)
        return // stop here
      }

      const parts: string[] = []

      if (startDate) {
        parts.push(startDate)
      }

      if (endDate && endDate !== startDate) {
        parts.push(endDate)
      }

      context.setFilter(filterKey, {
        value: { from: startDate, to: endDate },
        label: parts.join(' – '),
        filterLabel: label,
      })
    },
    [context, filterKey, label]
  )

  const sharedProps = {
    range: true as const,
    ...rest,
    label,
    labelSrOnly: true,
    startDate: currentValue?.from ?? rest.startDate,
    endDate: currentValue?.to ?? rest.endDate,
    onChange: handleChange,
  }

  if (isInsideDialog) {
    return (
      <FilterItem
        label={label}
        filterKey={filterKey}
        defaultOpen={defaultOpen}
      >
        <DatePicker showInput inline {...sharedProps} />
      </FilterItem>
    )
  }

  return (
    <DatePicker
      {...sharedProps}
      triggerProps={{
        text: 'Date',
        variant: 'tertiary',
        iconPosition: 'left',
        ...rest.triggerProps,
      }}
    />
  )
}

export default FilterDate
