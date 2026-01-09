import type { AnyLocale } from '../../shared/Context'
import { LOCALE as defaultLocale } from '../../shared/defaults'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import type { DateType } from '../date-picker/DatePickerContext'

// Type definitions for Intl.DurationFormat (newer API)
interface DurationFormatInput {
  years?: number
  months?: number
  weeks?: number
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

interface DurationFormatOptions {
  style?: 'long' | 'short' | 'narrow'
}

interface DurationFormat {
  format(duration: DurationFormatInput): string
}

interface DurationFormatConstructor {
  new (locale?: string, options?: DurationFormatOptions): DurationFormat
}

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
 *
 * Note: The dateStyle prop maps to Intl.RelativeTimeFormat styles in an intuitive way:
 * - short -> narrow (most abbreviated, e.g., "2t, 30m")
 * - medium -> short (medium abbreviation, e.g., "2 t, 30 min")
 * - long -> long (full words, e.g., "2 hours, 30 minutes")
 */
export function getRelativeTime(
  date: Date,
  locale: AnyLocale = defaultLocale,
  options: Intl.RelativeTimeFormatOptions = {
    numeric: 'always',
    style: 'long',
  },
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'],
  relativeTimeReference?: Date | (() => Date)
) {
  // Map dateStyle to RelativeTimeFormat style for consistent styling
  // short -> narrow (most abbreviated), medium -> short (medium abbreviation), long -> long (full words)
  const relativeTimeOptions: Intl.RelativeTimeFormatOptions = {
    ...options,
    style:
      dateStyle === 'short'
        ? 'narrow'
        : dateStyle === 'medium'
        ? 'short'
        : 'long',
  }

  const relativeTimeFormatter = new Intl.RelativeTimeFormat(
    locale,
    relativeTimeOptions
  )

  const nowDate =
    relativeTimeReference instanceof Date
      ? relativeTimeReference
      : typeof relativeTimeReference === 'function'
      ? relativeTimeReference()
      : new Date()

  const msDateDifference = date.getTime() - nowDate.getTime()
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
  relativeTimeReference: Date | (() => Date) = new Date()
): number {
  const nowDate =
    relativeTimeReference instanceof Date
      ? relativeTimeReference
      : typeof relativeTimeReference === 'function'
      ? relativeTimeReference()
      : new Date()
  const diff = date.getTime() - nowDate.getTime()
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

// ISO 8601 duration regex pattern (defined once)
// Supports: P(optional: Y years, M months, W weeks, D days)T(optional: H hours, M minutes, S seconds)
const DURATION_PATTERN =
  /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)W)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/

/**
 * Parses an ISO 8601 duration string (e.g., "PT2H30M", "P1DT2H30M")
 * and returns the duration in milliseconds
 */
export function parseDuration(durationString: string): number {
  if (!durationString || typeof durationString !== 'string') {
    return 0
  }

  const match = durationString.match(DURATION_PATTERN)
  if (!match) {
    return 0
  }

  const [
    ,
    years = '0',
    months = '0',
    weeks = '0',
    days = '0',
    hours = '0',
    minutes = '0',
    seconds = '0',
  ] = match

  return (
    parseInt(years) * timeUnitsInMs.years +
    parseInt(months) * timeUnitsInMs.months +
    parseInt(weeks) * timeUnitsInMs.weeks +
    parseInt(days) * timeUnitsInMs.days +
    parseInt(hours) * timeUnitsInMs.hours +
    parseInt(minutes) * timeUnitsInMs.minutes +
    parseInt(seconds) * timeUnitsInMs.seconds
  )
}

/**
 * Builds duration object for Intl.DurationFormat based on milliseconds and original string
 */
function buildDurationObject(
  durationMs: number,
  originalDurationString?: string
): DurationFormatInput {
  // If we have the original string, parse it directly to preserve exact units
  if (originalDurationString) {
    const match = originalDurationString.match(DURATION_PATTERN)
    if (match) {
      const [, years, months, weeks, days, hours, minutes, seconds] = match
      const result: DurationFormatInput = {}

      if (years !== undefined && years !== '0') {
        result.years = parseInt(years)
      }
      if (months !== undefined && months !== '0') {
        result.months = parseInt(months)
      }
      if (weeks !== undefined && weeks !== '0') {
        result.weeks = parseInt(weeks)
      }
      if (days !== undefined && days !== '0') {
        result.days = parseInt(days)
      }
      if (hours !== undefined && hours !== '0') {
        result.hours = parseInt(hours)
      }
      if (minutes !== undefined && minutes !== '0') {
        result.minutes = parseInt(minutes)
      }
      if (seconds !== undefined && seconds !== '0') {
        result.seconds = parseInt(seconds)
      }

      return result
    }
  }

  // Fallback to calculating from milliseconds
  const absDuration = Math.abs(durationMs)
  const units = {
    years: Math.floor(absDuration / timeUnitsInMs.years),
    months: Math.floor(
      (absDuration % timeUnitsInMs.years) / timeUnitsInMs.months
    ),
    weeks: Math.floor(
      (absDuration % timeUnitsInMs.months) / timeUnitsInMs.weeks
    ),
    days: Math.floor(
      (absDuration % timeUnitsInMs.weeks) / timeUnitsInMs.days
    ),
    hours: Math.floor(
      (absDuration % timeUnitsInMs.days) / timeUnitsInMs.hours
    ),
    minutes: Math.floor(
      (absDuration % timeUnitsInMs.hours) / timeUnitsInMs.minutes
    ),
    seconds: Math.floor(
      (absDuration % timeUnitsInMs.minutes) / timeUnitsInMs.seconds
    ),
  }

  if (durationMs === 0 && originalDurationString) {
    // For zero duration, preserve original structure
    const match = originalDurationString.match(DURATION_PATTERN)
    if (match) {
      const [, years, months, weeks, days, hours, minutes, seconds] = match
      const result: DurationFormatInput = {}
      // Check if the unit was specified in the original string (even if 0)
      // The regex groups will be undefined if not present, or a string if present
      if (years !== undefined) {
        result.years = 0
      }
      if (months !== undefined) {
        result.months = 0
      }
      if (weeks !== undefined) {
        result.weeks = 0
      }
      if (days !== undefined) {
        result.days = 0
      }
      if (hours !== undefined) {
        result.hours = 0
      }
      if (minutes !== undefined) {
        result.minutes = 0
      }
      if (seconds !== undefined) {
        result.seconds = 0
      }
      // If no units were specified, default to seconds
      return Object.keys(result).length > 0 ? result : { seconds: 0 }
    }
    return { seconds: 0 }
  }

  // Only include non-zero units for non-zero durations
  return Object.fromEntries(
    Object.entries(units).filter(([, value]) => value > 0)
  )
}

/**
 * Creates a duration formatter with fallback support
 */
function createDurationFormatter(
  locale: string,
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
): DurationFormat | null {
  try {
    const DurationFormat = (Intl as any)
      .DurationFormat as DurationFormatConstructor
    return new DurationFormat(locale, {
      style:
        dateStyle === 'short'
          ? 'narrow'
          : dateStyle === 'medium'
          ? 'short'
          : 'long',
    })
  } catch {
    return null
  }
}

/**
 * Formats a duration in milliseconds to a human-readable string
 * based on the locale and options
 */
export function formatDuration(
  durationMs: number,
  locale: AnyLocale = defaultLocale,
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'],
  originalDurationString?: string
): string {
  if (!Number.isFinite(durationMs)) {
    return '0 seconds'
  }

  const durationObject = buildDurationObject(
    durationMs,
    originalDurationString
  )

  // Try primary locale
  let formatter = createDurationFormatter(locale, dateStyle)
  if (formatter) {
    try {
      const result = formatter.format(durationObject)
      // For zero durations, Intl.DurationFormat might return empty string
      // so we need to check if it's empty and fall back to manual formatting
      if (result && result.trim() !== '') {
        return result
      }
    } catch {
      // Fallback to next formatter
    }
  }

  // Try English fallback
  formatter = createDurationFormatter('en', dateStyle)
  if (formatter) {
    try {
      const result = formatter.format(durationObject)
      if (result && result.trim() !== '') {
        return result
      }
    } catch {
      // Fallback to manual formatting
    }
  }

  // Ultimate fallback
  if (durationMs === 0) {
    return '0'
  }

  // Format non-zero durations
  const parts: string[] = []
  const unitLabels = {
    years: 'year',
    months: 'month',
    weeks: 'week',
    days: 'day',
    hours: 'hour',
    minutes: 'minute',
    seconds: 'second',
  }

  Object.entries(durationObject).forEach(([unit, value]) => {
    if (value > 0) {
      const label = unitLabels[unit as keyof typeof unitLabels]
      parts.push(`${value} ${label}${value === 1 ? '' : 's'}`)
    }
  })

  return parts.length > 0 ? parts.join(' ') : '0 seconds'
}

/**
 * Checks if a string is a valid ISO 8601 duration
 */
export function isValidDuration(durationString: string): boolean {
  if (!durationString || typeof durationString !== 'string') {
    return false
  }

  const match = durationString.match(DURATION_PATTERN)
  if (!match) {
    return false
  }

  const [, years, months, weeks, days, hours, minutes, seconds] = match
  // Must have at least one component (0 values are valid in ISO 8601)
  return !!(
    years !== undefined ||
    months !== undefined ||
    weeks !== undefined ||
    days !== undefined ||
    hours !== undefined ||
    minutes !== undefined ||
    seconds !== undefined
  )
}

export function getOsloDate(date: Date = new Date()): Date {
  const OSLO_TIMEZONE = 'Europe/Oslo'

  // en-CA matches the ISO date format yyyy-MM-dd
  const osloDateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: OSLO_TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const osloDateString = osloDateFormatter.format(date)
  // Parse the ISO date string and create a UTC Date object with midnight
  return new Date(osloDateString + 'T00:00:00.000Z')
}
