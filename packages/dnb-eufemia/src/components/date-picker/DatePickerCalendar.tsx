/**
 * Web DatePicker Component
 *
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import classnames from 'classnames'

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
  lastDayOfMonth,
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
import Button, { ButtonProps } from '../button/Button'
import DatePickerContext, {
  DatePickerContextValues,
} from './DatePickerContext'
import { InternalLocale } from '../../shared/Context'
import { DatePickerChangeEvent } from './DatePickerProvider'
import { DatePickerDates } from './hooks/useDates'
import {
  CalendarNavButtonProps,
  DatePickerCalendarNav,
} from './DatePickerCalendarNavigator'
import { formatDate } from '../date-format/DateFormatUtils'

export type CalendarDay = {
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

export type CalendarNavigationEvent = {
  nr: number
  type?: CalendarNavButtonProps['type']
}

export type DatePickerCalendarProps = Omit<
  React.HTMLProps<HTMLElement>,
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
  hideNextMonthWeek?: boolean
  onSelect?: (
    event: DatePickerChangeEvent<
      | React.MouseEvent<HTMLSpanElement>
      | React.KeyboardEvent<HTMLTableElement | HTMLButtonElement>
    >
  ) => void
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLTableElement | HTMLButtonElement>,
    tableRef: React.RefObject<HTMLTableElement>,
    nr: number
  ) => void
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
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

const defaultProps: DatePickerCalendarProps = {
  hideNavigation: false,
  hideDays: false,
  onlyMonth: false,
  hideNextMonthWeek: false,
  rtl: false,
  resetDate: true,
}

const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const keysToHandle = ['Enter', 'Space', ...arrowKeys]

function DatePickerCalendar(restOfProps: DatePickerCalendarProps) {
  const props = { ...defaultProps, ...restOfProps }

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
  } = props

  const tableRef = useRef<React.ElementRef<'table'>>()
  const days = useRef<Record<string, Array<CalendarDay>>>({})
  const cache = useRef<Record<string, CalendarDay[][]>>({})

  // Store the initial selected date on calendar render, to be used for `onCancel` in DatePickerFooter
  useEffect(() => {
    setSubmittedDates({ startDate, endDate })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMouseLeaveHandler = useCallback(() => {
    setHoverDate(undefined)
  }, [setHoverDate])

  const callOnSelect = useCallback(
    (
      event: DatePickerChangeEvent<
        | React.MouseEvent<HTMLSpanElement>
        | React.KeyboardEvent<HTMLTableElement>
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
    (event: React.KeyboardEvent<HTMLTableElement>) => {
      const pressedKey = event.code

      // call onKeyDown prop if given
      if (typeof onKeyDown === 'function') {
        return onKeyDown(event, tableRef, nr)
      }

      // only continue of key is one of these
      if (!keysToHandle.includes(pressedKey)) {
        return
      }
      event.preventDefault()
      event.persist() // since we use the event after updateDates

      const currentDates = { startDate, endDate, startMonth, endMonth }
      const dateType = !isRange || nr === 0 ? 'start' : 'end'
      const currentDate = currentDates[`${dateType}Date`]

      let newDate = currentDate
        ? keyNavCalc(currentDate, pressedKey)
        : currentDates[`${dateType}Month`] ||
          (isRange && nr === 1 ? addMonths(new Date(), 1) : new Date())

      if (
        newDate === currentDate &&
        (pressedKey === 'Enter' || pressedKey === 'Space')
      ) {
        return callOnSelect({
          event,
          nr,
          hidePicker: true,
        })
      }

      const dates: {
        startDate?: Date
        endDate?: Date
        startMonth?: Date
        endMonth?: Date
      } = {}

      const currentMonth = currentDates[`${dateType}Month`]

      if (
        // in case we don't have a start/end date, then we use the current month date
        (currentMonth && !currentDate) ||
        // if we have a larger gap between the new date and the current month in the calendar
        (currentMonth &&
          Math.abs(differenceInMonths(newDate, currentMonth)) > 1)
      ) {
        newDate = !isRange
          ? currentMonth
          : nr === 0
          ? setDate(currentMonth, 1)
          : lastDayOfMonth(currentMonth)

        // only to make sure we navigate the calendar to the new date
      } else if (currentMonth && !isSameMonth(currentDate, currentMonth)) {
        dates[`${dateType}Month`] = newDate
      }

      newDate = findValid(newDate, pressedKey)

      if (hasReachedEnd(newDate)) {
        return // Stop here
      }

      dates[`${dateType}Date`] = newDate

      // set fallbacks
      if (!isRange) {
        dates.endDate = newDate
      } else {
        if (!startDate) {
          dates.startDate = newDate
        }
        if (!endDate) {
          dates.endDate = newDate
        }
      }

      // make sure we stay on the same month
      if (onlyMonth || hideNavigation) {
        if (
          !isSameMonth(dates.startDate, startDate) ||
          !isSameMonth(dates.endDate, startDate) // Heads up, should this not be context.endDate?
        ) {
          return
        }
      }

      updateDates(dates, () => {
        // call after state update, so the input get's the latest state as well
        callOnSelect({
          event,
          nr,
          hidePicker: false,
          ...dates,
        })
      })

      // and set the focus back again
      if (tableRef && tableRef.current) {
        tableRef.current.focus({ preventScroll: true })
      }
    },
    [
      callOnSelect,
      findValid,
      hasReachedEnd,
      onKeyDown,
      startDate,
      endDate,
      updateDates,
      hideNavigation,
      isRange,
      keyNavCalc,
      nr,
      onlyMonth,
      endMonth,
      startMonth,
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
      className={classnames('dnb-date-picker__calendar', rtl && 'rtl')}
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
      {onlyMonth && (
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
        aria-labelledby={`${id}--title`}
        onKeyDown={onKeyDownHandler}
        onMouseLeave={onMouseLeaveHandler}
        ref={tableRef}
      >
        {!hideDays && !onlyMonth && (
          <thead aria-hidden>
            <tr role="row" className="dnb-date-picker__labels">
              {getWeek(dayOffset(firstDayOfWeek)).map((day, i) => (
                <th
                  key={i}
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
                {week.map((day: DayObject, i) => {
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
                  } as React.HTMLProps<HTMLTableCellElement>

                  // cell + button params
                  const paramsButton = {
                    ...(isSelectedDate && { ['aria-current']: 'date' }),
                  } as ButtonProps

                  return (
                    <td
                      key={'day' + i}
                      role="gridcell"
                      className={classnames(
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
                        bounding={true}
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
  DatePickerContextValues,
  'setHasClickedCalendarDay'
> & {
  day: DayObject
  event?: React.MouseEvent<HTMLButtonElement>
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
  event.persist()

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
  day: CalendarDay
  hoverDate?: Date
  setHoverDate: (date: Date) => void
}) {
  if (!isSameDay(day.date, hoverDate)) {
    setHoverDate?.(day.date)
  }
}

function buildDayClassNames(day: DayObject) {
  return classnames(
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
