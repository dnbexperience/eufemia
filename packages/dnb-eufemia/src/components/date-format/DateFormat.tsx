import React from 'react'
import { InternalLocale } from '../../shared/Context'
import { convertJsxToString } from '../../shared/component-helper'
import { LOCALE as defaultLocale } from '../../shared/defaults'
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
}

export default function DateFormat({
  date,
  locale = defaultLocale,
  dateStyle = 'long',
  weekday,
  day,
  month,
  year,
  children,
}: DateFormatProps) {
  const dateToFormat = getDateToFormat({ date, children })

  return (
    <time className="dnb-date-format">
      {formatDate(dateToFormat, {
        locale,
        options: {
          ...getDateOptions({ dateStyle, weekday, day, month, year }),
        },
      })}
    </time>
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

function getDateToFormat({
  date,
  children,
}: Pick<DateFormatProps, 'date' | 'children'>) {
  if (children) {
    return convertStringToDate(convertJsxToString(children))
  }

  return date
}
