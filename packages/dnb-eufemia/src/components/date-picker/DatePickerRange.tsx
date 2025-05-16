/**
 * Web DatePicker Component
 *
 */

import React, { useCallback, useContext } from 'react'

import DatePickerCalendar, {
  DatePickerCalendarProps,
} from './DatePickerCalendar'
import DatePickerContext from './DatePickerContext'
import { DatePickerDates } from './hooks/useDates'
import { DatePickerChangeEvent } from './DatePickerProvider'

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
    hideNav?: boolean
    // TODO: Rename this, as it has nothing to do with the views, and it's only used to set the display condition for the naviation buttons
    views?: [{ nextBtn: false; prevBtn: false }]
    onChange?: (
      event: DatePickerChangeEvent<
        | React.MouseEvent<HTMLSpanElement>
        | React.KeyboardEvent<HTMLTableElement>
      >
    ) => void
  }

function DatePickerRange(props: DatePickerRangeProps) {
  // Destructured to prevent useCallback from updating on all prop or context changes
  const { onChange, isRange } = props
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

      onChange?.({
        hidePicker: !isRange,
        startDate: event.startDate,
        endDate: event.endDate,
        ...event,
      })
    },
    [isRange, onChange, callOnChangeHandler]
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
