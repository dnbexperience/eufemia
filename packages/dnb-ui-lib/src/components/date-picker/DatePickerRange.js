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

  state = {
    views: null,
    startDate: null,
    endDate: null,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)

    // fill the views with the calendar data getMonth()
    this.state.views = (Array.isArray(props.views)
      ? props.views
      : Array(
          props.range
            ? 2 // set default range calendars
            : props.views
        ).fill(1)
    ).map((view, i) => ({
      ...view,
      month: this.getMonth(i),
      nr: i
    }))
  }

  getMonth(viewCount) {
    if (
      (this.props.startMonth || this.props.startDate) &&
      viewCount === 0
    ) {
      return this.props.startMonth || this.props.startDate
    }
    if ((this.props.endMonth || this.props.endDate) && viewCount === 1) {
      return this.props.endMonth || this.props.endDate
    }
    return addMonths(
      this.props.month ||
        this.props.startMonth ||
        this.props.startDate ||
        new Date(),
      viewCount
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
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
    return (
      <div className="dnb-date-picker__views">
        {this.state.views.map(calendar => (
          <DatePickerCalendar
            key={calendar.nr}
            {...this.props}
            {...calendar}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            hoverDate={this.state.hoverDate}
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
