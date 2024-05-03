/**
 * Web DatePicker Component
 *
 */

import React, { useContext } from 'react'
import { convertStringToDate } from './DatePickerCalc'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'

export type DatePickerShortcut = {
  title?: string
  date?: string | Date | ((...args: unknown[]) => Date | string)
  start_date?: string | Date | ((...args: unknown[]) => Date | string)
  end_date?: string | Date | ((...args: unknown[]) => Date | string)
  close_on_select?: boolean
}

export type DatePickerAddonProps = React.HTMLProps<HTMLElement> & {
  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: Array<DatePickerShortcut>
  renderElement?: React.ReactNode
}

function DatePickerAddon(props) {
  const context = useContext(DatePickerContext)

  function setDate({ shortcut, event }) {
    const start_date = shortcut.date || shortcut.start_date
    const end_date = shortcut.end_date

    const startDate =
      typeof start_date === 'function'
        ? start_date(getCurrentDates())
        : start_date
        ? convertStringToDate(start_date)
        : null
    const endDate =
      typeof end_date === 'function'
        ? end_date(getCurrentDates())
        : end_date
        ? convertStringToDate(end_date)
        : null

    callOnChange({
      startDate,
      endDate: endDate || startDate,
      event,
    })

    if (shortcut.close_on_select) {
      context.hidePicker(event)
    }
  }

  function getCurrentDates() {
    const { startDate, endDate } = context
    return {
      date: startDate,
      start_date: startDate,
      end_date: endDate,
    }
  }

  function callOnChange({
    startDate,
    endDate,
    event = null,
  }: {
    startDate?: string | Date
    endDate?: string | Date
    event?: React.ChangeEvent<HTMLElement>
  } = {}) {
    context.updateDates({ startDate, endDate })
    context.callOnChangeHandler({ startDate, endDate, event })
  }

  const { shortcuts, renderElement } = props

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
            onClick={(event) => setDate({ shortcut, event })}
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

export default DatePickerAddon
