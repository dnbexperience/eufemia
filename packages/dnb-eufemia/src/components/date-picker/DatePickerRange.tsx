/**
 * Web DatePicker Component
 *
 */

import React, { useCallback, useContext } from 'react'

import type { DatePickerCalendarProps } from './DatePickerCalendar'
import DatePickerCalendar from './DatePickerCalendar'
import DatePickerContext from './DatePickerContext'
import type { DatePickerDates } from './hooks/useDates'
import type { DatePickerChangeEvent } from './DatePickerProvider'

export type DatePickerRangeViews = number | Record<string, unknown>[]

export type DatePickerRangeProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onChange'
> &
  DatePickerCalendarProps & {
    id?: string
    isRange?: boolean
    isLink?: boolean
    isSync?: boolean
    onlyMonth?: boolean
    hideNavigation?: boolean
    onPickerChange?: (
      event: DatePickerChangeEvent<
        | React.MouseEvent<HTMLSpanElement>
        | React.KeyboardEvent<HTMLTableElement>
      >
    ) => void
  }

function DatePickerRange({
  onPickerChange,
  ...props
}: DatePickerRangeProps) {
  // Destructured to prevent useCallback from updating on all prop or context changes
  const { views, callOnChangeHandler } = useContext(DatePickerContext)

  const onSelect = useCallback(
    (
      event: DatePickerChangeEvent<
        | React.MouseEvent<HTMLSpanElement>
        | React.KeyboardEvent<HTMLTableElement>
      > &
        DatePickerDates
    ) => {
      callOnChangeHandler(event)

      onPickerChange?.({
        startDate: event.startDate,
        endDate: event.endDate,
        ...event,
      })
    },
    [onPickerChange, callOnChangeHandler]
  )

  return (
    <div className="dnb-date-picker__views">
      {views.map((calendar, i) => (
        <DatePickerCalendar
          key={calendar.nr}
          {...calendar}
          {...props}
          id={`${props.id}-${i}-`}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default DatePickerRange
