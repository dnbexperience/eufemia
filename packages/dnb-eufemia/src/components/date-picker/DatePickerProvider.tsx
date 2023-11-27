/**
 * Web DatePicker Provider
 *
 */

import React, { useContext, useEffect, useRef, useState } from 'react'

import isSameMonth from 'date-fns/isSameMonth'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

import Context from '../../shared/Context'
import { dispatchCustomElementEvent } from '../../shared/component-helper'
import {
  convertStringToDate,
  correctV1Format,
  isDisabled,
} from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'
import { getViews } from './DatePickerRange'
import type { DatePickerProps } from './DatePicker'

type DatePickerProviderState = {
  _listenForPropChanges: boolean
  changeMonthViews: boolean
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  __startDay: string
  __startMonth: string
  __startYear: string
  hasHadValidDate: boolean
  __endDay: string
  __endMonth: string
  __endYear: string
  startMonth: Date
  endMonth: Date
  views: [
    {
      month: Date
      nr: number
    },
  ]
  _date: Date
  _startDate: Date
  _minDate: string
  _maxDate: string
  hoverDate: Date
  on_show: string
  lastEventCallCache: { startDate: Date; endDate: Date }
}

type DatePickerProviderProps = React.HTMLProps<HTMLElement> &
  DatePickerProps & {
    setReturnObject: (...args: any[]) => any
    enhanceWithMethods?: Record<string, unknown>
    attributes?: Record<string, unknown>
    children: React.ReactNode
  }

const defaultProps = {
  return_format: 'yyyy-MM-dd', // used in date-fns v1: YYYY-MM-DD
}

function DatePickerProvider(externalProps: DatePickerProviderProps) {
  const props = { ...defaultProps, ...externalProps }

  const [state, setState] = useState<DatePickerProviderState>({
    _listenForPropChanges: true,
    changeMonthViews: false,
  } as DatePickerProviderState)

  const context = useContext(Context)

  const setViewsCallbackRef = useRef<() => void>(null)
  const setStateCallbackRef = useRef<() => void>(null)

  getDerivedStateFromProps(props, state)

  useEffect(() => {
    if (typeof props.setReturnObject === 'function') {
      props.setReturnObject(getReturnObject)
    }
  }, [])

  // Set views callback
  useEffect(() => {
    if (setViewsCallbackRef.current) {
      setViewsCallbackRef.current()
    }
  }, [state?.views])

  // Set state callback
  useEffect(() => {
    if (setStateCallbackRef.current) {
      setStateCallbackRef.current()
    }
  }, [state])

  function getDerivedStateFromProps(props, state) {
    const isRange = props.range

    if (state._listenForPropChanges) {
      let startDate = undefined
      const date_format = props.date_format

      // Handle startDate/endDate
      if (
        typeof props.date !== 'undefined' &&
        props.date !== state._date
      ) {
        startDate = props.date
      }
      if (
        typeof props.start_date !== 'undefined' &&
        props.start_date !== state._startDate
      ) {
        startDate = props.start_date
      }
      if (
        typeof startDate !== 'undefined' &&
        startDate !== state.startDate
      ) {
        state.startDate =
          convertStringToDate(startDate, {
            date_format,
          }) || undefined

        if (!props.range) {
          state.endDate = state.startDate
        }
      }
      if (
        typeof props.end_date !== 'undefined' &&
        props.range &&
        props.end_date !== state._endDate
      ) {
        state.endDate =
          convertStringToDate(props.end_date, {
            date_format,
          }) || undefined
      }

      // Handle startMonth/endMonth
      if (
        typeof props.start_month !== 'undefined' &&
        props.start_month !== state._startMonth
      ) {
        state.startMonth = convertStringToDate(props.start_month, {
          date_format,
        })
      }
      if (
        typeof props.end_month !== 'undefined' &&
        props.end_month !== state._endMonth
      ) {
        state.endMonth = convertStringToDate(props.end_month, {
          date_format,
        })
      }

      // Handle minDate/maxDate
      if (
        typeof props.min_date !== 'undefined' &&
        props.min_date !== state._minDate
      ) {
        state.minDate = convertStringToDate(props.min_date, {
          date_format,
        })
      }
      if (
        typeof props.max_date !== 'undefined' &&
        props.max_date !== state._maxDate
      ) {
        state.maxDate = convertStringToDate(props.max_date, {
          date_format,
        })
      }

      /**
       * Because now we do not any more relay on auto "correction",
       * but rather return "is_valid_start_date=false"
       */
      if (props.correct_invalid_date) {
        if (isDisabled(state.startDate, state.minDate, state.maxDate)) {
          state.startDate = state.minDate
        }
        if (isDisabled(state.endDate, state.minDate, state.maxDate)) {
          state.endDate = state.maxDate
        }
      }
    }

    if (
      state.lastEventCallCache &&
      (state.lastEventCallCache.startDate !== state.startDate ||
        state.lastEventCallCache.endDate !== state.endDate)
    ) {
      state.lastEventCallCache = {}
    }

    if (isValid(state.startDate)) {
      state.__startDay = pad(format(state.startDate, 'dd'), 2)
      state.__startMonth = pad(format(state.startDate, 'MM'), 2)
      state.__startYear = format(state.startDate, 'yyyy')
      state.hasHadValidDate = true
    } else if (state.startDate === undefined) {
      state.__startDay = null
      state.__startMonth = null
      state.__startYear = null
    }

    if (isValid(state.endDate)) {
      state.__endDay = pad(format(state.endDate, 'dd'), 2)
      state.__endMonth = pad(format(state.endDate, 'MM'), 2)
      state.__endYear = format(state.endDate, 'yyyy')
      state.hasHadValidDate = true
    } else if (state.endDate === undefined) {
      state.__endDay = null
      state.__endMonth = null
      state.__endYear = null
    }

    if (
      !state.startMonth ||
      (state.changeMonthViews &&
        !isSameMonth(state.startMonth, state.startDate))
    ) {
      state.startMonth = state.startDate
    }

    if (
      !state.endMonth ||
      (isRange &&
        state.changeMonthViews &&
        !isSameMonth(state.endMonth, state.endDate))
    ) {
      state.endMonth = state.endDate || state.startMonth
    }

    state.views = getViews(state, isRange)

    // Update the months, in case they do not exist
    if (!state.startMonth) {
      state.startMonth = state.views[0].month
      if (
        isRange &&
        !state.endMonth &&
        typeof state.views[1] !== 'undefined'
      ) {
        state.endMonth = state.views[1].month
      }
    }

    state.changeMonthViews = false
    state._listenForPropChanges = true
    state._date = props.date
    state._startDate = props.start_date || props.date
    state._endDate = props.end_date
    state._startMonth = props.start_month
    state._endMonth = props.end_month
    state._month = props.month
    state._minDate = props.min_date
    state._maxDate = props.max_date

    setState((previousState) => ({ ...previousState, ...state }))
  }

  function setContextViews(views, cb = null) {
    setState((previousState) => ({
      ...previousState,
      views: { ...previousState.views, ...views },
      _listenForPropChanges: false,
    }))
    setViewsCallbackRef.current = cb
  }

  function updateState(state, cb = null) {
    setState((currentState) => ({
      ...currentState,
      ...state,
      _listenForPropChanges: false,
    }))
    setStateCallbackRef.current = cb
  }

  function callOnChangeHandler(args: any) {
    /**
     * Prevent on_change to be fired twice if date not has actually changed
     * We clear the cache inside getDerivedStateFromProps
     */
    if (
      state.lastEventCallCache &&
      state.lastEventCallCache.startDate === state.startDate &&
      state.lastEventCallCache.endDate === state.endDate
    ) {
      return // stop here
    }

    dispatchCustomElementEvent(this, 'on_change', getReturnObject(args))

    const lastEventCallCache = {
      startDate: state.startDate,
      endDate: state.endDate,
    }
    setState((currentState) => ({ ...currentState, lastEventCallCache }))
  }

  function getReturnObject({
    event = null,
    ...rest
  }: { event?: Event } = {}) {
    const { startDate, endDate } = { ...state, ...rest }
    const attributes = props.attributes || {}
    const returnFormat = correctV1Format(props.return_format)
    const startDateIsValid = Boolean(startDate && isValid(startDate))
    const endDateIsValid = Boolean(endDate && isValid(endDate))

    let ret = null

    if (props.range) {
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
      }
    } else {
      ret = {
        event,
        attributes,
        date: startDateIsValid ? format(startDate, returnFormat) : null,
        is_valid: startDateIsValid,
      }
    }

    if (props.min_date || props.max_date) {
      if (props.range) {
        if (
          startDateIsValid &&
          isDisabled(startDate, state.minDate, state.maxDate)
        ) {
          ret.is_valid_start_date = false
        }
        if (
          endDateIsValid &&
          isDisabled(endDate, state.minDate, state.maxDate)
        ) {
          ret.is_valid_end_date = false
        }
      } else {
        if (
          startDateIsValid &&
          isDisabled(startDate, state.minDate, state.maxDate)
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
        translation: context.translation,
        setViews: setContextViews,
        updateState,
        getReturnObject,
        callOnChangeHandler,
        props: props,
        ...props.enhanceWithMethods,
        ...state,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  )
}

export default DatePickerProvider

export const pad = (num, size) => ('000000000' + num).substr(-size)
