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
const timeUnitsInMs = {
  seconds: 1000,
  minutes: 60_000,
  hours: 3_600_000,
  days: 86_400_000,
  weeks: 604_800_000,
  months: 30.4375 * 86_400_000, // avg month (365.25 / 12 days)
  years: 365.25 * 86_400_000, // avg year including leap years
} as const
export type RelativeTimeUnit = keyof typeof timeUnitsInMs

/**
 * Returns a relative time string, e.g. "3 days ago"
 */
export function getRelativeTime(
  date: Date,
  locale: AnyLocale = defaultLocale,
  options: Intl.RelativeTimeFormatOptions = {
    numeric: 'always',
    style: 'long',
  }
) {
  const relativeTimeFormatter = new Intl.RelativeTimeFormat(
    locale,
    options
  )

  const now = new Date()

  const msDateDifference = date.getTime() - now.getTime()
  const timeUnit = getTimeUnit(msDateDifference)

  const timeUnitDifference = Math.round(
    msDateDifference / timeUnitsInMs[timeUnit]
  )

  return relativeTimeFormatter.format(timeUnitDifference, timeUnit)
}

/**
 * Calculates the optimal delay in milliseconds until the relative time label
 * is expected to change next. Uses the same unit logic as getRelativeTime,
 * and schedules the update at the next rounding threshold to minimize re-renders.
 */
export function getRelativeTimeNextUpdateMs(
  date: Date,
  now = new Date()
): number {
  const diff = date.getTime() - now.getTime()
  if (!Number.isFinite(diff)) {
    return 1000
  }

  const unit = getTimeUnit(diff)
  const unitMs = timeUnitsInMs[unit]
  const v = diff / unitMs
  const msUntilFlip = (v - (Math.round(v) - 0.5)) * unitMs
  const min = unit === 'seconds' ? 500 : 1000

  return Math.max(min, Math.floor(msUntilFlip) + 50)
}

const UNIT_THRESHOLDS: ReadonlyArray<[number, RelativeTimeUnit]> = [
  [timeUnitsInMs.minutes, 'seconds'],
  [timeUnitsInMs.hours, 'minutes'],
  [timeUnitsInMs.days, 'hours'],
  [timeUnitsInMs.weeks, 'days'],
  [timeUnitsInMs.months, 'weeks'],
  [timeUnitsInMs.years, 'months'],
]

function getTimeUnit(msDifference: number): RelativeTimeUnit {
  const abs = Math.abs(msDifference)
  return UNIT_THRESHOLDS.find(([limit]) => abs < limit)?.[1] ?? 'years'
}
