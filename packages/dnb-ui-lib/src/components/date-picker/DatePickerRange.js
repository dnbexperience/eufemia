/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

// date-fns
import subMonths from 'date-fns/subMonths'
import addDays from 'date-fns/addDays'
import addWeeks from 'date-fns/addWeeks'
import addMonths from 'date-fns/addMonths'
import isSameMonth from 'date-fns/isSameMonth'
import setDate from 'date-fns/setDate'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import differenceInMonths from 'date-fns/differenceInMonths'

import DatePickerCalendar from './DatePickerCalendar'
import { isDisabled } from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'

export default class DatePickerRange extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    id: PropTypes.string,
    isRange: PropTypes.bool,
    isLink: PropTypes.bool,
    isSync: PropTypes.bool,
    onlyMonth: PropTypes.bool,
    hideNav: PropTypes.bool,
    views: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.object)
    ]),

    onChange: PropTypes.func,
    onNav: PropTypes.func,
    onSelect: PropTypes.func
  }

  static defaultProps = {
    id: null,

    // appearance
    isRange: null,
    isLink: null,
    isSync: null,
    onlyMonth: null,
    hideNav: null,
    views: null,
    // views: [{ nextBtn: false }, { prevBtn: false }],

    // events
    onChange: null, // fires when user makes a selection or navigates
    onNav: null, // [{'id': 0, 'month': Date}, {'id': 1, 'month': Date}]
    onSelect: null // {startDate: Date, endDate: Date | null}
  }

  state = {
    views: null
  }

  callOnChange(args) {
    this.context.callOnChangeHandler(args)

    this.props.onChange &&
      this.props.onChange({
        hidePicker: !this.props.isRange,
        ...args
      })
  }

  callOnNav = () => {
    this.props.onNav && this.props.onNav(this.context.views)
  }

  onSelect = ({ event, ...newDates }, nr) => {
    event.persist()
    if (this.props.isRange && !newDates.endDate) {
      newDates.endDate = undefined
    }
    this.context.setDate(newDates, () => {
      this.props.onSelect &&
        this.props.onSelect({
          ...newDates,
          event
        })
      this.callOnChange({ ...newDates, event, nr })
    })
  }

  setNavState = (state) => {
    this.context.updateState(state)
  }

  onNext = ({ nr }) => {
    const views = this.context.views.map((c) => {
      if (c.nr === nr) {
        const month = addMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr === 0 ? 'start' : 'end'}Month`]: month
        })
        return { ...c, month }
      }
      if (this.props.isLink && c.nr === 1) {
        const month = addMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month
        })
        return { ...c, month }
      }
      return c
    })
    this.context.setViews(views, this.callOnNav)
  }

  onPrev = ({ nr }) => {
    const views = this.context.views.map((c) => {
      if (c.nr === nr) {
        const month = subMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr === 0 ? 'start' : 'end'}Month`]: month
        })
        return { ...c, month }
      }
      if (this.props.isLink && c.nr === 1) {
        const month = subMonths(c.month, 1)
        this.setNavState({
          nr,
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month
        })
        return { ...c, month }
      }
      return c
    })
    this.context.setViews(views, this.callOnNav)
  }

  onHover = (hoverDate) => {
    this.context.updateState({ hoverDate })
  }

  onKeyDownHandler = (event, ref, nr) => {
    const keyCode = keycode(event)

    // only continue of key is one of these
    switch (keyCode) {
      case 'enter':
      case 'space':
      case 'left':
      case 'right':
      case 'up':
      case 'down':
        event.preventDefault()
        event.persist() // since we use the event after setState
        break
      default:
        return
    }

    let type = nr === 0 ? 'start' : 'end'
    if (!this.props.isRange) {
      type = 'start'
    }
    let newDate = this.context[`${type}Date`]

    if (newDate) {
      // only to process key up and down press
      switch (keyCode) {
        case 'left':
          newDate = addDays(newDate, -1)
          break
        case 'right':
          newDate = addDays(newDate, 1)
          break
        case 'up':
          newDate = addWeeks(newDate, -1)
          break
        case 'down':
          newDate = addWeeks(newDate, 1)
          break
      }
    } else {
      // use the date picker month, if provided
      newDate =
        this.context[`${type}Month`] ||
        (this.props.isRange && nr === 1
          ? addMonths(new Date(), 1)
          : new Date())
    }

    if (newDate === this.context[`${type}Date`]) {
      switch (keyCode) {
        case 'enter':
        case 'space':
          this.callOnChange({
            event,
            nr,
            hidePicker: true
          })
          break
      }
    } else {
      const state = {}

      const currentMonth = this.context[`${type}Month`]

      if (
        // in case we dont have a start/end date, then we use the current month date
        (currentMonth && !this.context[`${type}Date`]) ||
        // if we have a larger gap between the new date and the curent month in the calendar
        (currentMonth &&
          Math.abs(differenceInMonths(newDate, currentMonth)) > 1)
      ) {
        if (!this.props.isRange) {
          newDate = currentMonth
        } else {
          newDate =
            nr === 0
              ? setDate(currentMonth, 1)
              : lastDayOfMonth(currentMonth)
        }
        // only to make sure we navigate the calendar to the new date
      } else if (
        currentMonth &&
        !isSameMonth(this.context[`${type}Date`], currentMonth)
      ) {
        state[`${type}Month`] = newDate
      }

      state[`${type}Date`] = newDate

      // set fallbacks
      if (!this.props.isRange) {
        state.endDate = newDate
      } else {
        if (!this.context.startDate) {
          state.startDate = newDate
        }
        if (!this.context.endDate) {
          state.endDate = newDate
        }
      }

      // make sure we stay on the same month
      if (this.props.onlyMonth || this.props.hideNav) {
        if (
          !isSameMonth(state.startDate, this.context.startDate) ||
          !isSameMonth(state.endDate, this.context.startDate)
        ) {
          return
        }
      }
      if (
        isDisabled(
          state.startDate,
          this.context.minDate,
          this.context.maxDate
        ) ||
        isDisabled(
          state.endDate,
          this.context.minDate,
          this.context.maxDate
        )
      ) {
        return
      }

      state.changeMonthViews = true

      this.context.setDate(state, () => {
        // call after state update, so the input get's the latest state as well
        this.callOnChange({
          event,
          nr,
          hidePicker: false
        })

        // and set the focus back again
        if (ref && ref.current) {
          ref.current.focus({ preventScroll: true })
        }
      })
    }
  }

  render() {
    const { id, ...props } = this.props
    return (
      <div className="dnb-date-picker__views">
        {this.context.views.map((calendar, i) => (
          <DatePickerCalendar
            key={calendar.nr}
            id={`${id}-${i}-`}
            {...props}
            {...calendar}
            onSelect={(args) => this.onSelect(args, calendar.nr)}
            onHover={this.onHover}
            onPrev={this.onPrev}
            onNext={this.onNext}
            onKeyDown={this.onKeyDownHandler}
          />
        ))}
      </div>
    )
  }
}

export const getViews = (state, isRange) => {
  // fill the views with the calendar data getMonth()
  return (Array.isArray(state.views)
    ? state.views
    : Array(
        isRange
          ? 2 // set default range calendars
          : state.views
      ).fill(1)
  ).map((view, nr) => ({
    ...view,
    month: getMonthView(state, nr),
    nr
  }))
}

const getMonthView = (state, nr) => {
  if ((state.startMonth || state.startDate) && nr === 0) {
    return state.startMonth || state.startDate
  }
  if ((state.endMonth || state.endDate) && nr === 1) {
    return state.endMonth || state.endDate
  }

  // Here we add that default offset to every new calendar added,
  // the first will get 0, the next one 1, and so forth
  return addMonths(getFallbackMonth(state), nr)
}

const getFallbackMonth = (state) => {
  return state.startMonth || state.startDate || new Date()
}
