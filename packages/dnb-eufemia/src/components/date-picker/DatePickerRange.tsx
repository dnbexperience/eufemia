/**
 * Web DatePicker Component
 *
 */

import React, { useContext } from 'react'

// date-fns
import addMonths from 'date-fns/addMonths'
import subMonths from 'date-fns/subMonths'

import DatePickerCalendar, {
  DatePickerCalendarProps,
} from './DatePickerCalendar'
import DatePickerContext from './DatePickerContext'

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
    onChange?: (...args: any[]) => void
    onNav?: (...args: any[]) => void
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

  function onSelectHandler(args: any) {
    context.callOnChangeHandler(args)

    props.onChange &&
      props.onChange({
        hidePicker: !props.isRange,
        startDate: context.startDate,
        endDate: context.endDate,
        ...args,
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
