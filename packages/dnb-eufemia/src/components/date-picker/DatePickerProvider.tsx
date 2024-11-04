/**
 * Web DatePicker Provider
 *
 */

import React, { useCallback, useContext } from 'react'
import type {
  DatePickerEventAttributes,
  DatePickerProps,
} from './DatePicker'

import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

import SharedContext from '../../shared/Context'
import { correctV1Format, isDisabled } from './DatePickerCalc'
import DatePickerContext, {
  DatePickerContextValues,
} from './DatePickerContext'
import useViews, { CalendarView } from './hooks/useViews'
import useDates, { DatePickerDates } from './hooks/useDates'
import useLastEventCallCache, {
  LastEventCallCache,
} from './hooks/useLastEventCallCache'

type DatePickerProviderProps = DatePickerProps & {
  setReturnObject: (
    func: DatePickerContextValues['getReturnObject']
  ) => DatePickerContextValues['getReturnObject']
  hidePicker?: DatePickerContextValues['hidePicker']
  attributes?: DatePickerEventAttributes
  children: React.ReactNode
}

export type DatePickerChangeEvent<E> = DatePickerDates & {
  nr?: number
  hidePicker?: boolean
  event?: E
}

export type GetReturnObjectParams<E> = DatePickerDates & {
  event?: E
}
export type ReturnObject<E> = {
  event?: E
  attributes?: Record<string, unknown>
  days_between?: number
  date?: string
  start_date?: string
  end_date?: string
  is_valid?: boolean
  is_valid_start_date?: boolean
  is_valid_end_date?: boolean
  partialStartDate?: string
  partialEndDate?: string
}

export type DatePickerProviderState = DatePickerDates &
  Array<CalendarView> &
  LastEventCallCache

const defaultProps = {
  return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
}

function DatePickerProvider(externalProps: DatePickerProviderProps) {
  const props = { ...defaultProps, ...externalProps }

  const {
    date,
    start_date,
    end_date,
    start_month,
    end_month,
    min_date,
    max_date,
    date_format,
    range,
    correct_invalid_date,
    attributes,
    return_format,
    children,
    on_change,
    setReturnObject,
    hidePicker,
  } = props

  const sharedContext = useContext(SharedContext)

  const { dates, updateDates, hasHadValidDate, previousDates } = useDates(
    {
      date: date,
      startDate: start_date,
      endDate: end_date,
      startMonth: start_month,
      endMonth: end_month,
      minDate: min_date,
      maxDate: max_date,
    },
    {
      dateFormat: date_format,
      isRange: range,
      shouldCorrectDate: correct_invalid_date,
    }
  )

  const { views, setViews, forceViewMonthChange } = useViews({
    startMonth: dates.startMonth,
    endMonth: dates.endMonth,
    isRange: range,
  })

  const [lastEventCallCache, setLastEventCallCache] =
    useLastEventCallCache({
      startDate: dates.startDate,
      endDate: dates.endDate,
    })

  const getReturnObject = useCallback(
    <E,>({ event = null, ...rest }: GetReturnObjectParams<E> = {}) => {
      const { startDate, endDate, partialStartDate, partialEndDate } = {
        ...views,
        ...dates,
        ...rest,
      }

      const returnFormat = correctV1Format(return_format)
      const startDateIsValid = Boolean(startDate && isValid(startDate))
      const endDateIsValid = Boolean(endDate && isValid(endDate))
      const hasMinOrMaxDates = min_date || max_date

      const returnObject: ReturnObject<E> = {
        event,
        attributes: attributes || {},
        partialStartDate,
      }

      // Handle range props
      if (range) {
        return {
          ...returnObject,
          days_between:
            startDateIsValid && endDateIsValid
              ? differenceInCalendarDays(endDate, startDate)
              : null,
          start_date: startDateIsValid
            ? format(startDate, returnFormat)
            : null,
          end_date: endDateIsValid ? format(endDate, returnFormat) : null,
          is_valid_start_date:
            hasMinOrMaxDates &&
            startDateIsValid &&
            isDisabled(startDate, dates.minDate, dates.maxDate)
              ? false
              : startDateIsValid,
          is_valid_end_date:
            hasMinOrMaxDates &&
            endDateIsValid &&
            isDisabled(endDate, dates.minDate, dates.maxDate)
              ? false
              : endDateIsValid,
          partialEndDate,
        }
      }

      return {
        ...returnObject,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        is_valid:
          hasMinOrMaxDates &&
          startDateIsValid &&
          isDisabled(startDate, dates.minDate, dates.maxDate)
            ? false
            : startDateIsValid,
      }
    },
    [dates, views, attributes, max_date, min_date, range, return_format]
  )

  const callOnChangeHandler = useCallback(
    <E,>(event: E & DatePickerDates) => {
      /**
       * Prevent on_change to be fired twice if date not has actually changed
       */
      if (
        lastEventCallCache &&
        lastEventCallCache.startDate === event.startDate &&
        lastEventCallCache.endDate === event.endDate
      ) {
        return // stop here
      }

      on_change?.(getReturnObject({ ...dates, ...event }))

      setLastEventCallCache({
        startDate: event.startDate,
        endDate: event.endDate,
      })
    },
    [
      getReturnObject,
      dates,
      on_change,
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
        ...dates,
        previousDates,
        hasHadValidDate,
        views,
        setViews,
        forceViewMonthChange,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider
