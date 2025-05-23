import { AnyLocale } from '../../shared/Context'
import { LOCALE as defaultLocale } from '../../shared/defaults'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { DateType } from '../date-picker/DatePickerContext'

export type FormatDateOptions = {
  locale?: AnyLocale
  options?: Intl.DateTimeFormatOptions
  /**
   * @deprecated use `options={{dateStyle}}` instead.
   */
  variant?: 'long' | 'short' | 'numeric'
  /**
   * @deprecated use `options`instead.
   */
  formatOptions?: Intl.DateTimeFormatOptions
}

export function formatDate(
  dateValue: DateType,
  { locale = defaultLocale, options = {} }: FormatDateOptions = {}
) {
  const date = convertStringToDate(dateValue)

  return typeof Intl !== 'undefined'
    ? new Intl.DateTimeFormat(locale, options).format(date)
    : date.toLocaleString(locale, options)
}

export function formatDateRange(
  dates: { startDate: DateType; endDate: DateType },
  { locale = defaultLocale, options = {} }: FormatDateOptions = {}
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
