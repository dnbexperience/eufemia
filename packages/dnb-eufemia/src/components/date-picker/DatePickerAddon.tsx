/**
 * Web DatePicker Component
 *
 */

import React, { useCallback, useContext, useMemo } from 'react'
import { convertStringToDate } from './DatePickerCalc'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'

export type DatePickerShortcut = {
  title?: string
  date?: string | Date | ((...args: unknown[]) => Date)
  start_date?: string | Date | ((...args: unknown[]) => Date)
  end_date?: string | Date | ((...args: unknown[]) => Date)
  close_on_select?: boolean
}

export type DatePickerAddonProps = React.HTMLProps<HTMLElement> & {
  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: Array<DatePickerShortcut> | string
  renderElement?: React.ReactNode
}

function DatePickerAddon(props: DatePickerAddonProps) {
  const {
    updateDates,
    callOnChangeHandler,
    hidePicker,
    startDate,
    endDate,
  } = useContext(DatePickerContext)

  const { shortcuts, renderElement } = props

  const currentDates = useMemo(
    () => ({
      date: startDate,
      start_date: startDate,
      end_date: endDate,
    }),
    [startDate, endDate]
  )

  const callOnChange = useCallback(
    ({
      startDate,
      endDate,
      event = null,
    }: {
      startDate?: Date
      endDate?: Date
      event?: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    } = {}) => {
      updateDates({ startDate, endDate }, undefined, true)
      callOnChangeHandler({
        startDate,
        endDate: endDate || startDate,
        event,
      })
    },
    [updateDates, callOnChangeHandler]
  )

  const setDate = useCallback(
    ({
      shortcut,
      event,
    }: {
      shortcut: DatePickerShortcut
      event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    }) => {
      const start_date = shortcut.date || shortcut.start_date
      const end_date = shortcut.end_date

      const startDate =
        typeof start_date === 'function'
          ? start_date(currentDates)
          : start_date
          ? convertStringToDate(start_date)
          : null

      const endDate =
        typeof end_date === 'function'
          ? end_date(currentDates)
          : end_date
          ? convertStringToDate(end_date)
          : null

      callOnChange({
        startDate,
        endDate: endDate || startDate,
        event,
      })

      if (shortcut.close_on_select) {
        hidePicker(event)
      }
    },
    [callOnChange, currentDates, hidePicker]
  )

  const shortcutsArray: Array<DatePickerShortcut> = useMemo(
    () =>
      shortcuts
        ? typeof shortcuts === 'string'
          ? JSON.parse(shortcuts)
          : shortcuts
        : [],
    [shortcuts]
  )

  const hasShortcuts = shortcutsArray && shortcutsArray.length > 0

  const shortcutElements = useMemo(
    () =>
      hasShortcuts && (
        <>
          {shortcutsArray.map(({ title, ...shortcut }, i: number) => {
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
      ),
    [hasShortcuts, shortcutsArray, setDate]
  )

  if (!hasShortcuts && !renderElement) {
    return <></>
  }

  return (
    <div className="dnb-date-picker__addon">
      {renderElement}
      {shortcutElements}
    </div>
  )
}

export default DatePickerAddon
