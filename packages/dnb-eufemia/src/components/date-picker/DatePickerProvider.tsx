/**
 * Web DatePicker Provider
 *
 */

import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import type { DatePickerProps } from './DatePicker'

import isSameMonth from 'date-fns/isSameMonth'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

import SharedContext from '../../shared/Context'
import {
  isTrue,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import {
  convertStringToDate,
  correctV1Format,
  isDisabled,
} from './DatePickerCalc'
import DatePickerContext from './DatePickerContext'
import { getViews } from './DatePickerRange'

type DatePickerProviderProps = React.HTMLProps<HTMLElement> &
  DatePickerProps & {
    setReturnObject: (...args: any[]) => any
    enhanceWithMethods?: Record<string, unknown>
    attributes?: Record<string, unknown>
    children: React.ReactNode
  }

type DatePickerProviderState = {
  changeMonthViews: boolean
  lastEventCallCache?: { startDate?: Date; endDate?: Date }
  date: Date | string
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  startMonth: Date
  endMonth: Date
  partialStartDate?: Date
  partialEndDate?: Date
  views: Array<{ nr: number; month: string }>
  hasHadValidDate: boolean
  hoverDate?: Date
  __startDay: string
  __startMonth: string
  __startYear: string
  __endDay: string
  __endMonth: string
  __endYear: string
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
  const date_format = props.date_format

  const sharedContext = useContext(SharedContext)

  // console.log('dates', () => {
  //   const { date, start_date, end_date } = props

  //   return { date, start_date, end_date }
  // })

  const startDate =
    convertStringToDate(props?.start_date || props?.date, {
      date_format,
    }) || undefined
  const endDate = !props?.range
    ? startDate
    : convertStringToDate(props?.end_date || props?.date, {
        date_format,
      }) || undefined

  console.log('startDate', startDate)
  const hasValidStartDate = isValid(startDate)
  const hasValidEndDate = isValid(endDate)

  const [state, setState] = useState<DatePickerProviderState>({
    changeMonthViews: false,
    date: props?.date,
    startDate,
    endDate,
    startMonth: convertStringToDate(props.start_month, {
      date_format,
    }),
    endMonth: convertStringToDate(props.end_month, {
      date_format,
    }),
    minDate: convertStringToDate(props.min_date, {
      date_format,
    }),
    maxDate: convertStringToDate(props.min_date, {
      date_format,
    }),
    views: getViews([], props.range),
    lastEventCallCache: {},
    __startDay: hasValidStartDate ? pad(format(startDate, 'dd'), 2) : null,
    __startMonth: hasValidStartDate
      ? pad(format(startDate, 'MM'), 2)
      : null,
    __startYear: hasValidStartDate ? format(startDate, 'yyyy') : null,
    __endDay: hasValidEndDate ? pad(format(endDate, 'dd'), 2) : null,
    __endMonth: hasValidEndDate ? pad(format(endDate, 'MM'), 2) : null,
    __endYear: hasValidEndDate ? format(endDate, 'yyyy') : null,
    hasHadValidDate: hasValidStartDate || hasValidEndDate,
  })

  if (typeof props.setReturnObject === 'function') {
    props.setReturnObject(getReturnObject)
  }

  useEffect()

  useEffect(() => {
    if (props.correct_invalid_date) {
      if (isDisabled(state.startDate, state.minDate, state.maxDate)) {
        setState((currentState) => ({
          ...currentState,
          startDate: currentState.minDate,
        }))
      }
      if (isDisabled(state.endDate, state.minDate, state.maxDate)) {
        // state.endDate is only used by the input if range is set to true.
        // this is done to make max_date correction work if the input is not a range and only max_date is defined.
        if (!props.range && !state.minDate) {
          setState((currentState) => ({
            ...currentState,
            startDate: currentState.maxDate,
          }))
        } else {
          setState((currentState) => ({
            ...currentState,
            endDate: currentState.maxDate,
          }))
        }
      }
    }
  }, [
    props.range,
    props.correct_invalid_date,
    state.startDate,
    state.endDate,
    state.minDate,
    state.maxDate,
  ])

  // clear cache
  useEffect(() => {
    if (
      Object.keys(state.lastEventCallCache).length > 0 &&
      (state.lastEventCallCache.startDate !== state.startDate ||
        state.lastEventCallCache.endDate !== state.endDate)
    ) {
      setState((currentState) => ({
        ...currentState,
        lastEventCallCache: {},
      }))
    }
  }, [])

  // react to forced monthChange
  useEffect(() => {
    if (!state.changeMonthViews) {
      return // Stop here
    }

    if (
      !state.startMonth ||
      !isSameMonth(state.startMonth, state.startDate)
    ) {
      setState((currentState) => ({
        ...currentState,
        startMonth: currentState.startDate,
      }))
    }

    if (
      !state.endMonth ||
      (props.range && !isSameMonth(state.endMonth, state.endDate))
    ) {
      setState((currentState) => ({
        ...currentState,
        endMonth: currentState.endDate || currentState.startMonth,
      }))
    }
  }, [
    props.range,
    state.changeMonthViews,
    state.endMonth,
    state.startMonth,
    state.startDate,
    state.endDate,
  ])

  // function getDerivedStateFromProps(props, state) {
  //   const isRange = isTrue(props.range)

  //   // if (state._listenForPropChanges) {
  //   //   let startDate = undefined
  //   //   const date_format = props.date_format

  //   //   // Handle startDate/endDate
  //   //   if (
  //   //     typeof props.date !== 'undefined' &&
  //   //     props.date !== state._date
  //   //   ) {
  //   //     startDate = props.date
  //   //   }
  //   //   if (
  //   //     typeof props.start_date !== 'undefined' &&
  //   //     props.start_date !== state._startDate
  //   //   ) {
  //   //     startDate = props.start_date
  //   //   }
  //   //   if (
  //   //     typeof startDate !== 'undefined' &&
  //   //     startDate !== state.startDate
  //   //   ) {
  //   //     state.startDate =
  //   //       convertStringToDate(startDate, {
  //   //         date_format,
  //   //       }) || undefined

  //   //     if (!isTrue(props.range)) {
  //   //       state.endDate = state.startDate
  //   //     }
  //   //   }
  //   //   if (
  //   //     typeof props.end_date !== 'undefined' &&
  //   //     isTrue(props.range) &&
  //   //     props.end_date !== state._endDate
  //   //   ) {
  //   //     state.endDate =
  //   //       convertStringToDate(props.end_date, {
  //   //         date_format,
  //   //       }) || undefined
  //   //   }

  //   //   // Handle startMonth/endMonth
  //   //   if (
  //   //     typeof props.start_month !== 'undefined' &&
  //   //     props.start_month !== state._startMonth
  //   //   ) {
  //   //     state.startMonth = convertStringToDate(props.start_month, {
  //   //       date_format,
  //   //     })
  //   //   }
  //   //   if (
  //   //     typeof props.end_month !== 'undefined' &&
  //   //     props.end_month !== state._endMonth
  //   //   ) {
  //   //     state.endMonth = convertStringToDate(props.end_month, {
  //   //       date_format,
  //   //     })
  //   //   }

  //   //   // Handle minDate/maxDate
  //   //   if (
  //   //     typeof props.min_date !== 'undefined' &&
  //   //     props.min_date !== state._minDate
  //   //   ) {
  //   //     state.minDate = convertStringToDate(props.min_date, {
  //   //       date_format,
  //   //     })
  //   //   }
  //   //   if (
  //   //     typeof props.max_date !== 'undefined' &&
  //   //     props.max_date !== state._maxDate
  //   //   ) {
  //   //     state.maxDate = convertStringToDate(props.max_date, {
  //   //       date_format,
  //   //     })
  //   //   }
  //   // }

  //   /**
  //    * Because now we do not any more relay on auto "correction",
  //    * but rather return "is_valid_start_date=false"
  //    */
  //   // if (isTrue(props.correct_invalid_date)) {
  //   //   if (isDisabled(state.startDate, state.minDate, state.maxDate)) {
  //   //     state.startDate = state.minDate
  //   //   }
  //   //   if (isDisabled(state.endDate, state.minDate, state.maxDate)) {
  //   //     // state.endDate is only used by the input if range is set to true.
  //   //     // this is done to make max_date correction work if the input is not a range and only max_date is defined.
  //   //     if (!props.range && !props.min_date) {
  //   //       state.startDate = state.maxDate
  //   //     } else {
  //   //       state.endDate = state.maxDate
  //   //     }
  //   //   }
  //   // }

  //   // if (
  //   //   state.lastEventCallCache &&
  //   //   (state.lastEventCallCache.startDate !== state.startDate ||
  //   //     state.lastEventCallCache.endDate !== state.endDate)
  //   // ) {
  //   //   state.lastEventCallCache = {}
  //   // }

  //   // if (isValid(state.startDate)) {
  //   //   state.__startDay = pad(format(state.startDate, 'dd'), 2)
  //   //   state.__startMonth = pad(format(state.startDate, 'MM'), 2)
  //   //   state.__startYear = format(state.startDate, 'yyyy')
  //   //   state.hasHadValidDate = true
  //   // } else if (state.startDate === undefined) {
  //   //   state.__startDay = null
  //   //   state.__startMonth = null
  //   //   state.__startYear = null
  //   // }

  //   // if (isValid(state.endDate)) {
  //   //   state.__endDay = pad(format(state.endDate, 'dd'), 2)
  //   //   state.__endMonth = pad(format(state.endDate, 'MM'), 2)
  //   //   state.__endYear = format(state.endDate, 'yyyy')
  //   //   state.hasHadValidDate = true
  //   // } else if (state.endDate === undefined) {
  //   //   state.__endDay = null
  //   //   state.__endMonth = null
  //   //   state.__endYear = null
  //   // }

  //   // if (
  //   //   !state.startMonth ||
  //   //   state._date !== props.date ||
  //   //   (state.changeMonthViews &&
  //   //     !isSameMonth(state.startMonth, state.startDate))
  //   // ) {
  //   //   state.startMonth = state.startDate
  //   // }

  //   // if (
  //   //   !state.endMonth ||
  //   //   state._date !== props.date ||
  //   //   (isRange &&
  //   //     state.changeMonthViews &&
  //   //     !isSameMonth(state.endMonth, state.endDate))
  //   // ) {
  //   //   state.endMonth = state.endDate || state.startMonth
  //   // }

  //   state.views = getViews(state, isRange)

  //   // Update the months, in case they do not exist
  //   if (!state.startMonth) {
  //     state.startMonth = state.views[0].month
  //     if (
  //       isRange &&
  //       !state.endMonth &&
  //       typeof state.views[1] !== 'undefined'
  //     ) {
  //       state.endMonth = state.views[1].month
  //     }
  //   }

  //   state.changeMonthViews = false
  //   state._listenForPropChanges = true
  //   state._date = props.date
  //   state._startDate = props.start_date || props.date
  //   state._endDate = props.end_date
  //   state._startMonth = props.start_month
  //   state._endMonth = props.end_month
  //   state._month = props.month
  //   state._minDate = props.min_date
  //   state._maxDate = props.max_date

  //   return state
  // }

  function setViews(views, cb = null) {
    setState((currentState) => ({ ...currentState, views }))
    cb?.()
  }

  function updateState(state, cb = null) {
    setState((currentState) => ({ ...currentState, ...state }))
    cb?.()
  }

  function callOnChangeHandler(args) {
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
    setState((currentState) => ({
      ...currentState,
      ...lastEventCallCache,
    }))
  }

  function getReturnObject({ event = null, ...rest } = {}) {
    const { startDate, endDate, partialStartDate, partialEndDate } = {
      ...state,
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
        translation: sharedContext.translation,
        setViews: setViews,
        updateState: updateState,
        getReturnObject: getReturnObject,
        callOnChangeHandler: callOnChangeHandler,
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
