import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react'
import SharedContext, { InternalLocale } from '../../shared/Context'
import { convertStringToDate } from '../date-picker/DatePickerCalc'
import {
  formatDate,
  getRelativeTime,
  getRelativeTimeNextUpdateMs,
  parseDuration,
  formatDuration,
  isValidDuration,
} from './DateFormatUtils'
import { format } from 'date-fns/format'
import { SpacingProps } from '../space/types'
import classnames from 'classnames'
import { createSpacingClasses } from '../space/SpacingUtils'
import { SkeletonShow } from '../Skeleton'
import Tooltip from '../Tooltip'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'
import { useTranslation } from '../../shared'
import { convertJsxToString } from '../../shared/component-helper'

type DateFormatProps = SpacingProps & {
  value?: Date | string | number
  children?: React.ReactNode
  locale?: InternalLocale
  dateStyle?: Intl.DateTimeFormatOptions['dateStyle']
  timeStyle?: Intl.DateTimeFormatOptions['timeStyle']
  dateTimeSeparator?: string
  relativeTime?: boolean
  relativeTimeReference?: () => Date
  skeleton?: SkeletonShow
  className?: string
  id?: string
  title?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  'aria-describedby'?: string
}

function DateFormat(props: DateFormatProps) {
  const context = useContext(SharedContext)
  const { invalidDate } = useTranslation().DateFormat

  const {
    value,
    children,
    locale: localeProp,
    dateStyle = 'long',
    timeStyle,
    dateTimeSeparator,
    skeleton,
    relativeTime = false,
    relativeTimeReference,
  } = props

  const locale = localeProp || context.locale
  const ref = useRef<HTMLTimeElement>()

  const date = useMemo(() => {
    // Always call getDate to maintain expected console.log behavior
    return getDate({ value, children })
  }, [value, children])

  const durationValue = useMemo(() => {
    const durationString = String(value || children)

    if (!durationString || !isValidDuration(durationString)) {
      return // stop here
    }

    return parseDuration(durationString)
  }, [value, children])

  const getDuration = useCallback(
    (dateStyle: Intl.DateTimeFormatOptions['dateStyle']) => {
      if (durationValue === undefined) {
        return // stop here
      }

      return formatDuration(
        durationValue,
        locale,
        dateStyle,
        String(value || children)
      )
    },
    [children, durationValue, locale, value]
  )
  const durationFormatted = useMemo(() => {
    return getDuration(dateStyle)
  }, [dateStyle, getDuration])
  const durationFormattedFull = useMemo(() => {
    return getDuration('full')
  }, [getDuration])

  const attributes = useMemo(() => {
    const attrs = {
      className: classnames(
        'dnb-date-format',
        createSpacingClasses(props),
        createSkeletonClass('font', skeleton, context)
      ),
      lang: locale, // Makes sure that screen readers are reading the date correctly in the system language.
    }
    skeletonDOMAttributes(attrs, skeleton, context)

    return attrs
  }, [props, skeleton, context, locale])

  const getAbsoluteDateTime = useCallback(
    (style = 'yyyy-MM-dd') => {
      if (!date || isNaN(date.getTime())) {
        return // stop here
      }

      return format(date, style)
    },
    [date]
  )

  const getAbsoluteDateFormatted = useCallback(
    ({
      options = {
        dateStyle,
        ...(timeStyle ? { timeStyle } : {}),
      },
    }: {
      options?: Intl.DateTimeFormatOptions
    } = {}) => {
      if (!date || isNaN(date.getTime())) {
        return // stop here
      }

      if (dateTimeSeparator && options?.timeStyle) {
        const formattedDate = formatDate(date, {
          locale,
          options: { dateStyle: options.dateStyle },
        })
        const formattedTime = formatDate(date, {
          locale,
          options: { timeStyle: options.timeStyle },
        })

        return `${formattedDate}${dateTimeSeparator}${formattedTime}`
      }

      return formatDate(date, {
        locale,
        options,
      })
    },
    [date, locale, dateStyle, timeStyle, dateTimeSeparator]
  )

  // Auto-updating relative time with minimal CPU: schedule updates only when the label changes next
  const [label, setLabel] = useState(() => {
    return relativeTime && date
      ? getRelativeTime(
          date,
          locale,
          undefined,
          dateStyle,
          relativeTimeReference
        )
      : undefined
  })

  useEffect(() => {
    if (!relativeTime || !date) {
      return
    }

    let timeoutId: NodeJS.Timeout

    const scheduleNextUpdate = () => {
      const delay = getRelativeTimeNextUpdateMs(
        date,
        relativeTimeReference
      )
      timeoutId = setTimeout(() => {
        const next = getRelativeTime(
          date,
          locale,
          undefined,
          dateStyle,
          relativeTimeReference
        )
        setLabel((prev) => (prev !== next ? next : prev))
        scheduleNextUpdate()
      }, delay)
    }

    setLabel(
      getRelativeTime(
        date,
        locale,
        undefined,
        dateStyle,
        relativeTimeReference
      )
    )
    scheduleNextUpdate()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [date, locale, relativeTime, dateStyle, relativeTimeReference])

  // Check if we have a valid date (not invalid Date object)
  const hasValidDate = date && !isNaN(date.getTime())

  // Always handle duration strings first if they exist
  if (durationValue !== undefined) {
    const originalDurationString = String(value || children)

    const hasAriaLabel = durationFormattedFull !== durationFormatted
    return (
      <time
        {...attributes}
        dateTime={originalDurationString}
        aria-label={hasAriaLabel ? durationFormattedFull : undefined}
      >
        <span aria-hidden={hasAriaLabel}>{durationFormatted}</span>
      </time>
    )
  }

  // Handle relative time mode
  if (relativeTime) {
    // If we have a valid date, render relative time
    if (hasValidDate) {
      return (
        <>
          <time
            dateTime={getAbsoluteDateTime('yyyy-MM-dd HH:mm:ss')}
            {...attributes}
            ref={ref}
          >
            {label}
          </time>
          <Tooltip
            targetElement={ref}
            tooltip={getAbsoluteDateFormatted({
              options: {
                dateStyle,
                timeStyle: timeStyle || 'short',
              },
            })}
          />
        </>
      )
    }

    // If relativeTime is true but no valid date, show invalid message
    return (
      <span className="dnb-date-format">
        {invalidDate.replace(
          '{value}',
          getInvalidValue({ value, children })
        )}
      </span>
    )
  }

  // For non-relative time mode, check if we have valid content
  if (!hasValidDate && !durationValue) {
    return (
      <span className="dnb-date-format">
        {invalidDate.replace(
          '{value}',
          getInvalidValue({ value, children })
        )}
      </span>
    )
  }

  // Default date rendering - only if we have a valid date
  if (hasValidDate) {
    return (
      <time dateTime={getAbsoluteDateTime()} {...attributes}>
        {getAbsoluteDateFormatted()}
      </time>
    )
  }

  // Fallback for invalid dates when not in relative time mode
  return (
    <span className="dnb-date-format">
      {invalidDate.replace(
        '{value}',
        getInvalidValue({ value, children })
      )}
    </span>
  )
}

function getDate({
  value,
  children,
}: Pick<DateFormatProps, 'value' | 'children'>) {
  if (value) {
    // Check if it's a duration string first to avoid unnecessary date conversion
    if (typeof value === 'string' && isValidDuration(value)) {
      return // stop here // Return undefined for duration strings to avoid date conversion
    }
    if (typeof value === 'string') {
      return convertStringToDate(value)
    }
    if (value instanceof Date) {
      return value
    }
    // For numbers, convert to string first
    return convertStringToDate(String(value))
  }

  const childrenValue = convertJsxToString(children)
  // Check if it's a duration string first to avoid unnecessary date conversion
  if (childrenValue && isValidDuration(childrenValue)) {
    return // stop here // Return undefined for duration strings to avoid date conversion
  }
  return convertStringToDate(childrenValue)
}

function getInvalidValue({
  value,
  children,
}: Pick<DateFormatProps, 'value' | 'children'>): string {
  if (value instanceof Date) {
    return value.toString()
  }

  if (children !== undefined && value === undefined) {
    return String(children)
  }

  return String(value)
}

export default DateFormat

DateFormat._supportsSpacingProps = true
