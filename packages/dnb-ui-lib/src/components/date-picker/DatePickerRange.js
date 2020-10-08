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
import isSameYear from 'date-fns/isSameYear'
import setDate from 'date-fns/setDate'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import differenceInMonths from 'date-fns/differenceInMonths'

import DatePickerCalendar from './DatePickerCalendar'
import { isDisabled } from './DatePickerCalc'

export default class DatePickerRange extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    month: PropTypes.instanceOf(Date),
    startMonth: PropTypes.instanceOf(Date),
    endMonth: PropTypes.instanceOf(Date),
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),

    range: PropTypes.bool,
    link: PropTypes.bool,
    sync: PropTypes.bool,
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

    // formats
    month: null, // What month will be displayed in the first calendar
    startMonth: null, // What month will be displayed in the first calendar
    endMonth: null, // What month will be displayed in the first calendar
    startDate: null,
    endDate: null,
    minDate: null,
    maxDate: null,

    // appearance
    range: null,
    link: null,
    sync: null,
    onlyMonth: null,
    hideNav: null,
    views: null,
    // views: [{ nextBtn: false }, { prevBtn: false }],

    // events
    onChange: null, // fires when user makes a selection or navigates
    onNav: null, // [{'id': 0, 'month': Date}, {'id': 1, 'month': Date}]
    onSelect: null // {startDate: Date, endDate: Date | null}
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (
        (props.startDate !== state._startDate ||
          props.endDate !== state._endDate) &&
        (!state.views ||
          (typeof props.startDate !== 'undefined' && !state.startDate) ||
          (props.sync &&
            // 1. check if current start state matches with the new start date
            ((props.startDate &&
              state.startDate &&
              (!isSameMonth(props.startDate, state.startDate) ||
                !isSameYear(props.startDate, state.startDate))) ||
              // 2. check if current end state matches with the new end date
              (props.endDate &&
                state.endDate &&
                (!isSameMonth(props.endDate, state.endDate) ||
                  !isSameYear(props.endDate, state.endDate))))))
      ) {
        state.views = DatePickerRange.getViews(props, props.range)
      }

      if (
        typeof props.startDate !== 'undefined' &&
        props.startDate !== state._startDate
      ) {
        state.startDate = props.startDate
      }
      if (
        typeof props.endDate !== 'undefined' &&
        props.endDate !== state._endDate
      ) {
        state.endDate = props.endDate
      }
    }

    state._listenForPropChanges = true
    state._startDate = props.startDate
    state._endDate = props.endDate

    return state
  }

  state = {
    views: null,
    startDate: null,
    endDate: null,
    startMonth: null,
    endMonth: null,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)

    // we need startMonth/endMonth to compare in getDerivedStateFromProps
    if (!props.startMonth) {
      this.state.startMonth = DatePickerRange.getFallbackMonth(props)
    }
    if (!props.endMonth) {
      this.state.endDate =
        this.state.startMonth || DatePickerRange.getFallbackMonth(props)
    }
  }

  static getViews(state, isRange) {
    // fill the views with the calendar data getMonth()
    return (Array.isArray(state.views)
      ? state.views
      : Array(
          isRange
            ? 2 // set default range calendars
            : state.views
        ).fill(1)
    ).map((view, i) => ({
      ...view,
      month: DatePickerRange.getMonth(i, state),
      nr: i
    }))
  }

  static getMonth(viewCount, state) {
    if ((state.startMonth || state.startDate) && viewCount === 0) {
      return state.startMonth || state.startDate
    }
    if ((state.endMonth || state.endDate) && viewCount === 1) {
      return state.endMonth || state.endDate
    }
    return addMonths(DatePickerRange.getFallbackMonth(state), viewCount)
  }

  static getFallbackMonth(state) {
    return state.startMonth || state.startDate || new Date()
  }

  callOnChange({ event = null, ...args } = {}) {
    const { startDate, endDate, views } = this.state
    this.props.onChange &&
      this.props.onChange(
        {
          startDate,
          endDate,
          views,
          event
        },
        {
          hidePicker: !this.props.range,
          callOnlyOnChangeHandler: false,
          ...args
        }
      )
  }

  callOnNav() {
    this.props.onNav && this.props.onNav(this.state.views)
  }

  onSelect = ({ event: e, ...args } = {}) => {
    const event = { ...e } // to make sure we have currentTarget later on
    this.setState({ ...args, _listenForPropChanges: false }, () => {
      const { startDate, endDate } = this.state
      this.props.onSelect &&
        this.props.onSelect({
          startDate,
          endDate,
          event
        })
      this.callOnChange({ event })
    })
  }

  onNext = ({ nr }) => {
    const views = this.state.views.map((c) => {
      if (c.nr === nr) {
        const month = addMonths(c.month, 1)
        this.setState({
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
          _listenForPropChanges: false
        })
        return { ...c, month }
      }
      if (this.props.link && c.nr === 1) {
        const month = addMonths(c.month, 1)
        this.setState({
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month,
          _listenForPropChanges: false
        })
        return { ...c, month }
      }
      return c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onPrev = ({ nr }) => {
    const views = this.state.views.map((c) => {
      if (c.nr === nr) {
        const month = subMonths(c.month, 1)
        this.setState({
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
          _listenForPropChanges: false
        })
        return { ...c, month }
      }
      if (this.props.link && c.nr === 1) {
        const month = subMonths(c.month, 1)
        this.setState({
          [`${nr !== 0 ? 'start' : 'end'}Month`]: month,
          _listenForPropChanges: false
        })
        return { ...c, month }
      }
      return c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onHover = (date) => {
    this.setState({ hoverDate: date, _listenForPropChanges: false })
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
    if (!this.props.range) {
      type = 'start'
    }
    let newDate = this.state[`${type}Date`]

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
        this.state[`${type}Month`] ||
        (this.props.range && nr === 1
          ? addMonths(new Date(), 1)
          : new Date())
    }

    if (newDate === this.state[`${type}Date`]) {
      switch (keyCode) {
        case 'enter':
        case 'space':
          this.callOnChange({
            event,
            hidePicker: true
          })
          break
      }
    } else {
      const state = { _listenForPropChanges: false }

      const currentMonth = this.state[`${type}Month`]

      if (
        // in case we dont have a start/end date, then we use the current month date
        (currentMonth && !this.state[`${type}Date`]) ||
        // if we have a larger gap between the new date and the curent month in the calendar
        (currentMonth &&
          Math.abs(differenceInMonths(newDate, currentMonth)) > 1)
      ) {
        if (!this.props.range) {
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
        !isSameMonth(this.state[`${type}Date`], currentMonth)
      ) {
        state[`${type}Month`] = newDate
      }

      state[`${type}Date`] = newDate

      // set fallbacks
      if (!this.props.range) {
        state.endDate = newDate
      } else {
        if (!this.state.startDate) {
          state.startDate = newDate
        }
        if (!this.state.endDate) {
          state.endDate = newDate
        }
      }

      // make sure we stay on the same month
      if (this.props.onlyMonth || this.props.hideNav) {
        if (
          !isSameMonth(state.startDate, this.state.startDate) ||
          !isSameMonth(state.endDate, this.state.startDate)
        ) {
          return
        }
      }
      if (
        isDisabled(
          state.startDate,
          this.props.minDate,
          this.props.maxDate
        ) ||
        isDisabled(state.endDate, this.props.minDate, this.props.maxDate)
      ) {
        return
      }

      // make sure we also navigate the view
      if (this.props.sync) {
        state.startMonth = state.startDate
        state.endMonth = state.endDate

        state.views = this.state.views
        state.views[nr] = DatePickerRange.getViews(
          { ...this.state, ...state },
          this.props.range
        )[nr]
      }

      this.setState(state, () => {
        // call after state update, so the input get's the latest state as well
        this.callOnChange({
          event,
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
    const { views, startDate, endDate, hoverDate } = this.state
    const { id, ...props } = this.props
    return (
      <div className="dnb-date-picker__views">
        {views.map((calendar, i) => (
          <DatePickerCalendar
            key={calendar.nr}
            id={`${id}-${i}-`}
            {...props}
            {...calendar}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onSelect={this.onSelect}
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
