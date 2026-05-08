/**
 * Web DatePicker Component
 *
 */

import { useCallback, useContext } from 'react'
import type { HTMLProps, KeyboardEvent, MouseEvent } from 'react'

import type { DatePickerCalendarProps } from './DatePickerCalendar'
import DatePickerCalendar from './DatePickerCalendar'
import DatePickerContext from './DatePickerContext'
import type { DatePickerDates } from './hooks/useDates'
import type { DatePickerChangeEvent } from './DatePickerProvider'

export type DatePickerRangeViews = number | Record<string, unknown>[]

export type DatePickerRangeProps = Omit<
  HTMLProps<HTMLElement>,
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
        MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLTableElement>
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
        MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLTableElement>
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
          // @ts-expect-error - strictFunctionTypes
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

export default DatePickerRange
