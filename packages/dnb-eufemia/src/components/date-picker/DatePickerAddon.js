/**
 * Web DatePicker Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { convertStringToDate } from './DatePickerCalc'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'

export default class DatePickerAddon extends React.PureComponent {
  static contextType = DatePickerContext

  static propTypes = {
    shortcuts: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
    renderElement: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  }

  static defaultProps = {
    shortcuts: null,
    renderElement: null,
  }

  state = {
    _listenForPropChanges: true,
  }

  setDate({ shortcut, event }) {
    this.setState({
      _listenForPropChanges: false,
    })

    const start_date = shortcut.date || shortcut.start_date
    const end_date = shortcut.end_date
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
      event,
    })

    if (shortcut.close_on_select) {
      this.context.hidePicker(event)
    }
  }

  getCurrentDates() {
    const { startDate, endDate } = this.context
    return {
      date: startDate,
      start_date: startDate,
      end_date: endDate,
    }
  }

  callOnChange({ startDate, endDate, event = null } = {}) {
    this.context.updateState({
      startDate,
      endDate,
      changeMonthViews: true,
    })
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
      <>
        {shortcutsArray.map(({ title, ...shortcut }, i) => {
          return (
            <Button
              key={i}
              text={title}
              variant="secondary"
              onClick={(event) => this.setDate({ shortcut, event })}
            />
          )
        })}
      </>
    )

    return (
      <div className="dnb-date-picker__addon">
        {renderElement}
        {shortcutElements}
      </div>
    )
  }
}
