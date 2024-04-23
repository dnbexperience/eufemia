/**
 * Web DatePicker Provider
 *
 */

import React, { useContext, useEffect, useState } from 'react'
import type { DatePickerProps } from './DatePicker'

import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

import SharedContext from '../../shared/Context'
import {
  isTrue,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { correctV1Format, isDisabled } from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'
import useViews, { CalendarViews } from './hooks/useViews'
import useDates from './hooks/useDates'
import useLastEventCallCache from './hooks/useLastEventCallCache'

type DatePickerProviderProps = DatePickerProps & {
  setReturnObject: (...args: any[]) => any
  enhanceWithMethods?: Record<string, unknown>
  attributes?: Record<string, unknown>
  children: React.ReactNode
}

export type DatePickerProviderState = {
  lastEventCallCache?: { startDate?: Date; endDate?: Date }
  date?: Date | string
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  startMonth?: Date
  endMonth?: Date
  partialStartDate?: Date
  partialEndDate?: Date
  views?: CalendarViews
  hasHadValidDate?: boolean
  hoverDate?: Date
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

const defaultProps = {
  min_date: null,
  max_date: null,
  return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
  attributes: null,
  enhanceWithMethods: null,
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

  const hasValidStartDate = isValid(dates.startDate)
  const hasValidEndDate = isValid(dates.endDate)

  const [state, setState] = useState<DatePickerProviderState>({
    hasHadValidDate: hasValidStartDate || hasValidEndDate,
  })

  if (typeof props.setReturnObject === 'function') {
    props.setReturnObject(getReturnObject)
  }

  function updateState(state, cb = null) {
    setState((currentState) => ({ ...currentState, ...state }))
    cb?.()
  }

  function callOnChangeHandler(args) {
    /**
     * Prevent on_change to be fired twice if date not has actually changed
     * We clear the cache inside getDerivedStateFromProps
     * Can be removed when dispatchCustomElementEvent is deprecated
     */
    if (
      lastEventCallCache &&
      lastEventCallCache.startDate === args.startDate &&
      lastEventCallCache.endDate === args.endDate
    ) {
      return // stop here
    }

    dispatchCustomElementEvent(
      { on_change: props.on_change },
      'on_change',
      getReturnObject({ ...dates, ...args })
    )

    setLastEventCallCache({
      startDate: args.startDate,
      endDate: args.endDate,
    })
  }

  function getReturnObject({ event = null, ...rest } = {}) {
    const { startDate, endDate, partialStartDate, partialEndDate } = {
      ...state,
      ...views,
      ...dates,
      ...rest,
    }

    const attributes = props.attributes || {}
    const returnFormat = correctV1Format(props.return_format)
    const startDateIsValid = Boolean(startDate && isValid(startDate))
    const endDateIsValid = Boolean(endDate && isValid(endDate))

    let ret = null

    if (isTrue(props.range)) {
      ret = {
        event,
        attributes,
        days_between:
          startDateIsValid && endDateIsValid
            ? differenceInCalendarDays(endDate, startDate)
            : null,
        start_date: startDateIsValid
          ? format(startDate, returnFormat)
          : null,
        end_date: endDateIsValid ? format(endDate, returnFormat) : null,
        is_valid_start_date: startDateIsValid,
        is_valid_end_date: endDateIsValid,
        partialStartDate,
        partialEndDate,
      }
    } else {
      ret = {
        event,
        attributes,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        partialStartDate,
        is_valid: startDateIsValid,
      }
    }

    if (props.min_date || props.max_date) {
      if (isTrue(props.range)) {
        if (
          startDateIsValid &&
          isDisabled(startDate, dates.minDate, dates.maxDate)
        ) {
          ret.is_valid_start_date = false
        }
        if (
          endDateIsValid &&
          isDisabled(endDate, dates.minDate, dates.maxDate)
        ) {
          ret.is_valid_end_date = false
        }
      } else {
        if (
          startDateIsValid &&
          isDisabled(startDate, dates.minDate, dates.maxDate)
        ) {
          ret.is_valid = false
        }
      }
    }

    return ret
  }

  const { children } = props

  return (
    <DatePickerContext.Provider
      value={{
        translation: sharedContext.translation,
        setViews,
        updateState,
        updateDates,
        getReturnObject,
        callOnChangeHandler,
        props,
        ...props.enhanceWithMethods,
        ...state,
        ...dates,
        previousDates,
        hasHadValidDate,
        views,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider
