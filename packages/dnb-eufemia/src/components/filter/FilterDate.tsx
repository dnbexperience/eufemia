import { useCallback, useContext, useMemo } from 'react'
import DatePicker from '../date-picker/DatePicker'
import type { DatePickerProps } from '../date-picker/DatePicker'
import { FilterContext, FilterItemContext } from './FilterContext'
import FilterItem from './FilterItem'
import SharedContext from '../../shared/Context'
import useMedia from '../../shared/useMedia'
import formatDateRange from './utils/formatDateRange'

export type FilterDateProps = {
  label?: string
  filterKey?: string
  defaultOpen?: boolean
} & Omit<DatePickerProps, 'onChange' | 'label'>

function FilterDate({
  label: labelProp,
  filterKey = 'date',
  defaultOpen,
  ...rest
}: FilterDateProps) {
  const context = useContext(FilterContext)
  const sharedContext = useContext(SharedContext)
  const { dateLabel } = sharedContext.getTranslation({}).Filter
  const label = labelProp ?? dateLabel

  if (!context) {
    throw new Error('Filter.Date must be used inside a Filter.Root.')
  }

  const { removeFilter, setFilter, getFilter } = context

  const currentValue = getFilter(filterKey)?.value as
    | { from: string; to: string }
    | undefined

  const { dateFormat: defaultDateFormat } =
    sharedContext.translation.DatePicker
  const dateFormat = rest.dateFormat ?? defaultDateFormat

  const handleChange = useCallback(
    ({
      startDate,
      endDate,
    }: {
      startDate?: string | null
      endDate?: string | null
    }) => {
      if (!startDate && !endDate) {
        removeFilter(filterKey)
        return // stop here
      }

      setFilter(filterKey, {
        value: { from: startDate, to: endDate },
        label: formatDateRange(startDate, endDate, dateFormat),
        categoryLabel: label,
      })
    },
    [removeFilter, setFilter, filterKey, label, dateFormat]
  )

  const sharedProps = {
    range: true as const,
    ...rest,
    label,
    labelSrOnly: true,
    startDate: currentValue?.from ?? rest.startDate ?? null,
    endDate: currentValue?.to ?? rest.endDate ?? null,
    onChange: handleChange,
  }

  const itemContext = useContext(FilterItemContext)
  const { isSmall } = useMedia()

  const description = useMemo(
    () =>
      formatDateRange(currentValue?.from, currentValue?.to, dateFormat),
    [currentValue, dateFormat]
  )

  const datePickerProps = {
    rangeSingleCalendar: true as const,
    ...sharedProps,
    triggerProps: {
      text: label,
      variant: 'tertiary' as const,
      iconPosition: 'left' as const,
      ...rest.triggerProps,
    },
  }

  if (itemContext) {
    return (
      <FilterItem
        label={label}
        filterKey={filterKey}
        defaultOpen={defaultOpen}
      >
        {isSmall ? (
          <>
            <DatePicker {...datePickerProps} triggerProps={undefined} />
            {description}
          </>
        ) : (
          <DatePicker showInput inline {...datePickerProps} />
        )}
      </FilterItem>
    )
  }

  return <DatePicker {...datePickerProps} />
}

export default FilterDate
