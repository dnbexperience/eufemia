/**
 * Web DatePicker Component
 *
 */

import { useCallback, useContext, useEffect, useMemo, useRef } from 'react'
import type {
  ElementRef,
  HTMLProps,
  KeyboardEvent,
  MouseEvent,
  RefObject,
} from 'react'
import { clsx } from 'clsx'
import useMountEffect from '../../shared/helpers/useMountEffect'

// date-fns
import {
  format,
  addMonths,
  addWeeks,
  addDays,
  isSameDay,
  isSameMonth,
  startOfDay,
  differenceInCalendarDays,
  differenceInMonths,
  setDate,
} from 'date-fns'

import {
  isDisabled,
  makeDayObject,
  toRange,
  getWeek,
  dayOffset,
  getCalendar,
} from './DatePickerCalc'
import type { ButtonProps } from '../button/Button'
import Button from '../button/Button'
import type { DatePickerContextValue } from './DatePickerContext'
import DatePickerContext from './DatePickerContext'
import type { InternalLocale } from '../../shared/Context'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import type { DatePickerChangeEvent } from './DatePickerProvider'
import type { DatePickerDates } from './hooks/useDates'
import type { CalendarNavButtonProps } from './DatePickerCalendarNavigator'
import { DatePickerCalendarNav } from './DatePickerCalendarNavigator'
import { formatDate } from '../date-format/DateFormatUtils'

export type DatePickerCalendarDay = {
  date: Date
  isDisabled?: boolean
  isEndDate?: boolean
  isInactive?: boolean
  isLastMonth?: boolean
  isNextMonth?: boolean
  isPreview?: boolean
  isSelectable?: boolean
  isStartDate?: boolean
  isToday?: boolean
  isWithinSelection?: boolean
  className?: string
}

export type DatePickerCalendarNavigationEvent = {
  nr: number
  type?: CalendarNavButtonProps['type']
}

export type DatePickerCalendarProps = Omit<
  HTMLProps<HTMLElement>,
  'onSelect' | 'onChange'
> & {
  id?: string
  nr?: number
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `startDate`.
   */
  month?: Date
  hoverDate?: Date
  firstDayOfWeek?: string
  hideNavigation?: boolean
  hideDays?: boolean
  onlyMonth?: boolean
  hideMonthLabel?: boolean
  hideNextMonthWeek?: boolean
  onSelect?: (
    event: DatePickerChangeEvent<
      | MouseEvent<HTMLSpanElement>
      | KeyboardEvent<HTMLTableElement | HTMLButtonElement>
    >
  ) => void
  onKeyDown?: (
    event: KeyboardEvent<HTMLTableElement | HTMLButtonElement>,
    tableRef: RefObject<HTMLTableElement>,
    nr: number
  ) => void
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` locale object, like `import { enGB } from 'date-fns/locale/en-GB'`. Defaults to `nb-NO`.
   */
  locale?: InternalLocale
  rtl?: boolean
  isRange?: boolean
  resetDate?: boolean
}

type DayObject = {
  date: Date
  isToday: boolean
  isLastMonth: boolean
  isNextMonth: boolean
  isStartDate: boolean
  isEndDate: boolean
  isWithinSelection: boolean
  isPreview: boolean
  isDisabled: boolean
  isSelectable: boolean
  isInactive: boolean
  className?: string
}

const datePickerCalendarDefaultProps: DatePickerCalendarProps = {
  hideNavigation: false,
  hideDays: false,
  onlyMonth: false,
  hideMonthLabel: false,
  hideNextMonthWeek: false,
  rtl: false,
  resetDate: true,
}

const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const keysToHandle = ['Enter', 'Space', ...arrowKeys]

function DatePickerCalendar(restOfProps: DatePickerCalendarProps) {
  const props = { ...datePickerCalendarDefaultProps, ...restOfProps }

  const {
    updateDates,
    setHasClickedCalendarDay,
    startDate,
    endDate,
    maxDate,
    minDate,
    startMonth,
    endMonth,
    hoverDate,
    setHoverDate,
    setSubmittedDates,
    views,
    setViews,
    props: { onDaysRender, yearNavigation },
    translation: {
      DatePicker: { firstDay: defaultFirstDayOfWeek, selectedMonth },
    },
  } = useContext(DatePickerContext)

  const {
    id,
    nr,
    rtl,
    month,
    isRange,
    firstDayOfWeek = defaultFirstDayOfWeek,
    hideNavigation,
    locale,
    hideDays,
    onSelect,
    onKeyDown,
    resetDate,
    hideNextMonthWeek,
    onlyMonth,
    hideMonthLabel,
  } = props

  const tableRef = useRef<ElementRef<'table'> | null>(null)
  const days = useRef<Record<string, Array<DatePickerCalendarDay>>>({})
  const cache = useRef<Record<string, DatePickerCalendarDay[][]>>({})
  const focusedDateRef = useRef<Date | null>(null)
  const pendingFocusDateRef = useRef<Date | null>(null)
  const currentDatesRef = useRef({
    startDate,
    endDate,
    startMonth,
    endMonth,
  })

  // Store the initial selected date on calendar render, to be used for `onCancel` in DatePickerFooter
  useMountEffect(() => {
    setSubmittedDates({ startDate, endDate })
  })

  useEffect(() => {
    currentDatesRef.current = {
      startDate,
      endDate,
      startMonth,
      endMonth,
    }
  }, [endDate, endMonth, startDate, startMonth])

  const onMouseLeaveHandler = useCallback(() => {
    setHoverDate(undefined)
  }, [setHoverDate])

  const focusDayButton = useCallback((date: Date) => {
    if (tableRef.current) {
      const dateStr = format(date, 'yyyy-MM-dd')
      const button = tableRef.current.querySelector(
        `td[data-date="${dateStr}"] button`
      ) as HTMLElement
      button?.focus({ preventScroll: true })
    }
  }, [])

  const focusEndCalendar = useCallback(() => {
    const viewsContainer = tableRef.current?.closest(
      '.dnb-date-picker__views'
    )
    const endTable = viewsContainer?.querySelectorAll('table')?.[1]
    const endDateValue = currentDatesRef.current.endDate
    const endButton = endDateValue
      ? (endTable?.querySelector(
          `td[data-date="${format(endDateValue, 'yyyy-MM-dd')}"] button`
        ) as HTMLElement | undefined)
      : null

    if (endButton) {
      endButton.focus({ preventScroll: true })
    } else {
      ;(endTable as HTMLElement | undefined)?.focus({
        preventScroll: true,
      })
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (pendingFocusDateRef.current) {
      focusDayButton(pendingFocusDateRef.current)
      pendingFocusDateRef.current = null
    }
  }, [views, focusDayButton])

  const callOnSelect = useCallback(
    (
      event: DatePickerChangeEvent<
        MouseEvent<HTMLSpanElement> | KeyboardEvent<HTMLTableElement>
      > &
        DatePickerDates
    ) => {
      onSelect?.(event)
    },
    [onSelect]
  )

  const getDays = useCallback(
    (month: Date): DayObject[] => {
      let daysFromCalendar = getCalendar(
        month || new Date(),
        dayOffset(firstDayOfWeek),
        {
          onlyMonth,
          hideNextMonthWeek,
        }
      ).map((date) =>
        makeDayObject(date, {
          startDate,
          endDate,
          hoverDate,
          minDate,
          maxDate,
          month,
        })
      )

      if (onDaysRender) {
        const changedDays = onDaysRender(daysFromCalendar, nr)
        if (Array.isArray(changedDays)) {
          daysFromCalendar = changedDays
        }
      }

      // Save for later check against disabled days during key navigation
      days.current[format(month, 'yyyy-MM')] = daysFromCalendar

      return daysFromCalendar
    },
    [
      endDate,
      firstDayOfWeek,
      hideNextMonthWeek,
      hoverDate,
      maxDate,
      minDate,
      nr,
      onDaysRender,
      onlyMonth,
      startDate,
    ]
  )

  const keyNavCalc = useCallback((date: Date, keyCode: string) => {
    // Return date if arrow keys are not pressed
    if (!arrowKeys.includes(keyCode)) {
      return date
    }

    const dateHandler = /(ArrowLeft|ArrowRight)/g.test(keyCode)
      ? addDays
      : addWeeks
    const shiftAmount = /(ArrowLeft|ArrowUp)/g.test(keyCode) ? -1 : 1

    return dateHandler(date, shiftAmount)
  }, [])

  const findValid = useCallback(
    (date: Date, keyCode: string) => {
      if (!onDaysRender || !days.current) {
        return date
      }

      const month = format(date, 'yyyy-MM')

      // re-render with new month
      if (!days.current[month]) {
        getDays(date)
      }

      if (Array.isArray(days.current[month])) {
        const foundDate = days.current[month].find((cur) =>
          isSameDay(cur.date, date)
        )

        if (
          foundDate?.date &&
          (foundDate.isDisabled ||
            foundDate.isSelectable === false ||
            foundDate.isInactive)
        ) {
          const nextDate = keyNavCalc(foundDate.date, keyCode)
          return findValid(nextDate, keyCode)
        }

        if (foundDate?.date) {
          return foundDate.date
        }
      }

      return date
    },
    [onDaysRender, getDays, keyNavCalc]
  )

  const hasReachedEnd = useCallback(
    (date: Date) => isDisabled(date, minDate, maxDate),
    [minDate, maxDate]
  )

  const onKeyDownHandler = useCallback(
    (event: KeyboardEvent<HTMLTableElement>) => {
      const pressedKey = event.code

      // call onKeyDown prop if given
      if (typeof onKeyDown === 'function') {
        return onKeyDown(event, tableRef, nr)
      }

      // only continue if key is one of these
      if (!keysToHandle.includes(pressedKey)) {
        return
      }

      // Sync focusedDateRef from DOM when a date button is focused
      // (e.g. after cross-calendar focus jump or mouse click on a day)
      if (tableRef.current) {
        const td = document.activeElement?.closest('td[data-date]')
        if (td && tableRef.current.contains(td)) {
          const dateStr = td.getAttribute('data-date')
          if (dateStr) {
            focusedDateRef.current = startOfDay(new Date(dateStr))
          }
        }
      }

      // Handle Enter/Space
      if (pressedKey === 'Enter' || pressedKey === 'Space') {
        event.preventDefault()

        if (focusedDateRef.current) {
          const focusedDate = focusedDateRef.current

          if (!isRange) {
            focusedDateRef.current = null

            updateDates(
              {
                startDate: startOfDay(focusedDate),
                endDate: startOfDay(focusedDate),
              },
              (allDates) => {
                callOnSelect({
                  ...allDates,
                  event,
                  nr,
                  hidePicker: true,
                })
              }
            )

            return
          }

          // Range mode: use same selection logic as mouse clicks
          setHasClickedCalendarDay(true)

          const { startDate: currentStart, endDate: currentEnd } =
            currentDatesRef.current

          if (!currentStart || (resetDate && currentStart && currentEnd)) {
            // First selection: set start date, clear end date
            // Keep focusedDateRef so arrow keys continue from this date
            updateDates(
              {
                startDate: startOfDay(focusedDate),
                endDate: undefined,
              },
              (allDates) => {
                callOnSelect({
                  ...allDates,
                  event,
                  nr,
                  hidePicker: false,
                })
              }
            )
          } else {
            // Second selection: create range
            focusedDateRef.current = null

            const range = toRange(currentStart, focusedDate)

            updateDates(
              {
                startDate: startOfDay(range.startDate),
                endDate: startOfDay(range.endDate),
              },
              (allDates) => {
                callOnSelect({
                  ...allDates,
                  event,
                  nr,
                  hidePicker: true,
                })
              }
            )
          }

          return
        }

        // Focus is on the table (no date navigated to)
        if (isRange && nr === 0) {
          focusEndCalendar()
        } else {
          callOnSelect({ event, nr, hidePicker: true })
        }
        return
      }

      // Handle arrow keys: move focus without changing the date
      event.preventDefault()

      const currentDates = currentDatesRef.current
      const dateType = !isRange || nr === 0 ? 'start' : 'end'
      const currentFocused =
        focusedDateRef.current || currentDates[`${dateType}Date`]
      const viewMonth = views.find((v) => v.nr === nr)?.month

      let newDate = currentFocused
        ? keyNavCalc(currentFocused, pressedKey)
        : viewMonth ||
          (isRange && nr === 1 ? addMonths(new Date(), 1) : new Date())

      if (
        // in case we don't have a focused date, then we use the current view month
        (viewMonth && !currentFocused) ||
        // if we have a larger gap between the new date and the current view month
        (viewMonth &&
          currentFocused &&
          Math.abs(differenceInMonths(newDate, viewMonth)) > 1)
      ) {
        newDate = !isRange ? viewMonth : setDate(viewMonth, 1)
      }

      newDate = findValid(newDate, pressedKey)

      if (hasReachedEnd(newDate)) {
        return // stop here
      }

      // Prevent navigating to different month when onlyMonth or hideNavigation
      if (onlyMonth || hideNavigation) {
        if (viewMonth && !isSameMonth(newDate, viewMonth)) {
          return
        }
      }

      focusedDateRef.current = newDate

      // Navigate to a different month if needed
      if (viewMonth && !isSameMonth(newDate, viewMonth)) {
        // In range mode, jump to the other calendar if it shows the target month
        if (isRange) {
          const otherNr = nr === 0 ? 1 : 0
          const otherViewMonth = views.find((v) => v.nr === otherNr)?.month

          if (otherViewMonth && isSameMonth(newDate, otherViewMonth)) {
            const viewsContainer = tableRef.current?.closest(
              '.dnb-date-picker__views'
            )
            const otherTable =
              viewsContainer?.querySelectorAll('table')?.[otherNr]
            const dateStr = format(newDate, 'yyyy-MM-dd')
            const button = otherTable?.querySelector(
              `td[data-date="${dateStr}"] button`
            ) as HTMLElement | undefined

            if (button) {
              focusedDateRef.current = null
              button.focus({ preventScroll: true })
              return // stop here
            }
          }
        }

        // Keep focus on the table during re-render to prevent the Popover from closing
        tableRef.current?.focus({ preventScroll: true })

        const updatedViews = views.map((view) => {
          if (view.nr === nr) {
            return { ...view, month: newDate }
          }
          return view
        })
        setViews(updatedViews)
        pendingFocusDateRef.current = newDate
      } else {
        focusDayButton(newDate)
      }
    },
    [
      callOnSelect,
      findValid,
      focusDayButton,
      focusEndCalendar,
      hasReachedEnd,
      onKeyDown,
      updateDates,
      hideNavigation,
      isRange,
      keyNavCalc,
      nr,
      onlyMonth,
      resetDate,
      setHasClickedCalendarDay,
      views,
      setViews,
    ]
  )

  const cacheKey = useMemo(() => {
    return [
      nr,
      month,
      firstDayOfWeek,
      onlyMonth,
      hideNextMonthWeek,
      startDate,
      endDate,
      hoverDate,
      maxDate,
      minDate,
    ].join('|')
  }, [
    nr,
    month,
    firstDayOfWeek,
    onlyMonth,
    hideNextMonthWeek,
    startDate,
    endDate,
    hoverDate,
    maxDate,
    minDate,
  ])

  const weekDays = useMemo(() => {
    // Cache the result, just because we then avoid at least double calc because of reconciliation,
    // but we do not avoid calculating every day during hover or select

    if (cache.current[cacheKey]) {
      return cache.current[cacheKey]
    }

    let count = 0

    const days = getDays(month).reduce((acc, cur, i) => {
      // Normalize the data for table consumption
      acc[count] = acc[count] || []
      acc[count].push(cur)
      if (i % 7 === 6) {
        count++
      }

      return acc
    }, {})

    cache.current[cacheKey] = Object.values(days)

    return cache.current[cacheKey]
  }, [cacheKey, getDays, month])

  return (
    <div
      className={clsx('dnb-date-picker__calendar', rtl && 'rtl')}
      lang={locale}
    >
      {!hideNavigation && !onlyMonth && (
        <div className="dnb-date-picker__header">
          <DatePickerCalendarNav
            type={yearNavigation ? 'month' : 'both'}
            id={id}
            nr={nr}
            date={month}
            locale={locale}
          />
          {yearNavigation && (
            <DatePickerCalendarNav
              type="year"
              id={id}
              nr={nr}
              date={month}
              locale={locale}
            />
          )}
        </div>
      )}
      {onlyMonth && !hideMonthLabel && (
        <div className="dnb-date-picker__header dnb-date-picker__header--only-month-label">
          <label
            id={`${id}--title`}
            className="dnb-date-picker__header__title dnb-no-focus"
            title={selectedMonth.replace(
              /%s/,
              formatDate(month, {
                locale,
                options: { month: 'long' },
              })
            )}
            tabIndex={-1}
          >
            {formatDate(month, {
              locale,
              options: { month: 'long' },
            })}
          </label>
        </div>
      )}
      <table
        role="grid"
        className="dnb-no-focus"
        tabIndex={0}
        aria-labelledby={
          onlyMonth && hideMonthLabel ? undefined : `${id}--title`
        }
        onKeyDown={onKeyDownHandler}
        onMouseLeave={onMouseLeaveHandler}
        ref={tableRef}
      >
        {!hideDays && !onlyMonth && (
          <thead aria-hidden>
            <tr role="row" className="dnb-date-picker__labels">
              {getWeek(dayOffset(firstDayOfWeek)).map((day) => (
                <th
                  key={day.toISOString()}
                  role="columnheader"
                  scope="col"
                  className="dnb-date-picker__labels__day"
                  aria-label={formatDate(day, {
                    locale,
                    options: { weekday: 'long' },
                  })}
                >
                  {formatDate(day, {
                    locale,
                    options: { weekday: 'short' },
                  }).substring(0, 2)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {weekDays.map((week, i) => {
            return (
              <tr
                key={'week' + i}
                role="row"
                className="dnb-date-picker__days"
              >
                {(week as DayObject[]).map((day, i) => {
                  const title = formatDate(day.date, {
                    locale,
                    options: {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    },
                  })

                  const handleAsDisabled =
                    day.isLastMonth ||
                    day.isNextMonth ||
                    day.isDisabled ||
                    day.isInactive

                  const dateType = day.isStartDate
                    ? 'start'
                    : day.isEndDate
                      ? 'end'
                      : undefined
                  const isSelectedDate =
                    nr === 0 ? day.isStartDate : day.isEndDate

                  // cell params
                  const paramsCell = {
                    tabIndex: -1,
                    ...(dateType && { id: `${id}--button-${dateType}` }),
                    ...(isSelectedDate && { ['aria-selected']: true }),
                  } as HTMLProps<HTMLTableCellElement>

                  // cell + button params
                  const paramsButton = {
                    ...(isSelectedDate && { ['aria-current']: 'date' }),
                  } as ButtonProps

                  return (
                    <td
                      key={'day' + i}
                      role="gridcell"
                      data-date={format(day.date, 'yyyy-MM-dd')}
                      className={clsx(
                        'dnb-date-picker__day',
                        'dnb-no-focus',
                        buildDayClassNames(day)
                      )}
                      {...paramsCell}
                    >
                      <Button
                        size="medium"
                        variant="secondary"
                        text={day.date.getDate()}
                        bounding
                        disabled={handleAsDisabled}
                        tabIndex={handleAsDisabled ? 0 : -1} // fix for NVDA
                        aria-disabled={handleAsDisabled}
                        aria-label={title}
                        {...paramsButton}
                        onClick={
                          handleAsDisabled
                            ? undefined
                            : ({ event }) =>
                                onSelectRange({
                                  day,
                                  isRange,
                                  startDate,
                                  endDate,
                                  resetDate,
                                  event,
                                  setHasClickedCalendarDay,
                                  onSelect: (state) => {
                                    updateDates(state, (dates) =>
                                      callOnSelect({
                                        ...dates,
                                        event,
                                        nr,
                                        hidePicker: !isRange,
                                      })
                                    )
                                  },
                                })
                        }
                        onMouseOver={
                          handleAsDisabled
                            ? undefined
                            : () =>
                                onHoverDay({
                                  day,
                                  hoverDate,
                                  setHoverDate,
                                })
                        }
                        onFocus={
                          handleAsDisabled
                            ? undefined
                            : () =>
                                onHoverDay({
                                  day,
                                  hoverDate,
                                  setHoverDate,
                                })
                        }
                      />
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default DatePickerCalendar

type SelectRangeEvent = Pick<
  DatePickerContextValue,
  'setHasClickedCalendarDay'
> & {
  day: DayObject
  event?: MouseEvent<HTMLButtonElement>
  startDate?: Date
  endDate?: Date
  resetDate?: boolean
  isRange?: boolean
  onSelect?: DatePickerCalendarProps['onSelect']
}

function onSelectRange({
  day,
  isRange,
  startDate,
  endDate,
  onSelect,
  resetDate,
  event,
  setHasClickedCalendarDay,
}: SelectRangeEvent) {
  if (!isRange) {
    // set only date
    return onSelect({
      startDate: startOfDay(day.date),
      endDate: startOfDay(day.date),
      event,
    })

    // for setting date new on every selection, do this here
  }

  // Set to true to stop calendar views from changing in range mode when clicking a day
  setHasClickedCalendarDay(true)

  if (!startDate || (resetDate && startDate && endDate)) {
    // set startDate
    // user is selecting startDate
    return onSelect({
      startDate: startOfDay(day.date),
      endDate: undefined,
      event,
    })
  }

  // set either startDate or endDate
  const daysToStartDate = Math.abs(
    differenceInCalendarDays(startDate, day.date)
  )
  const daysToEndDate = Math.abs(
    differenceInCalendarDays(endDate, day.date)
  )

  const range = toRange(
    endDate && !resetDate && daysToStartDate < daysToEndDate
      ? endDate
      : startDate,
    day.date
  )

  return onSelect({
    startDate: startOfDay(range.startDate),
    endDate: startOfDay(range.endDate),
    event,
  })
}

function onHoverDay({
  day,
  hoverDate,
  setHoverDate,
}: {
  day: DatePickerCalendarDay
  hoverDate?: Date
  setHoverDate: (date: Date) => void
}) {
  if (day.isStartDate || day.isEndDate) {
    return // stop here – no hover effect needed on the already-selected date
  }
  if (!isSameDay(day.date, hoverDate)) {
    setHoverDate?.(day.date)
  }
}

function buildDayClassNames(day: DayObject) {
  return clsx(
    {
      'dnb-date-picker__day--start-date': day.isStartDate,
      'dnb-date-picker__day--end-date': day.isEndDate,
      'dnb-date-picker__day--preview': day.isPreview,
      'dnb-date-picker__day--within-selection': day.isWithinSelection,
      'dnb-date-picker__day--selectable': day.isSelectable,
      'dnb-date-picker__day--inactive': day.isInactive,
      'dnb-date-picker__day--disabled': day.isDisabled,
      'dnb-date-picker__day--today': day.isToday,
    },
    day.className
  )
}
