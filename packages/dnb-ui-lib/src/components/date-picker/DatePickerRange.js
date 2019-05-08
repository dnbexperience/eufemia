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

    let viewsCount = props.views
    if (viewsCount === null && props.range) {
      viewsCount = 2
    }

    const startupMonth = props.month || props.startDate

    this.state.views = Array.isArray(props.views)
      ? props.views
      : Array(viewsCount)
          .fill(1)
          .map((page, i) => ({
            month: addMonths(startupMonth, i),
            ...page,
            id: i
          }))
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
    this.props.onChange &&
      this.props.onChange({
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        views: this.state.views
      })
  }

  callOnNav() {
    this.props.onNav && this.props.onNav(this.state.views)
  }

  onSelect = change => {
    this.setState({ ...change, _listenForPropChanges: false }, () => {
      this.props.onSelect &&
        this.props.onSelect({
          startDate: this.state.startDate,
          endDate: this.state.endDate
        })
      this.callOnChange()
    })
  }

  onNext = ({ id }) => {
    const views = this.state.views.map(c => {
      return this.props.link || c.id === id
        ? { ...c, month: addMonths(c.month, 1) }
        : c
    })
    this.setState({ views, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onPrev = ({ id }) => {
    const views = this.state.views.map(c => {
      return this.props.link || c.id === id
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
            key={calendar.id}
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
