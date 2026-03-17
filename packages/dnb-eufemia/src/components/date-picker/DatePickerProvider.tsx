/**
 * Web DatePicker Provider
 *
 */

import React, { useCallback, useContext, useMemo } from 'react'
import type {
  DatePickerEventAttributes,
  DatePickerAllProps,
} from './DatePicker'

import { isValid, format, differenceInCalendarDays } from 'date-fns'

import SharedContext from '../../shared/Context'
import { isDisabled } from './DatePickerCalc'
import type { DatePickerContextValue } from './DatePickerContext'
import DatePickerContext from './DatePickerContext'
import useViews from './hooks/useViews'
import type { DatePickerDates } from './hooks/useDates'
import useDates from './hooks/useDates'
import useLastEventCallCache from './hooks/useLastEventCallCache'
import type { DatePickerInvalidDates } from './DatePickerInput'
import type { DatePickerPartialDates } from './hooks/usePartialDates'
import useHoverDate from './hooks/useHoverDate'
import useSubmittedDates from './hooks/useSubmittedDates'

type DatePickerProviderProps = DatePickerAllProps & {
  setReturnObject: (
    func: DatePickerContextValue['getReturnObject']
  ) => DatePickerContextValue['getReturnObject']
  hidePicker?: DatePickerContextValue['hidePicker']
  attributes?: DatePickerEventAttributes
  children: React.ReactNode
}

export type DatePickerChangeEvent<E> = DatePickerDates &
  DatePickerInvalidDates & {
    nr?: number
    hidePicker?: boolean
    event?: E
  }

export type GetReturnObjectParams<E> = DatePickerDates &
  DatePickerPartialDates &
  DatePickerInvalidDates & {
    event?: E
  }

export type DatePickerReturnObject<E> = DatePickerInvalidDates &
  DatePickerPartialDates & {
    event?: E
    attributes?: Record<string, unknown>
    daysBetween?: number
    date?: string | null
    startDate?: string | null
    endDate?: string | null
    isValid?: boolean
    isValidStartDate?: boolean
    isValidEndDate?: boolean
  }

function DatePickerProvider(props: DatePickerProviderProps) {
  const sharedContext = useContext(SharedContext)

  const {
    returnFormat: defaultReturnFormat,
    dateFormat: defaultDateFormat,
  } = sharedContext.translation.DatePicker

  const {
    date,
    startDate,
    endDate,
    month,
    startMonth,
    endMonth,
    minDate,
    maxDate,
    dateFormat = defaultDateFormat,
    range,
    attributes,
    returnFormat: returnFormatProp,
    children,
    onChange,
    setReturnObject,
    hidePicker,
  } = props

  const returnFormat = useMemo(
    () => returnFormatProp || defaultReturnFormat,
    [returnFormatProp, defaultReturnFormat]
  )

  const { dates, updateDates, previousDateProps } = useDates(
    {
      date,
      startDate,
      endDate,
      startMonth: startMonth ?? month,
      endMonth,
      minDate,
      maxDate,
    },
    {
      dateFormat,
      isRange: range,
    }
  )

  const { views, setViews, setHasClickedCalendarDay } = useViews({
    startMonth: dates.startMonth,
    endMonth: dates.endMonth,
    isRange: range,
  })

  const [lastEventCallCache, setLastEventCallCache] =
    useLastEventCallCache({
      startDate: dates.startDate,
      endDate: dates.endDate,
    })

  const { hoverDate, setHoverDate } = useHoverDate()

  const { submittedDatesRef, setSubmittedDates } = useSubmittedDates()

  const getReturnObject = useCallback(
    <E,>({ event = null, ...rest }: GetReturnObjectParams<E> = {}) => {
      const { startDate, endDate, invalidStartDate, invalidEndDate } = {
        ...views,
        ...dates,
        ...rest,
      }

      const startDateIsValid = Boolean(startDate && isValid(startDate))
      const endDateIsValid = Boolean(endDate && isValid(endDate))
      const hasMinOrMaxDates = minDate || maxDate

      const returnObject: DatePickerReturnObject<E> = {
        event,
        attributes: attributes || {},
      }

      // Handle range props
      if (range) {
        return {
          ...returnObject,
          daysBetween:
            startDateIsValid && endDateIsValid
              ? differenceInCalendarDays(endDate, startDate)
              : null,
          startDate: startDateIsValid
            ? format(startDate, returnFormat)
            : null,
          endDate: endDateIsValid ? format(endDate, returnFormat) : null,
          isValidStartDate:
            hasMinOrMaxDates &&
            startDateIsValid &&
            isDisabled(startDate, dates.minDate, dates.maxDate)
              ? false
              : startDateIsValid,
          isValidEndDate:
            hasMinOrMaxDates &&
            endDateIsValid &&
            isDisabled(endDate, dates.minDate, dates.maxDate)
              ? false
              : endDateIsValid,
          invalidStartDate,
          invalidEndDate,
        }
      }

      return {
        ...returnObject,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        invalidDate: invalidStartDate,
        isValid:
          hasMinOrMaxDates &&
          startDateIsValid &&
          isDisabled(startDate, dates.minDate, dates.maxDate)
            ? false
            : startDateIsValid,
      }
    },
    [dates, views, attributes, maxDate, minDate, range, returnFormat]
  )

  const callOnChangeHandler = useCallback(
    <E,>(event: E & DatePickerDates) => {
      /**
       * Prevent onChange to be fired twice if date not has actually changed
       */
      if (
        lastEventCallCache &&
        lastEventCallCache.startDate === event.startDate &&
        lastEventCallCache.endDate === event.endDate
      ) {
        return // stop here
      }

      onChange?.(getReturnObject({ ...dates, ...event }))

      setLastEventCallCache({
        startDate: event.startDate,
        endDate: event.endDate,
      })
    },
    [
      getReturnObject,
      dates,
      onChange,
      lastEventCallCache,
      setLastEventCallCache,
    ]
  )

  // Is this at any point something other than a function?
  if (typeof setReturnObject === 'function') {
    setReturnObject(getReturnObject)
  }

  return (
    <DatePickerContext
      value={{
        translation: sharedContext.translation,
        updateDates,
        getReturnObject,
        callOnChangeHandler,
        hidePicker: hidePicker,
        props,
        dateFormat,
        ...dates,
        previousDateProps,
        submittedDates: submittedDatesRef.current,
        setSubmittedDates,
        views,
        setViews,
        setHasClickedCalendarDay,
        hoverDate,
        setHoverDate,
      }}
    >
      {children}
    </DatePickerContext>
  )
}

export default DatePickerProvider
