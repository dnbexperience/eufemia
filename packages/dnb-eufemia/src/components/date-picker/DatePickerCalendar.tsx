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
import format from 'date-fns/format'
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import addWeeks from 'date-fns/addWeeks'
import addDays from 'date-fns/addDays'
import isSameDay from 'date-fns/isSameDay'
import isSameMonth from 'date-fns/isSameMonth'
import startOfDay from 'date-fns/startOfDay'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import differenceInMonths from 'date-fns/differenceInMonths'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import setDate from 'date-fns/setDate'

// Imports only the parts of the date-fns locale object that we actually use
import nbLocalize from 'date-fns/locale/nb/_lib/localize'
import nbFormatLong from 'date-fns/locale/nb/_lib/formatLong'
import enLocalize from 'date-fns/locale/en-US/_lib/localize'
import enFormatLong from 'date-fns/locale/en-US/_lib/formatLong'
import gbFormatLong from 'date-fns/locale/en-GB/_lib/formatLong'

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
  DatePickerChangeEvent,
} from './DatePickerContext'
import { useTranslation } from '../../shared'
import { InternalLocale } from '../../shared/Context'

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

type CalendarLocales = {
  // eslint-disable-next-line no-unused-vars
  [locale in InternalLocale]?: Pick<Locale, 'localize' | 'formatLong'>
}
// Easy to acces objects containing the only (in our case) needed functions for date-fns format
const locales: CalendarLocales = {
  'nb-NO': { localize: nbLocalize, formatLong: nbFormatLong },
  'en-GB': { localize: enLocalize, formatLong: gbFormatLong },
  'en-US': { localize: enLocalize, formatLong: enFormatLong },
}

export type CalendarNavigationEvent = {
  nr: number
  type?: CalendarButtonProps['type']
}

export type DatePickerCalendarProps = Omit<
  React.HTMLProps<HTMLElement>,
  'onSelect'
> & {
  id?: string
  nr?: number
  /**
   * To display what month should be shown in the first calendar by default. Defaults to the `date` respective `start_date`.
   */
  month?: Date
  prevBtn?: boolean
  nextBtn?: boolean
  titleFormat?: string
  dayOfWeekFormat?: string
  firstDayOfWeek?: string
  hideNav?: boolean
  hideDays?: boolean
  onlyMonth?: boolean
  hideNextMonthWeek?: boolean
  noAutoFocus?: boolean
  onHover?: (day: Date) => void
  onSelect?: (event: DatePickerChangeEvent) => void
  onPrev?: (event: CalendarNavigationEvent) => void
  onNext?: (event: CalendarNavigationEvent) => void
  onKeyDown?: (
    event: React.KeyboardEvent<HTMLTableElement | HTMLButtonElement>,
    tableRef: React.MutableRefObject<HTMLTableElement>,
    nr: number
  ) => void
  /**
   * To define the locale used in the calendar. Needs to be an `date-fns` "v2" locale object, like `import enLocale from &#39;date-fns/locale/en-GB&#39;`. Defaults to `nb-NO`.
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
  prevBtn: true,
  nextBtn: true,
  titleFormat: 'MMMM yyyy',
  dayOfWeekFormat: 'EEEEEE',
  firstDayOfWeek: 'monday',
  hideNav: false,
  hideDays: false,
  onlyMonth: false,
  hideNextMonthWeek: false,
  noAutoFocus: false,
  rtl: false,
  resetDate: true,
}

const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const keysToHandle = ['Enter', 'Space', ...arrowKeys]

function DatePickerCalendar(restOfProps: DatePickerCalendarProps) {
  const props = { ...defaultProps, ...restOfProps }

  const {
    updateDates,
    startDate,
    endDate,
    hoverDate,
    maxDate,
    minDate,
    startMonth,
    endMonth,
    translation: {
      DatePicker: { selected_month },
    },
    props: { on_days_render },
  } = useContext(DatePickerContext)

  const {
    id,
    nr,
    rtl,
    month,
    isRange,
    titleFormat,
    firstDayOfWeek,
    dayOfWeekFormat,
    hideNav,
    locale: localeCode,
    hideDays,
    onPrev,
    onNext,
    onSelect,
    onHover,
    onKeyDown,
    resetDate,
    prevBtn,
    nextBtn,
    noAutoFocus,
    hideNextMonthWeek,
    onlyMonth,
  } = props

  const listRef = useRef<React.ElementRef<'table'>>()
  const labelRef = useRef<HTMLLabelElement>()
  const days = useRef<Record<string, Array<CalendarDay>>>({})
  const cache = useRef<Record<string, CalendarDay[][]>>({})

  useEffect(() => {
    if (!noAutoFocus && nr === 0) {
      if (listRef.current) {
        listRef.current.focus({ preventScroll: true })
      }
    }
  }, [noAutoFocus, nr])

  const onMouseLeaveHandler = useCallback(() => {
    updateDates({
      hoverDate: null,
    })
  }, [updateDates])

  const callOnSelect = useCallback(
    (args: DatePickerChangeEvent) => {
      onSelect?.(args)
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

      if (on_days_render) {
        const changedDays = on_days_render(daysFromCalendar, nr)
        if (Array.isArray(changedDays)) {
          daysFromCalendar = changedDays
        }
      }

      // // Save for later check against disabled days during key navigation
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
      on_days_render,
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
      if (!on_days_render) {
        return date
      }

      if (!days.current) {
        return date
      }

      const month = format(date, 'yyyy-MM')

      if (!days.current[month]) {
        // re-render with new month
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
          foundDate.date = findValid(nextDate, keyCode)
        }

        if (foundDate?.date) {
          return foundDate.date
        }
      }

      return date
    },
    [on_days_render, getDays, keyNavCalc]
  )

  const hasReachedEnd = useCallback(
    (date: Date) => isDisabled(date, minDate, maxDate),
    [minDate, maxDate]
  )

  const onKeyDownHandler = useCallback(
    (event: React.KeyboardEvent<HTMLTableElement | HTMLButtonElement>) => {
      const pressedKey = event.code

      // call onKeyDown prop if given
      if (typeof onKeyDown === 'function') {
        return onKeyDown(event, listRef, nr)
      }

      // only continue of key is one of these
      if (!keysToHandle.includes(pressedKey)) {
        return
      }
      event.preventDefault()
      event.persist() // since we use the event after setState

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
        startMonht?: Date
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
      if (onlyMonth || hideNav) {
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
        })
      })

      // and set the focus back again
      if (listRef && listRef.current) {
        listRef.current.focus({ preventScroll: true })
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
      hideNav,
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

  const memorizedDays = useMemo(() => {
    // Cache the result, just because we then avoid at least double calc because of reconciliation,
    // but we do not avoid calculating every day during hover or select

    if (cache.current[cacheKey]) {
      return cache.current[cacheKey]
    }

    let count = 0

    return (cache.current[cacheKey] = Object.values(
      getDays(month).reduce((acc, cur, i) => {
        // Normalize the data for table consumption
        acc[count] = acc[count] || []
        acc[count].push(cur)
        if (i % 7 === 6) {
          count++
        }
        return acc
      }, {})
    ))
  }, [cacheKey, getDays, month])

  const weekDays = memorizedDays

  const locale = useMemo(() => ({ ...locales[localeCode] }), [localeCode])

  return (
    <div
      className={classnames('dnb-date-picker__calendar', rtl && 'rtl')}
      lang={localeCode}
    >
      {!hideNav && (
        <div className="dnb-date-picker__header">
          <div className="dnb-date-picker__header__nav">
            <CalendarButton
              type="prev"
              nr={nr}
              date={minDate}
              month={month}
              locale={locale}
              showButton={prevBtn}
              onClick={onPrev}
            />
          </div>
          <label
            id={`${id}--title`}
            className="dnb-date-picker__header__title dnb-no-focus"
            title={selected_month.replace(
              /%s/,
              format(month, titleFormat, {
                locale,
              })
            )}
            tabIndex={-1}
            ref={labelRef}
          >
            {format(month, titleFormat, {
              locale,
            })}
          </label>
          <div className="dnb-date-picker__header__nav">
            <CalendarButton
              type="next"
              nr={nr}
              date={maxDate}
              month={month}
              locale={locale}
              showButton={nextBtn}
              onClick={onNext}
            />
          </div>
        </div>
      )}
      <table
        role="grid"
        className="dnb-no-focus"
        tabIndex={0}
        aria-labelledby={`${id}--title`}
        onKeyDown={onKeyDownHandler}
        onMouseLeave={onMouseLeaveHandler}
        ref={listRef}
      >
        {!hideDays && (
          <thead aria-hidden>
            <tr role="row" className="dnb-date-picker__labels">
              {getWeek(dayOffset(firstDayOfWeek)).map((day, i) => (
                <th
                  key={i}
                  role="columnheader"
                  scope="col"
                  className={classnames(
                    'dnb-date-picker__labels__day',
                    `dnb-date-picker__labels__day--${format(day, 'i', {
                      locale,
                    })}`
                  )}
                  aria-label={format(day, 'EEEE', {
                    locale,
                  })}
                >
                  {format(day, dayOfWeekFormat, {
                    locale,
                  })}
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
                  const title = format(day.date, 'PPPP', {
                    locale,
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
                        text={format(day.date, 'd', {
                          locale,
                        })}
                        bounding={true}
                        disabled={handleAsDisabled}
                        tabIndex={handleAsDisabled ? 0 : -1} // fix for NVDA
                        aria-disabled={handleAsDisabled}
                        aria-label={title}
                        {...paramsButton}
                        on_click={
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
                            : () => onHoverDay({ day, hoverDate, onHover })
                        }
                        onFocus={
                          handleAsDisabled
                            ? undefined
                            : () => onHoverDay({ day, hoverDate, onHover })
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

export type CalendarButtonProps = {
  type: 'prev' | 'next'
  nr: number
  date: Date
  month: Date
  locale: CalendarLocales[keyof CalendarLocales]
  showButton: boolean
  onClick: ({
    nr,
    type,
  }: {
    nr: number
    type: CalendarButtonProps['type']
  }) => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void
}

function CalendarButton({
  type,
  nr,
  date,
  month,
  locale,
  showButton,
  onClick,
  onKeyDown,
}: CalendarButtonProps) {
  const tr = useTranslation().DatePicker

  if (!showButton) {
    return <></>
  }
  const disabled = date && isSameMonth(month, date)

  const title = tr[`${type}_month`].replace(
    /%s/,
    format(subMonths(month, 1), 'MMMM yyyy', {
      locale,
    })
  )

  const icon = type === 'prev' ? 'chevron_left' : 'chevron_right'

  return (
    <Button
      className={classnames(`dnb-date-picker__${type}`, { disabled })}
      icon={icon}
      size="small"
      aria-label={title}
      onClick={() => onClick && !disabled && onClick({ nr, type })}
      onKeyDown={onKeyDown}
    />
  )
}

type SelectRangeEvent = {
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
  onHover,
}: {
  day: CalendarDay
  hoverDate?: Date
  onHover: DatePickerCalendarProps['onHover']
}) {
  if (!isSameDay(day.date, hoverDate) && onHover) {
    onHover(day.date)
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
