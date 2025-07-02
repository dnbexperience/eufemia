import React, { useContext, useMemo } from 'react'
import SharedContext, { InternalLocale } from '../../shared/Context'
import { convertJsxToString } from '../../shared/component-helper'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import { formatDate, getRelativeTime } from './DateFormatUtils'
import { format } from 'date-fns'
import { SpacingProps } from '../space/types'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingUtils'
import { SkeletonShow } from '../Skeleton'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import { useTranslation } from '../../shared'

type DateFormatProps = SpacingProps & {
  /**
   * The date that will be formatted.
   */
  value?: Date | string
  /**
   * Defines the style used to format the date. Defaults to `long`.
   * Defaults to `long`.
   */
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  /**
   * A boolean.
   * Defaults to `false`
   */
  relativeTime?: boolean
  /**
   * A string in {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument | Intl.DateTimeFormat locale} accepted format.
   * Defaults to `nb-NO`
   */
  locale?: InternalLocale

  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  children?: React.ReactNode
}

function DateFormat(props: DateFormatProps) {
  const context = useContext(SharedContext)
  const { invalidDate } = useTranslation().DateFormat

  const {
    value,
    locale = context.locale,
    dateStyle = 'long',
    children,
    skeleton,
    relativeTime = false,
  } = props

  const date = useMemo(
    () => getDate({ value, children }),
    [value, children]
  )

  const attributes = {}
  skeletonDOMAttributes(attributes, skeleton, context)

  if (!date) {
    return (
      <span className="dnb-date-format">
        {invalidDate.replace(
          '{value}',
          getInvalidValue({ value, children })
        )}
      </span>
    )
  }

  if (relativeTime) {
    return <span className="dnb-date-format">{getRelativeTime(date)}</span>
  }

  return (
    <time
      className={classnames(
        'dnb-date-format',
        createSpacingClasses(props),
        createSkeletonClass('font', skeleton, context)
      )}
      lang={locale}
      // Makes sure that screen readers are reading the date correctly in the system language.
      dateTime={format(date, 'yyyy-MM-dd')}
      {...attributes}
    >
      {formatDate(date, {
        locale,
        options: {
          dateStyle,
        },
      })}
    </time>
  )
}

function getDate({
  value,
  children,
}: Pick<DateFormatProps, 'value' | 'children'>) {
  if (value) {
    return convertStringToDate(value)
  }

  return convertStringToDate(convertJsxToString(children))
}

function getInvalidValue({
  value,
  children,
}: Pick<DateFormatProps, 'value' | 'children'>) {
  if (value instanceof Date) {
    return value.toString()
  }

  if (children !== undefined && value === undefined) {
    return String(children)
  }

  return value
}

export default DateFormat

DateFormat._supportsSpacingProps = true
