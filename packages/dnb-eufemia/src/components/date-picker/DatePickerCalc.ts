/**
 * Web DatePicker Component
 *
 */

// date-fns
import subMonths from 'date-fns/subMonths'
import addMonths from 'date-fns/addMonths'
import isWithinInterval from 'date-fns/isWithinInterval'
import isValid from 'date-fns/isValid'
import isAfter from 'date-fns/isAfter'
import isBefore from 'date-fns/isBefore'
import isSameDay from 'date-fns/isSameDay'
import isToday from 'date-fns/isToday'
import isSameMonth from 'date-fns/isSameMonth'
import addDays from 'date-fns/addDays'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import startOfMonth from 'date-fns/startOfMonth'
import getDaysInMonth from 'date-fns/getDaysInMonth'
import toDate from 'date-fns/toDate'
import parseISO from 'date-fns/parseISO'
import parse from 'date-fns/parse'
import startOfDay from 'date-fns/startOfDay'

import { warn } from '../../shared/component-helper'

type ZeroDayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6

type DateRange = { startDate: Date; endDate: Date }

const calendarCache: { [isoString: string]: Date[] } = {}

// Is used as DatePickerCalc
export function makeDayObject(
  date: Date,
  {
    startDate,
    endDate,
    hoverDate,
    minDate,
    maxDate,
    month,
  }: Record<string, Date>
) {
  const range = getRange(startDate, endDate, hoverDate)
  const isLastMonth = isSameMonth(subMonths(date, 1), month)
  const isNextMonth = isSameMonth(addMonths(date, 1), month)
  const isStartDate = isStartDateCalc(date, range)
  const isEndDate = isEndDateCalc(date, range)
  const isWithinSelection = isWithinSelectionCalc(date, startDate, endDate)
  const isPreview = isPreviewCalc(date, startDate, endDate, hoverDate)
  const isDisabled = isDisabledCalc(date, minDate, maxDate)

  return {
    date,
    isToday: isToday(date),
    isLastMonth,
    isNextMonth,
    isStartDate,
    isEndDate,
    isWithinSelection,
    isPreview,
    isDisabled,
    isSelectable: !isLastMonth && !isNextMonth && !isDisabled,
    isInactive: isLastMonth || isNextMonth || isDisabled,
  }
}

// return an array of objects with dates and extra info
export function getCalendar(
  month: Date,
  weekStartsOn = 0,
  {
    onlyMonth = false,
    hideNextMonthWeek = false,
  }: { onlyMonth?: boolean; hideNextMonthWeek?: boolean } = {}
) {
  const cacheKey = month.toISOString()

  // Get the main month
  const thisMonth = getMonth(month)
  if (onlyMonth) {
    return (calendarCache[cacheKey] = [...thisMonth])
  }

  if (calendarCache[cacheKey]) {
    return calendarCache[cacheKey]
  }

  // Get day of the week of the first day of month, e.g. => 3
  // Add 7 days 7 to make sure it's not negative when subtracting weekStartsOn and wraps around
  const firstDay = (7 + getDay(startOfMonth(month)) - weekStartsOn) % 7
  const lastMonth = getMonth(
    subMonths(month, 1),
    getDaysInMonth(subMonths(month, 1)) - firstDay
  )
  let fillCount = -1
  if (hideNextMonthWeek) {
    // use this variant if it is OK with empty slots at the bottom
    fillCount = 35 - (thisMonth.length + firstDay)
  }
  if (fillCount < 0) {
    fillCount = 42 - (thisMonth.length + firstDay)
  }
  const nextMonth = getMonth(
    addMonths(month, 1),
    0,
    fillCount > -1 ? fillCount : 0
  )
  return (calendarCache[cacheKey] = [
    ...lastMonth,
    ...thisMonth,
    ...nextMonth,
  ])
}

// calculates offset from Sunday, e.g. Monday is +1
export function dayOffset(dayName: string) {
  const week = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]
  return (
    dayName ? week.indexOf(dayName.toLowerCase()) : 0
  ) as ZeroDayIndex
}

// creates a date range object and automatically swaps startDate and endDate if endDate is before startDate
export function toRange(startDate: Date, endDate: Date) {
  if (isBefore(endDate, startDate)) {
    const _startDate = startDate
    startDate = endDate
    endDate = _startDate
  }
  return { startDate, endDate }
}

// returns startDate and endDate if both dates are selected
// otherwise uses the startDate and hoverDate
// unless user hasn't hovered, then use start date twice
function getRange(startDate: Date, endDate: Date, hoverDate: Date) {
  if (startDate && endDate) {
    return toRange(startDate, endDate)
  } else if (startDate && hoverDate) {
    return toRange(startDate, hoverDate)
  } else {
    return toRange(startDate, startDate)
  }
}

// returns an array of dates for each day of the current week
// weekStartsOn is a number, use dayOffset to convert from a string
export function getWeek(weekStartsOn?: ZeroDayIndex) {
  const startDay = startOfWeek(new Date(), { weekStartsOn })
  return Array(7)
    .fill(1)
    .map((value, i) => addDays(startDay, i))
}

// returns an array of dates of the month, optionally skip x number of days
export function getMonth(month: Date, skip = 0, limit?: number) {
  const startDay = startOfMonth(month)
  let size = getDaysInMonth(month) - skip
  size = Math.min(Math.max(size, 0), limit > -1 ? limit : size)
  size = size < 0 ? 0 : size
  return Array(size)
    .fill(1)
    .map((value, i) => addDays(startDay, i + skip))
}

// date is between selection range
function isWithinSelectionCalc(
  date: Date,
  startDate: Date,
  endDate: Date
) {
  const { startDate: start, endDate: end } = toRange(startDate, endDate)
  return startDate && endDate
    ? isValid(start) &&
        isValid(end) &&
        isWithinInterval(date, {
          start,
          end,
        })
    : false
}

// date is before minDate or after maxDate
function isDisabledCalc(date: Date, minDate: Date, maxDate: Date) {
  // isBefore and isAfter return false if comparison date is undefined, which is useful here in case minDate and maxDate aren't supplied
  return (
    (minDate && isBefore(date, startOfDay(minDate))) ||
    (maxDate && isAfter(date, startOfDay(maxDate)))
  )
}
export { isDisabledCalc as isDisabled }

// date selected is start date
function isStartDateCalc(date: Date, range: DateRange) {
  return range.startDate && isSameDay(date, range.startDate)
}

// date selected is end date
function isEndDateCalc(date: Date, range: DateRange) {
  return range.endDate && isSameDay(date, range.endDate)
}

// date is between startDate (exclusive) and hoverDate (inclusive)
function isPreviewCalc(
  date: Date,
  startDate: Date,
  endDate: Date,
  hoverDate: Date
) {
  const { startDate: start, endDate: end } = toRange(startDate, hoverDate)
  return (
    startDate &&
    !endDate &&
    // To exclude "isPreview" from startDate/endDate, we have to enable these two lines
    // !isStartDate(date, previewRange) &&
    // !isEndDate(date, previewRange) &&
    isValid(start) &&
    isValid(end) &&
    isWithinInterval(date, {
      start,
      end,
    })
  )
}

export function correctV1Format(date: string) {
  // for backwards compatibility
  // TODO: Remove this in next major version
  if (/YYYY/.test(date) && /DD/.test(date)) {
    warn(
      'You are using "YYYY-MM-DD" as the date_format or return_format? Please use "yyyy-MM-dd" instead!'
    )
    date = date.replace(/DD/, 'dd').replace(/YYYY/, 'yyyy')
  }

  return date
}

export function convertStringToDate(
  date: string | Date,
  { date_format = null }: { date_format?: string | null } = {}
): Date {
  if (!date || date === 'undefined') {
    return null
  }

  let dateObject: Date
  dateObject = typeof date === 'string' ? parseISO(date) : toDate(date)

  // check one more time if we can generate a valid date
  if (typeof date === 'string' && date_format && !isValid(dateObject)) {
    date_format = correctV1Format(date_format)
    dateObject = parse(date, date_format, new Date())
  }

  // rather return null than an invalid date
  if (!isValid(dateObject)) {
    warn('convertStringToDate got invalid date:', date)
    return null
  }

  return dateObject
}
