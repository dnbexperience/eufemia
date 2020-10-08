/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import isSameDay from 'date-fns/isSameDay'
import { convertStringToDate } from './DatePickerCalc'
import ToggleButton from '../toggle-button/ToggleButton'

export default class DatePickerAddon extends React.PureComponent {
  static propTypes = {
    shortcuts: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    renderElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    onChange: PropTypes.func
  }

  static defaultProps = {
    shortcuts: null,
    renderElement: null,
    startDate: null,
    endDate: null,
    onChange: null
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      // to reset all toggle buttons
      if (
        props.startDate &&
        !isSameDay(props.startDate, state.startDate)
      ) {
        state.currentShortcut = null
      }

      // add theese as cached
      state.startDate = props.startDate
      state.endDate = props.endDate
    }
    state._listenForPropChanges = true
    return state
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

    this.setState({
      startDate,
      endDate: endDate || startDate
    })

    this.callOnChange({
      startDate,
      endDate: endDate || startDate,
      event
    })
  }

  getCurrentDates() {
    const { startDate, endDate } = this.props
    return {
      date: startDate,
      start_date: startDate,
      end_date: endDate
    }
  }

  callOnChange({ startDate, endDate, event = null, ...args } = {}) {
    if (this.props.onChange) {
      this.props.onChange(
        {
          date: startDate,
          startDate,
          endDate,
          event
        },
        { hidePicker: false, callOnlyOnChangeHandler: false, ...args }
      )
    }
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
