import { AnyLocale } from '../../shared/Context'
import { LOCALE as defaultLocale } from '../../shared/defaults'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { DateType } from '../date-picker/DatePickerContext'

export type FormatDateOptions = {
  locale?: AnyLocale
  options?: Intl.DateTimeFormatOptions
}

export function formatDate(
  dateValue: DateType,
  {
    locale = defaultLocale,
    options = { dateStyle: 'short' },
  }: FormatDateOptions = {}
) {
  const date = convertStringToDate(dateValue)

  return typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat(locale, options).format(date)
    : date.toLocaleString(locale, options)
}

export function formatDateRange(
  dates: { startDate: DateType; endDate: DateType },
  {
    locale = defaultLocale,
    options = { dateStyle: 'long' },
  }: FormatDateOptions = {}
) {
  const startDate = convertStringToDate(dates.startDate)
  const endDate = convertStringToDate(dates.endDate)

  if (typeof Intl !== 'undefined') {
    return new Intl.DateTimeFormat(locale, options).formatRange(
      startDate,
      endDate
    )
  }

  const startDateString = startDate.toLocaleString(locale, options)
  const endDateString = endDate.toLocaleString(locale, options)

  return `${startDateString}-${endDateString}`
}

// Set of constants that represent how many ms per unit
const msSeconds = 1000
const msMinutes = 60 * msSeconds
const msHours = 60 * msMinutes
const msDays = 24 * msHours
const msWeeks = 7 * msDays
// yeah, this is probably not perfect
const msMonths = 4 * msWeeks
const msYears = 12 * msMonths

const timeUnitsInMs = {
  seconds: msSeconds,
  minutes: msMinutes,
  hours: msHours,
  days: msDays,
  weeks: msWeeks,
  months: msMonths,
  years: msYears,
}

type RelativeTimeUnit = keyof typeof timeUnitsInMs

export function getRelativeTime(date: Date) {
  const relativeTimeFormatter = new Intl.RelativeTimeFormat('nb-NO', {
    numeric: 'always',
    style: 'long',
  })

  const today = new Date()

  const msDateDifference = date.getTime() - today.getTime()
  const timeUnit = getTimeUnit(msDateDifference)

  const timeUnitDifference = Math.round(
    msDateDifference / timeUnitsInMs[timeUnit]
  )

  return relativeTimeFormatter.format(timeUnitDifference, timeUnit)
}

function getTimeUnit(msDifference: number): RelativeTimeUnit {
  const absoluteMsDifference = Math.abs(msDifference)

  console.log('absoluteMsDifference', absoluteMsDifference)
  console.log('msWeeks', msWeeks)

  if (absoluteMsDifference < msMinutes) {
    return 'seconds'
  }

  if (absoluteMsDifference < msHours) {
    return 'minutes'
  }

  if (absoluteMsDifference < msDays) {
    return 'hours'
  }

  if (absoluteMsDifference < msWeeks) {
    return 'days'
  }

  if (absoluteMsDifference < msMonths) {
    return 'weeks'
  }

  if (absoluteMsDifference < msYears) {
    return 'months'
  }

  return 'years'
}
