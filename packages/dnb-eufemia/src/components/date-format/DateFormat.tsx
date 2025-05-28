import React, { useContext, useMemo } from 'react'
import SharedContext, { InternalLocale } from '../../shared/Context'
import { convertJsxToString } from '../../shared/component-helper'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { formatDate } from './DateFormatUtils'
import { format } from 'date-fns'
import { SpacingProps } from '../space/types'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingUtils'
import { SkeletonShow } from '../Skeleton'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'

type DateFormatProps = SpacingProps & {
  /**
   * The date that will be formatted.
   */
  date?: Date | string
  /**
   * Locale used for formatting.
   * Defaults to `nb-NO`
   */
  /**
   * Defines the formatting  used for dates. (weekday, day, month year)
   * Cannot be used together with `weekday`, `day`, `month` and `year`.
   * Defaults to `long`.
   */
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  locale?: InternalLocale
  children?: React.ReactNode
}

function DateFormat(props: DateFormatProps) {
  const context = useContext(SharedContext)

  const {
    date,
    locale = context.locale,
    dateStyle = 'long',
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
      className={classnames(
        'dnb-date-format',
        createSpacingClasses(props),
        createSkeletonClass('font', skeleton, context)
      )}
      lang={locale}
      // Makes sure that screen readers are reading the date correctly in the system language.
      dateTime={format(dateObject, 'yyyy-MM-dd')}
      {...attributes}
    >
      {formatDate(dateObject, {
        locale,
        formatOptions: {
          dateStyle,
        },
      })}
    </time>
  )
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
