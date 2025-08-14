import { AnyLocale } from '../../shared/Context'
import { LOCALE as defaultLocale } from '../../shared/defaults'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { DateType } from '../date-picker/DatePickerContext'

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
 */
export function getRelativeTime(
  date: Date,
  locale: AnyLocale = defaultLocale,
  options: Intl.RelativeTimeFormatOptions = {
    numeric: 'always',
    style: 'long',
  },
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
) {
  // Map dateStyle to RelativeTimeFormat style for consistent styling
  const relativeTimeOptions: Intl.RelativeTimeFormatOptions = {
    ...options,
    style:
      dateStyle === 'short'
        ? 'short'
        : dateStyle === 'medium'
        ? 'narrow'
        : 'long',
  }

  const relativeTimeFormatter = new Intl.RelativeTimeFormat(
    locale,
    relativeTimeOptions
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

/**
 * Parses an ISO 8601 duration string (e.g., "PT2H30M", "P1DT2H30M")
 * and returns the duration in milliseconds
 */
export function parseDuration(durationString: string): number {
  if (!durationString || typeof durationString !== 'string') {
    return 0
  }

  const match = durationString.match(
    /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
  )

  if (!match) {
    return 0
  }

  const [, days = '0', hours = '0', minutes = '0', seconds = '0'] = match

  const totalMs =
    parseInt(days) * 24 * 60 * 60 * 1000 +
    parseInt(hours) * 60 * 60 * 1000 +
    parseInt(minutes) * 60 * 1000 +
    parseInt(seconds) * 1000

  return totalMs
}

/**
 * Formats a duration in milliseconds to a human-readable string
 * based on the locale and options
 */
export function formatDuration(
  durationMs: number,
  locale: AnyLocale = defaultLocale,
  options: Intl.RelativeTimeFormatOptions = {
    numeric: 'always',
    style: 'long',
  },
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle'],
  originalDurationString?: string
): string {
  if (!Number.isFinite(durationMs)) {
    return '0 seconds'
  }

  // For zero duration, we need to preserve the original structure
  // This will be handled by the main logic below
  if (durationMs === 0) {
    // We'll let the main logic handle this with all units set to 0
    // This preserves the original duration structure
  }

  const absDuration = Math.abs(durationMs)

  // Calculate all units
  const years = Math.floor(absDuration / timeUnitsInMs.years)
  const months = Math.floor(
    (absDuration % timeUnitsInMs.years) / timeUnitsInMs.months
  )
  const weeks = Math.floor(
    (absDuration % timeUnitsInMs.months) / timeUnitsInMs.weeks
  )
  const days = Math.floor(
    (absDuration % timeUnitsInMs.weeks) / timeUnitsInMs.days
  )
  const hours = Math.floor(
    (absDuration % timeUnitsInMs.days) / timeUnitsInMs.hours
  )
  const minutes = Math.floor(
    (absDuration % timeUnitsInMs.hours) / timeUnitsInMs.minutes
  )
  const seconds = Math.floor(
    (absDuration % timeUnitsInMs.minutes) / timeUnitsInMs.seconds
  )

  try {
    // Use Intl.DurationFormat for proper localization and styling
    const DurationFormat = (Intl as any)
      .DurationFormat as DurationFormatConstructor
    const formatter = new DurationFormat(locale, {
      style:
        dateStyle === 'short'
          ? 'short'
          : dateStyle === 'medium'
          ? 'narrow'
          : 'long',
    })

    const durationObject: DurationFormatInput = {}
    // For zero duration, include all units to preserve structure
    // For non-zero duration, only include non-zero units
    if (durationMs === 0) {
      // For zero duration, we need to be more careful about which units to include
      // Intl.DurationFormat might not handle all-zero objects well
      // Let's use the original duration string to determine which units to include
      if (originalDurationString) {
        const match = originalDurationString.match(
          /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
        )
        if (match) {
          const [, days, hours, minutes, seconds] = match
          // Only include units that were explicitly specified in the original string
          if (days !== undefined) {
            durationObject.days = 0
          }
          if (hours !== undefined) {
            durationObject.hours = 0
          }
          if (minutes !== undefined) {
            durationObject.minutes = 0
          }
          if (seconds !== undefined) {
            durationObject.seconds = 0
          }
        }
      }

      // If we couldn't determine from original string, fall back to including seconds
      if (Object.keys(durationObject).length === 0) {
        durationObject.seconds = 0
      }
    } else {
      // Only include non-zero units for non-zero durations
      if (years > 0) {
        durationObject.years = years
      }
      if (months > 0) {
        durationObject.months = months
      }
      if (weeks > 0) {
        durationObject.weeks = weeks
      }
      if (days > 0) {
        durationObject.days = days
      }
      if (hours > 0) {
        durationObject.hours = hours
      }
      if (minutes > 0) {
        durationObject.minutes = minutes
      }
      if (seconds > 0) {
        durationObject.seconds = seconds
      }
    }

    const result = formatter.format(durationObject)

    // Check if the result is empty or unexpected for zero durations
    if (durationMs === 0 && (!result || result.trim() === '')) {
      // Intl.DurationFormat returned empty result, fall back to manual formatting
      if (originalDurationString) {
        const match = originalDurationString.match(
          /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
        )
        if (match) {
          const [, days, hours, minutes, seconds] = match
          const parts: string[] = []

          // Include units that were explicitly specified in the original string
          if (days !== undefined) parts.push('0 days')
          if (hours !== undefined) parts.push('0 hours')
          if (minutes !== undefined) parts.push('0 minutes')
          if (seconds !== undefined) parts.push('0 seconds')

          if (parts.length > 0) {
            return parts.join(' ')
          }
        }
      }
      // Ultimate fallback
      return '0 seconds'
    }

    return result
  } catch {
    // Fallback to English if locale is not supported
    try {
      const DurationFormat = (Intl as any)
        .DurationFormat as DurationFormatConstructor
      const formatter = new DurationFormat('en', {
        style:
          dateStyle === 'short'
            ? 'short'
            : dateStyle === 'medium'
            ? 'narrow'
            : 'long',
      })

      const durationObject: DurationFormatInput = {}
      // Same logic as above for fallback
      if (durationMs === 0) {
        durationObject.years = 0
        durationObject.months = 0
        durationObject.weeks = 0
        durationObject.days = 0
        durationObject.hours = 0
        durationObject.minutes = 0
        durationObject.seconds = 0
      } else {
        if (years > 0) {
          durationObject.years = years
        }
        if (months > 0) {
          durationObject.months = months
        }
        if (weeks > 0) {
          durationObject.weeks = weeks
        }
        if (days > 0) {
          durationObject.days = days
        }
        if (hours > 0) {
          durationObject.hours = hours
        }
        if (minutes > 0) {
          durationObject.minutes = minutes
        }
        if (seconds > 0) {
          durationObject.seconds = seconds
        }
      }

      return formatter.format(durationObject)
    } catch {
      // Ultimate fallback - use simple format
      if (durationMs === 0) {
        // For zero duration, try to preserve the original structure
        if (originalDurationString) {
          // Parse the original string to determine which units were specified
          const match = originalDurationString.match(
            /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
          )
          if (match) {
            const [, days, hours, minutes, seconds] = match
            const parts: string[] = []

            // Include units that were explicitly specified in the original string
            if (days !== undefined) parts.push('0 days')
            if (hours !== undefined) parts.push('0 hours')
            if (minutes !== undefined) parts.push('0 minutes')
            if (seconds !== undefined) parts.push('0 seconds')

            if (parts.length > 0) {
              return parts.join(' ')
            }
          }
        }
        // Generic fallback if we can't determine structure
        return '0 seconds'
      }

      const parts: string[] = []
      if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`)
      if (months > 0)
        parts.push(`${months} month${months === 1 ? '' : 's'}`)
      if (weeks > 0) parts.push(`${weeks} week${weeks === 1 ? '' : 's'}`)
      if (days > 0) parts.push(`${days} day${days === 1 ? '' : 's'}`)
      if (hours > 0) parts.push(`${hours} hour${hours === 1 ? '' : 's'}`)
      if (minutes > 0)
        parts.push(`${minutes} minute${minutes === 1 ? '' : 's'}`)
      if (seconds > 0)
        parts.push(`${seconds} second${seconds === 1 ? '' : 's'}`)

      return parts.length > 0 ? parts.join(' ') : '0 seconds'
    }
  }
}

/**
 * Checks if a string is a valid ISO 8601 duration
 */
export function isValidDuration(durationString: string): boolean {
  if (!durationString || typeof durationString !== 'string') {
    return false
  }

  // ISO 8601 duration pattern:
  // P - period designator
  // (optional) D - days
  // T - time designator (required if time components follow)
  // (optional) H - hours
  // (optional) M - minutes
  // (optional) S - seconds
  // Must have at least one component (D, H, M, or S)
  const durationPattern =
    /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
  const match = durationPattern.test(durationString)

  // Must have at least one component
  if (match) {
    const parts = durationString.match(
      /^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/
    )
    if (parts) {
      const [, days, hours, minutes, seconds] = parts
      // Allow 0 values as they are valid in ISO 8601
      return !!(
        days !== undefined ||
        hours !== undefined ||
        minutes !== undefined ||
        seconds !== undefined
      )
    }
  }

  return false
}
