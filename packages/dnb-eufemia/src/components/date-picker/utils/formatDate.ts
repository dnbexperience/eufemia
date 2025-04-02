import { parseISO } from 'date-fns'
import { AnyLocale } from '../../../shared/Context'
import { LOCALE } from '../../../shared/defaults'

export type FormatDateOptions = {
  locale?: AnyLocale
  variant?: 'long' | 'short' | 'numeric'
  formatOptions?: Intl.DateTimeFormatOptions
}

export function formatDate(
  value: string,
  {
    locale = LOCALE,
    variant = 'numeric',
    formatOptions = undefined,
  }: FormatDateOptions = {}
) {
  // Either of the range dates can be null
  const isRange =
    /^(\d{4}-\d{2}-\d{2}|null|undefined)\|(\d{4}-\d{2}-\d{2}|null|undefined)$/.test(
      value
    )
  const options = formatOptions ?? getOptions(variant)

  if (isRange) {
    const [startValue, endValue] = value.split('|')

    const startDate = parseISO(startValue)
    const endDate = parseISO(endValue)

    // Stop if either date is invalid
    if (isNaN(startDate.valueOf()) || isNaN(endDate.valueOf())) {
      return undefined
    }

    return typeof Intl !== 'undefined'
      ? new Intl.DateTimeFormat(locale, options).formatRange(
          startDate,
          endDate
        )
      : `${startDate.toLocaleString(
          locale,
          options
        )}|${endDate.toLocaleString(locale, options)}`
  }

  const date = parseISO(value)

  return typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat(locale, options).format(date)
    : date.toLocaleString(locale, options)
}

export function getOptions(
  variant: FormatDateOptions['variant']
): Intl.DateTimeFormatOptions {
  if (variant === 'numeric') {
    return {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    } as const
  }

  return {
    day: 'numeric',
    month: variant,
    year: 'numeric',
  } as const
}
