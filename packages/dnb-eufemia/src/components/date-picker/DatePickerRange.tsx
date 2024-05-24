/**
 * Web DatePicker Component
 *
 */

import React, { useContext } from 'react'

// date-fns
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

import DatePickerCalendar, {
  CalendarSelectEvent,
  DatePickerCalendarProps,
} from './DatePickerCalendar'
import DatePickerContext, { DatePickerView } from './DatePickerContext'

export type DatePickerRangeViews = number | Record<string, unknown>[]

export type DatePickerRangeProps = React.HTMLProps<HTMLElement> &
  DatePickerCalendarProps & {
    id?: string
    isRange?: boolean
    isLink?: boolean
    isSync?: boolean
    onlyMonth?: boolean
    hideNav?: boolean
    views?: [{ nextBtn: false; prevBtn: false }]
    onChange?: (event: CalendarSelectEvent) => void
    onNav?: (views: Array<DatePickerView>) => void
  }

function DatePickerRange(props: DatePickerRangeProps) {
  const context = useContext(DatePickerContext)

  return (
    <div className="dnb-date-picker__views">
      {context.views.map((calendar, i) => (
        <DatePickerCalendar
          key={calendar.nr}
          {...calendar}
          {...props}
          id={`${props.id}-${i}-`}
          onSelect={onSelectHandler}
          onHover={onHover}
          onPrev={onPrev}
          onNext={onNext}
        />
      ))}
    </div>
  )

  function onSelectHandler(event: CalendarSelectEvent) {
    context.callOnChangeHandler(event)

    props.onChange?.({
      hidePicker: !props.isRange,
      startDate: context.startDate,
      endDate: context.endDate,
      ...event,
    })
  }

  function callOnNav() {
    props.onNav && props.onNav(context.views)
  }

  function setNavState(state) {
    context.updateState(state)
  }

  function onNext({ nr }) {
    const views = context.views.map((c) => {
      if (c.nr === nr) {
        const month = addMonths(c.month, 1)
        setNavState({
          nr,
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      if (props.isLink && c.nr === 1) {
        const month = addMonths(c.month, 1)
        setNavState({
          nr,
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      return c
    })
    context.setViews(views, callOnNav)
  }

  function onPrev({ nr }) {
    const views = context.views.map((c) => {
      if (c.nr === nr) {
        const month = subMonths(c.month, 1)
        setNavState({
          nr,
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      if (props.isLink && c.nr === 1) {
        const month = subMonths(c.month, 1)
        setNavState({
          nr,
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month,
        })
        return { ...c, month }
      }
      return c
    })
    context.setViews(views, callOnNav)
  }

  function onHover(hoverDate) {
    context.updateDates({ hoverDate })
  }
}

export default DatePickerRange
