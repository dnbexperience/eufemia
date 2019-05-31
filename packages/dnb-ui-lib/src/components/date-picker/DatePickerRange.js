/**
 * Web DatePicker Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { subMonths, addMonths } from 'date-fns'
import DatePickerCalendar from './DatePickerCalendar'

export const propTypes = {
  month: PropTypes.instanceOf(Date),
  startMonth: PropTypes.instanceOf(Date),
  endMonth: PropTypes.instanceOf(Date),
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),

  range: PropTypes.bool,
  link: PropTypes.bool,
  sync: PropTypes.bool,
  views: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object)
  ]),

  onChange: PropTypes.func,
  onNav: PropTypes.func,
  onSelect: PropTypes.func
}

export const defaultProps = {
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
          (props.startDate.getMonth() !== state.startDate.getMonth() ||
            props.startDate.getFullYear() !==
              state.startDate.getFullYear())) ||
          (props.endDate &&
            state.endDate &&
            (props.endDate.getMonth() !== state.endDate.getMonth() ||
              props.endDate.getFullYear() !==
                state.endDate.getFullYear())))
      ) {
        state.views = DatePickerRange.getViews(props)
      }
      if (props.startDate) {
        state.startDate = props.startDate
      }
      if (props.endDate) {
        state.endDate = props.endDate
      }
    }
    state._listenForPropChanges = true
    return state
  }

  state = {
    views: null,
    startDate: null,
    endDate: null,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)
    this.state.views = DatePickerRange.getViews(props)
  }

  static getViews(props) {
    // fill the views with the calendar data getMonth()
    return (Array.isArray(props.views)
      ? props.views
      : Array(
          props.range
            ? 2 // set default range calendars
            : props.views
        ).fill(1)
    ).map((view, i) => ({
      ...view,
      month: DatePickerRange.getMonth(i, props),
      nr: i
    }))
  }

  static getMonth(viewCount, props) {
    if ((props.startMonth || props.startDate) && viewCount === 0) {
      return props.startMonth || props.startDate
    }
    if ((props.endMonth || props.endDate) && viewCount === 1) {
      return props.endMonth || props.endDate
    }
    return addMonths(
      props.month || props.startMonth || props.startDate || new Date(),
      viewCount
    )
  }

  callOnChange() {
    const { startDate, endDate, views } = this.state
    this.props.onChange &&
      this.props.onChange({
        startDate,
        endDate,
        views
      })
  }

  callOnNav() {
    this.props.onNav && this.props.onNav(this.state.views)
  }

  onSelect = change => {
    this.setState({ ...change, _listenForPropChanges: false }, () => {
      const { startDate, endDate } = this.state
      this.props.onSelect &&
        this.props.onSelect({
          startDate,
          endDate
        })
      this.callOnChange()
    })
  }

  onNext = ({ nr }) => {
    const views = this.state.views.map(c => {
      return this.props.link || c.nr === nr
        ? { ...c, month: addMonths(c.month, 1) }
        : c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onPrev = ({ nr }) => {
    const views = this.state.views.map(c => {
      return this.props.link || c.nr === nr
        ? { ...c, month: subMonths(c.month, 1) }
        : c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onHover = date => {
    this.setState({ hoverDate: date, _listenForPropChanges: false })
  }

  render() {
    const { views, startDate, endDate, hoverDate } = this.state
    return (
      <div className="dnb-date-picker__views">
        {views.map(calendar => (
          <DatePickerCalendar
            key={calendar.nr}
            {...this.props}
            {...calendar}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onSelect={this.onSelect}
            onHover={this.onHover}
            onPrev={this.onPrev}
            onNext={this.onNext}
          />
        ))}
      </div>
    )
  }
}
