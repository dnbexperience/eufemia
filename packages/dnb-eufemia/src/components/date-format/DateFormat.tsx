import React, { useContext, useMemo } from 'react'
import SharedContext, { InternalLocale } from '../../shared/Context'
import { convertJsxToString } from '../../shared/component-helper'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { formatDate } from './DateUtils'
import { format } from 'date-fns'
import { SpacingProps } from '../space/types'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingUtils'
import { SkeletonShow } from '../Skeleton'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'

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

type DateFormatOptions = SpacingProps & {
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
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
}

function DateFormat(props: DateFormatProps) {
  const context = useContext(SharedContext)

  const {
    date,
    locale = context.locale,
    dateStyle = 'long',
    weekday,
    day,
    month,
    year,
    children,
    skeleton,
  } = props

  const dateObject = useMemo(
    () => getDateObject({ date, children }),
    [date, children]
  )

  const attributes = {}
  skeletonDOMAttributes(attributes, skeleton, context)

  return (
    <time
      // Make dateTime attribute correspond with the props provided i.e. weekday, day, month, year
      dateTime={format(dateObject, 'yyyy-MM-dd')}
      className={classnames(
        'dnb-date-format',
        createSpacingClasses(props),
        createSkeletonClass('font', skeleton, context)
      )}
      {...attributes}
    >
      {formatDate(dateObject, {
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

function getDateObject({
  date,
  children,
}: Pick<DateFormatProps, 'date' | 'children'>) {
  if (children) {
    return convertStringToDate(convertJsxToString(children))
  }

  return convertStringToDate(date)
}

export default DateFormat

DateFormat._supportsSpacingProps = true
