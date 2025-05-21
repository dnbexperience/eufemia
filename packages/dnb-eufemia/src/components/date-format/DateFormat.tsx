import { InternalLocale } from '../../shared/Context'
import { convertJsxToString } from '../../shared/component-helper'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { formatDate } from './DateUtils'

type DateFormatProps = {
  /**
   * The date that will be formatted.
   */
  date?: Date | string
  /**
   * Locale used for formatting.
   * Defaults to `nb-NO`
   */
  locale?: InternalLocale
  children?: React.ReactNode
} & DateFormatOptions

type DateFormatOptions = {
  /**
   * Defines the formatting  used for dates. (weekday, day, month year)
   * Cannot be used together with `weekday`, `day`, `month` and `year`.
   * Defaults to `long`.
   */
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  /**
   * Defines the formatting for time. (hour, minute, second)
   * Cannot be used together with `hour`, `minute`, and `second`.
   * Defaults to `undefined`.
   */
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle']
  /**
   * Defines the formatting used for weekdays.
   * Cannot be used together with `dateStyle`.
   * Defaults to `undefined`.
   */
  weekday?: Intl.DateTimeFormatOptions['weekday']
  /**
   * Defines the formatting used for days.
   * Cannot be used together with `dateStyle`.
   * Defaults to `undefined`.
   */
  day?: Intl.DateTimeFormatOptions['day']
  /**
   * Defines the formatting used for months.
   * Cannot be used together with `dateStyle`.
   * Defaults to `undefined`.
   */
  month?: Intl.DateTimeFormatOptions['month']
  /**
   * Defines the formatting used for years.
   * Cannot be used together with `dateStyle`.
   * Defaults to `undefined`.
   */
  year?: Intl.DateTimeFormatOptions['year']
  /**
   * Defines the formatting used for hours.
   * Cannot be used together with `timeStyle`.
   * Defaults to `undefined`.
   */
  hour?: Intl.DateTimeFormatOptions['hour']
  /**
   * Defines the formatting used for minutes.
   * Cannot be used together with `timeStyle`.
   * Defaults to `undefined`.
   */
  minute?: Intl.DateTimeFormatOptions['minute']
  /**
   * Defines the formatting used for seconds.
   * Cannot be used together with `timeStyle`.
   * Defaults to `undefined`.
   */
  second?: Intl.DateTimeFormatOptions['second']
}

export default function DateFormat({
  date,
  locale = 'nb-NO',
  dateStyle = 'long',
  timeStyle,
  weekday,
  day,
  month,
  year,
  hour,
  minute,
  second,
  children,
}: DateFormatProps) {
  const dateToFormat = getDateToFormat({ date, children })

  return (
    <span>
      {formatDate(dateToFormat, {
        locale,
        options: {
          ...getDateOptions({ dateStyle, weekday, day, month, year }),
          ...getTimeOptions({ timeStyle, hour, minute, second }),
        },
      })}
    </span>
  )
}

function getDateOptions({
  dateStyle,
  weekday,
  day,
  month,
  year,
}: Pick<
  DateFormatOptions,
  'dateStyle' | 'weekday' | 'day' | 'month' | 'year'
>) {
  // Prioritize date segment formatting if defined, as weekday, day, month and year options cannot be used at the same time as dateStyle.
  // Prevents application from crashing if developer defines segment formatting at the same time as dateStyle is used.
  if (weekday || day || year || month) {
    return { weekday, day, year, month }
  }

  return { dateStyle }
}

function getTimeOptions({
  timeStyle,
  hour,
  minute,
  second,
}: Pick<DateFormatOptions, 'timeStyle' | 'hour' | 'minute' | 'second'>) {
  // Prioritize time segment formatting if defined, as hour, minute and second options cannot be used at the same time as timeStyle
  // Prevents application from crashing if developer defines segment formatting at the same time as timeStyle is used.
  if (hour || minute || second) {
    return { hour, minute, second }
  }

  return { timeStyle }
}

function getDateToFormat({
  date,
  children,
}: Pick<DateFormatProps, 'date' | 'children'>) {
  if (children) {
    return convertStringToDate(convertJsxToString(children))
  }

  return date
}
