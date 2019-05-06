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
  pages: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.object)
  ]),

  onChange: PropTypes.func,
  onNav: PropTypes.func,
  onSelect: PropTypes.func
}

export const defaultProps = {
  // formats
  month: new Date(), // What month will be displayed in the first calendar. Default: new Date()
  startDate: null,
  endDate: null,

  // apperance
  range: null,
  link: null,
  pages: null,
  // pages: [{ nextBtn: false }, { prevBtn: false }],

  // events
  onChange: null, // fires when user makes a selection or navigates
  onNav: null, // [{'id': 0, 'month': Date}, {'id': 1, 'month': Date}]
  onSelect: null // {startDate: Date, endDate: Date | null}
}

export default class DatePickerRange extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {
    pages: null,
    startDate: null,
    endDate: null,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)

    let pagesCount = props.pages
    if (pagesCount === null && props.range) {
      pagesCount = 2
    }

    this.state.pages = Array.isArray(props.pages)
      ? props.pages
      : Array(pagesCount)
          .fill(1)
          .map((page, i) => ({
            month: addMonths(props.month, i),
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
        pages: this.state.pages
      })
  }

  callOnNav() {
    this.props.onNav && this.props.onNav(this.state.pages)
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
    const pages = this.state.pages.map(c => {
      return this.props.link || c.id === id
        ? { ...c, month: addMonths(c.month, 1) }
        : c
    })
    this.setState({ pages, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onPrev = ({ id }) => {
    const pages = this.state.pages.map(c => {
      return this.props.link || c.id === id
        ? { ...c, month: subMonths(c.month, 1) }
        : c
    })
    this.setState({ pages, _listenForPropChanges: false }, () => {
      this.callOnNav()
    })
  }

  onHover = date => {
    this.setState({ hoverDate: date, _listenForPropChanges: false })
  }

  render() {
    return (
      <div className="dnb-date-picker__range">
        {this.state.pages.map(calendar => (
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
