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
import { correctV1Format, isDisabled } from './DatePickerCalc'
import DatePickerContext, {
  DatePickerContextValues,
} from './DatePickerContext'
import useViews from './hooks/useViews'
import useDates, { DatePickerDates } from './hooks/useDates'
import useLastEventCallCache from './hooks/useLastEventCallCache'
import { InvalidDates } from './DatePickerInput'
import { PartialDates } from './hooks/usePartialDates'
import useHoverDate from './hooks/useHoverDate'
import useSubmittedDates from './hooks/useSubmittedDates'

type DatePickerProviderProps = DatePickerAllProps & {
  setReturnObject: (
    func: DatePickerContextValues['getReturnObject']
  ) => DatePickerContextValues['getReturnObject']
  hidePicker?: DatePickerContextValues['hidePicker']
  attributes?: DatePickerEventAttributes
  children: React.ReactNode
}

export type DatePickerChangeEvent<E> = DatePickerDates &
  InvalidDates & {
    nr?: number
    hidePicker?: boolean
    event?: E
  }

export type GetReturnObjectParams<E> = DatePickerDates &
  PartialDates &
  InvalidDates & {
    event?: E
  }

// TODO: convert properties on event handler return objects to camelCase, constitutes a breaking change
export type ReturnObject<E> = InvalidDates &
  PartialDates & {
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
    () => correctV1Format(returnFormatProp || defaultReturnFormat),
    [returnFormatProp, defaultReturnFormat]
  )

  const { dates, updateDates, previousDateProps } = useDates(
    {
      date,
      startDate,
      endDate,
      startMonth,
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
      const {
        startDate,
        endDate,
        partialStartDate,
        partialEndDate,
        invalidStartDate,
        invalidEndDate,
      } = {
        ...views,
        ...dates,
        ...rest,
      }

      const startDateIsValid = Boolean(startDate && isValid(startDate))
      const endDateIsValid = Boolean(endDate && isValid(endDate))
      const hasMinOrMaxDates = minDate || maxDate

      const returnObject: ReturnObject<E> = {
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
          partialStartDate,
          partialEndDate,
          invalidStartDate,
          invalidEndDate,
        }
      }

      return {
        ...returnObject,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        partialDate: partialStartDate,
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
    <DatePickerContext.Provider
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
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider
