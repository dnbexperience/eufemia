/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import keycode from 'keycode'

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

export const propTypes = {
  id: PropTypes.string,
  month: PropTypes.instanceOf(Date),
  startMonth: PropTypes.instanceOf(Date),
  endMonth: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),

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

export const defaultProps = {
  id: null,

  // formats
  month: null, // What month will be displayed in the first calendar
  startMonth: null, // What month will be displayed in the first calendar
  endMonth: null, // What month will be displayed in the first calendar
  startDate: null,
  endDate: null,

  // apperance
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

export default class DatePickerRange extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (
        props.sync &&
        ((props.startDate &&
          state.startDate &&
          (!isSameMonth(props.startDate, state.startDate) ||
            !isSameYear(props.startDate, state.startDate))) ||
          (props.endDate &&
            state.endDate &&
            (!isSameMonth(props.endDate, state.endDate) ||
              !isSameYear(props.endDate, state.endDate))))
      ) {
        state.views = DatePickerRange.getViews(props)
      }
      if (props.startDate) {
        state.startDate = props.startDate
      }
      if (props.endDate) {
        state.endDate = props.endDate
      }
      if (props.month) {
        state.startMonth = props.month
      }
      if (props.startMonth) {
        state.startMonth = props.startMonth
      }
      if (props.endMonth) {
        state.endMonth = props.endMonth
      }
    }
    state._listenForPropChanges = true
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
    this.state.views = DatePickerRange.getViews(props, props.range)
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
        { hidePicker: false, callOnlyOnChangeHandler: false, ...args }
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
      this.callOnChange({ hidePicker: true, event })
    })
  }

  onNext = ({ nr }) => {
    const views = this.state.views.map(c => {
      if (c.nr === nr) {
        const month = addMonths(c.month, 1)
        this.setState({
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
          _listenForPropChanges: false
        })
        return this.props.link || { ...c, month }
      }
      return this.props.link || c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onPrev = ({ nr }) => {
    const views = this.state.views.map(c => {
      if (c.nr === nr) {
        const month = subMonths(c.month, 1)
        this.setState({
          [`${nr === 0 ? 'start' : 'end'}Month`]: month,
          _listenForPropChanges: false
        })
        return this.props.link || { ...c, month }
      }
      return this.props.link || c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onHover = date => {
    this.setState({ hoverDate: date, _listenForPropChanges: false })
  }

  onKeyDownHandler = (event, ref, nr) => {
    event.persist() // since we use the event after setState
    const keyCode = keycode(event)

    switch (keyCode) {
      case 'left':
      case 'right':
      case 'up':
      case 'down':
        event.preventDefault()
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

    if (newDate !== this.state[`${type}Date`]) {
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
        // if (nr === 1) {
        //   newDate = addMonths(newDate, 1)
        // }
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

      // make sure we also navigate the view
      if (this.props.sync) {
        state.views = this.state.views
        state.views[nr] = DatePickerRange.getViews(
          { ...this.state, ...state },
          this.props.range
        )[nr]
      }

      this.setState(state, () => {
        this.callOnChange({ event })
        if (ref && ref.current) {
          ref.current.focus()
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
