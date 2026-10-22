/**
 * Web DatePicker Component
 *
 */

import { useCallback, useContext, useMemo } from 'react'
import type { HTMLProps, MouseEvent, ReactNode } from 'react'
import { convertStringToDate } from './DatePickerCalc'
import Button from '../button/Button'
import DatePickerContext from './DatePickerContext'

type DatePickerShortcutDate =
  | string
  | Date
  | ((...args: unknown[]) => Date)

type DatePickerShortcut = {
  title?: string
  date?: DatePickerShortcutDate
  startDate?: DatePickerShortcutDate
  endDate?: DatePickerShortcutDate
  /**
   * The month to show in the first calendar. Defaults to the month of `startDate`.
   */
  startMonth?: DatePickerShortcutDate
  /**
   * The month to show in the second calendar, in range mode. Defaults to the month of `endDate`. When it is not a later month than `startMonth`, the month after `startMonth` is shown.
   */
  endMonth?: DatePickerShortcutDate
  closeOnSelect?: boolean
}

export type DatePickerAddonProps = HTMLProps<HTMLElement> & {
  /**
   * Gives you the possibility to set predefined dates and date ranges so the user can select these by one click. Define either a JSON or an object with the defined shortcuts. More info is below.
   */
  shortcuts?: Array<DatePickerShortcut> | string
  renderElement?: ReactNode
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
      startDate: startDate,
      endDate: endDate,
    }),
    [startDate, endDate]
  )

  const callOnChange = useCallback(
    ({
      startDate,
      endDate,
      startMonth,
      endMonth,
      event = null,
    }: {
      startDate?: Date
      endDate?: Date
      startMonth?: Date
      endMonth?: Date
      event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    } = {}) => {
      updateDates({
        startDate,
        endDate,
        ...(startMonth && { startMonth }),
        ...(endMonth && { endMonth }),
      })

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
      event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    }) => {
      const startDate = getShortcutDate(
        shortcut.date || shortcut.startDate,
        currentDates
      )
      const endDate = getShortcutDate(shortcut.endDate, currentDates)

      callOnChange({
        startDate,
        endDate: endDate || startDate,
        startMonth: getShortcutDate(shortcut.startMonth, currentDates),
        endMonth: getShortcutDate(shortcut.endMonth, currentDates),
        event,
      })

      if (shortcut.closeOnSelect) {
        hidePicker({ ...event, focusOnClose: true })
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
    return null
  }

  return (
    <div className="dnb-date-picker__addon">
      {renderElement}
      {shortcutElements}
    </div>
  )
}

function getShortcutDate(
  date: DatePickerShortcutDate,
  currentDates: Record<string, Date>
) {
  return typeof date === 'function'
    ? date(currentDates)
    : date
      ? convertStringToDate(date)
      : null
}

export default DatePickerAddon
