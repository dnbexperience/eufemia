import { AnyLocale } from '../../shared/Context'
import { LOCALE as defaultLocale } from '../../shared/defaults'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { DateType } from '../date-picker/DatePickerContext'

export type FormatDateOptions = {
  locale?: AnyLocale
  formatOptions?: Intl.DateTimeFormatOptions
}

export function formatDate(
  dateValue: DateType,
  {
    locale = defaultLocale,
    formatOptions = { dateStyle: 'short' },
  }: FormatDateOptions = {}
) {
  const date = convertStringToDate(dateValue)

  return typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat(locale, formatOptions).format(date)
    : date.toLocaleString(locale, formatOptions)
}

export function formatDateRange(
  dates: { startDate: DateType; endDate: DateType },
  {
    locale = defaultLocale,
    formatOptions = { dateStyle: 'long' },
  }: FormatDateOptions = {}
) {
  const startDate = convertStringToDate(dates.startDate)
  const endDate = convertStringToDate(dates.endDate)

  if (typeof Intl !== 'undefined') {
    return new Intl.DateTimeFormat(locale, formatOptions).formatRange(
      startDate,
      endDate
    )
  }

  const startDateString = startDate.toLocaleString(locale, formatOptions)
  const endDateString = endDate.toLocaleString(locale, formatOptions)

  return `${startDateString}-${endDateString}`
}
