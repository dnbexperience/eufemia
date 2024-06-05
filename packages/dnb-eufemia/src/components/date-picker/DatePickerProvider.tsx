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
import { dispatchCustomElementEvent } from '../../shared/component-helper'
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

export type DatePickerChangeEvent = DatePickerDates & {
  nr?: number
  hidePicker?: boolean
  event:
    | React.MouseEvent<
        HTMLButtonElement | HTMLAnchorElement | HTMLSpanElement
      >
    | React.ChangeEvent<HTMLButtonElement | HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>
    | React.KeyboardEvent<
        HTMLTableElement | HTMLButtonElement | HTMLInputElement
      >
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

  const sharedContext = useContext(SharedContext)

  const [dates, updateDates, hasHadValidDate, previousDates] = useDates(
    {
      date: props.date,
      startDate: props.start_date,
      endDate: props.end_date,
      startMonth: props.start_month,
      endMonth: props.end_month,
      minDate: props.min_date,
      maxDate: props.max_date,
    },
    {
      dateFormat: props.date_format,
      isRange: props.range,
      shouldCorrectDate: props.correct_invalid_date,
    }
  )

  const [views, setViews] = useViews({
    startMonth: dates.startMonth,
    startDate: dates.startDate,
    endDate: dates.endDate,
    endMonth: dates.endMonth,
    isRange: props.range,
  })

  const [lastEventCallCache, setLastEventCallCache] =
    useLastEventCallCache({
      startDate: dates.startDate,
      endDate: dates.endDate,
    })

  const getReturnObject = useCallback(
    <E,>({ event = null, ...rest }: GetReturnObjectParams<E> = {}) => {
      console.log('rest', rest)
      const { startDate, endDate, partialStartDate, partialEndDate } = {
        ...views,
        ...dates,
        ...rest,
      }

      const returnFormat = correctV1Format(props.return_format)
      const startDateIsValid = Boolean(startDate && isValid(startDate))
      const endDateIsValid = Boolean(endDate && isValid(endDate))
      const hasMinOrMaxDates = props.min_date || props.max_date

      let returnObject: ReturnObject<E> = {
        event,
        attributes: props.attributes || {},
        partialStartDate,
      }

      // Handle range props
      if (props.range) {
        returnObject = {
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

        return returnObject
      }

      returnObject = {
        ...returnObject,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        is_valid:
          hasMinOrMaxDates &&
          startDateIsValid &&
          isDisabled(startDate, dates.minDate, dates.maxDate)
            ? false
            : startDateIsValid,
      }

      return returnObject
    },
    [
      dates,
      views,
      props.attributes,
      props.max_date,
      props.min_date,
      props.range,
      props.return_format,
    ]
  )

  const callOnChangeHandler = useCallback(
    (event: DatePickerChangeEvent) => {
      /**
       * Prevent on_change to be fired twice if date not has actually changed
       * We clear the cache inside getDerivedStateFromProps
       * Can be removed when dispatchCustomElementEvent is deprecated
       */
      if (
        lastEventCallCache &&
        lastEventCallCache.startDate === event.startDate &&
        lastEventCallCache.endDate === event.endDate
      ) {
        return // stop here
      }

      dispatchCustomElementEvent(
        { on_change: props.on_change },
        'on_change',
        getReturnObject({ ...dates, ...event })
      )

      setLastEventCallCache({
        startDate: event.startDate,
        endDate: event.endDate,
      })
    },
    [
      getReturnObject,
      lastEventCallCache,
      setLastEventCallCache,
      dates,
      props.on_change,
    ]
  )

  // Is this at any point something other than a function?
  if (typeof props.setReturnObject === 'function') {
    props.setReturnObject(getReturnObject)
  }

  return (
    <DatePickerContext.Provider
      value={{
        translation: sharedContext.translation,
        setViews,
        updateDates,
        getReturnObject,
        callOnChangeHandler,
        hidePicker: props.hidePicker,
        props,
        ...dates,
        previousDates,
        hasHadValidDate,
        views,
      }}
    >
      {props.children}
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider
