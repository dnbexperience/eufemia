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

  // apperance
  link: false,
  pages: 2,
  // pages: [{ nextBtn: false }, { prevBtn: false }],

  // events
  onChange: null, // fires when user makes a selection or navigates
  onNav: null, // [{'id': 0, 'month': Date}, {'id': 1, 'month': Date}]
  onSelect: null // {startDate: Date, endDate: Date | null}
}

class Daterange extends PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps

  state = {}

  componentWillMount = () => {
    const pages = Array.isArray(this.props.pages)
      ? this.props.pages
      : [...Array(this.props.pages)]
    this.setState({
      pages: pages.map((page, i) => ({
        month: addMonths(this.props.month, i),
        ...page,
        id: i
      }))
    })
  }

  emitChange() {
    this.props.onChange &&
      this.props.onChange({
        startDate: this.state.startDate,
        endDate: this.state.endDate,
        pages: this.state.pages
      })
  }

  emitNav() {
    this.props.onNav && this.props.onNav(this.state.pages)
  }

  onSelect = change => {
    this.setState({ ...change }, () => {
      this.props.onSelect &&
        this.props.onSelect({
          startDate: this.state.startDate,
          endDate: this.state.endDate
        })
      this.emitChange()
    })
  }

  onNext = cal => {
    const pages = this.state.pages.map(c => {
      return this.props.link || c.id === cal.id
        ? { ...c, month: addMonths(c.month, 1) }
        : c
    })
    this.setState({ pages }, () => {
      this.emitNav()
      this.emitChange()
    })
  }

  onPrev = cal => {
    const pages = this.state.pages.map(c => {
      return this.props.link || c.id === cal.id
        ? { ...c, month: subMonths(c.month, 1) }
        : c
    })
    this.setState({ pages }, () => {
      this.emitNav()
      this.emitChange()
    })
  }

  onHover = date => {
    this.setState({ hoverDate: date })
  }

  render() {
    return (
      <div className="dnb-date-picker__range">
        {this.state.pages.map(calendar => (
          <DatePickerCalendar
            key={calendar.id}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            {...this.props}
            {...calendar}
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

export default Daterange
