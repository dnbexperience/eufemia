/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { convertStringToDate } from './DatePickerCalc'
import ToggleButton from '../toggle-button/ToggleButton'
import DatePickerContext from './DatePickerContext'

export default class DatePickerAddon extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    shortcuts: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    renderElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    shortcuts: null,
    renderElement: null
  }

  state = {
    currentShortcut: null,
    _listenForPropChanges: true
  }

  setDate({ value, event }) {
    this.setState({
      currentShortcut: value,
      _listenForPropChanges: false
    })

    const start_date = value.date || value.start_date
    const end_date = value.end_date
    const startDate =
      typeof start_date === 'function'
        ? start_date(this.getCurrentDates())
        : start_date
        ? convertStringToDate(start_date)
        : null
    const endDate =
      typeof end_date === 'function'
        ? end_date(this.getCurrentDates())
        : end_date
        ? convertStringToDate(end_date)
        : null

    this.callOnChange({
      startDate,
      endDate: endDate || startDate,
      event
    })

    if (value.close_on_select) {
      this.context.hidePicker(event)
    }
  }

  getCurrentDates() {
    const { startDate, endDate } = this.context
    return {
      date: startDate,
      start_date: startDate,
      end_date: endDate
    }
  }

  callOnChange({ startDate, endDate, event = null } = {}) {
    this.context.setDate({ startDate, endDate, changeMonthViews: true })
    this.context.callOnChangeHandler({ startDate, endDate, event })
  }

  render() {
    const { shortcuts, renderElement } = this.props

    const shortcutsArray = shortcuts
      ? typeof shortcuts === 'string'
        ? JSON.parse(shortcuts)
        : shortcuts
      : []
    const hasShortcuts = shortcutsArray && shortcutsArray.length > 0

    if (!hasShortcuts && !renderElement) {
      return <></>
    }

    const shortcutElements = hasShortcuts && (
      <ToggleButton.Group
        value={this.state.currentShortcut}
        on_change={({ value, event }) => this.setDate({ value, event })}
      >
        {shortcutsArray.map(({ title, ...rest }, i) => (
          <ToggleButton key={i} text={title} value={rest} />
        ))}
      </ToggleButton.Group>
    )

    return (
      <div className="dnb-date-picker__addon">
        {renderElement}
        {shortcutElements}
      </div>
    )
  }
}
