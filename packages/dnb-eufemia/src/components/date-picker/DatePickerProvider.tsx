/**
 * Web DatePicker Provider
 *
 */

import React, { useCallback, useContext, useEffect, useState } from 'react'
import type { DatePickerProps } from './DatePicker'

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
import addMonths from 'date-fns/addMonths'

type DatePickerProviderProps = DatePickerProps & {
  setReturnObject: (...args: any[]) => any
  enhanceWithMethods?: Record<string, unknown>
  attributes?: Record<string, unknown>
  children: React.ReactNode
}

type CalendarViews =
  | { nr: number; month: Date }
  | Array<{ nr: number; month: Date }>

export type DatePickerProviderState = {
  changeMonthViews: boolean
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

  const hasValidStartDate = isValid(dates.startDate)
  const hasValidEndDate = isValid(dates.endDate)

  const [state, setState] = useState<DatePickerProviderState>({
    changeMonthViews: false,
    lastEventCallCache: {},
    hasHadValidDate: hasValidStartDate || hasValidEndDate,
  })

  if (typeof props.setReturnObject === 'function') {
    props.setReturnObject(getReturnObject)
  }

  // Correct invalid date, should move logic
  useEffect(() => {
    if (props.correct_invalid_date) {
      if (isDisabled(dates.startDate, dates.minDate, dates.maxDate)) {
        updateDates({
          startDate: dates.minDate,
        })
      }
      if (isDisabled(dates.endDate, dates.minDate, dates.maxDate)) {
        // state.endDate is only used by the input if range is set to true.
        // this is done to make max_date correction work if the input is not a range and only max_date is defined.
        if (!props.range && !dates.minDate) {
          updateDates({ startDate: dates.maxDate })
        } else {
          updateDates({
            endDate: dates.maxDate,
          })
        }
      }
    }
  }, [props.range, props.correct_invalid_date, dates, updateDates])

  // clear cache, move to hook
  useEffect(() => {
    if (
      Object.keys(state.lastEventCallCache).length > 0 &&
      (state.lastEventCallCache.startDate !== dates.startDate ||
        state.lastEventCallCache.endDate !== dates.endDate)
    ) {
      setState((currentState) => ({
        ...currentState,
        lastEventCallCache: {},
      }))
    }
  }, [state, dates])

  // react to forced monthChange
  // useEffect(() => {
  //   if (!state.changeMonthViews) {
  //     return // Stop here
  //   }

  //   if (
  //     !dates.startMonth ||
  //     !isSameMonth(dates.startMonth, dates.startDate)
  //   ) {
  //     setState((currentState) => ({
  //       ...currentState,
  //       startMonth: currentState.startDate,
  //     }))
  //   }

  //   if (
  //     !dates.endMonth ||
  //     (props.range && !isSameMonth(dates.endMonth, dates.endDate))
  //   ) {
  //     updateDates({
  //       endMonth: dates.endDate || dates.startMonth,
  //     })
  //   }
  // }, [props.range, dates, updateDates, state.changeMonthViews])

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

  function updateState(state, cb = null) {
    setState((currentState) => ({ ...currentState, ...state }))
    cb?.()
  }

  function callOnChangeHandler(args) {
    /**
     * Prevent on_change to be fired twice if date not has actually changed
     * We clear the cache inside getDerivedStateFromProps
     * Can be removed when dispatchCustomElementEvent is deprecated (plz?)
     */
    if (
      state.lastEventCallCache &&
      state.lastEventCallCache.startDate === args.startDate &&
      state.lastEventCallCache.endDate === args.endDate
    ) {
      return // stop here
    }

    dispatchCustomElementEvent(
      { on_change: props.on_change },
      'on_change',
      getReturnObject({ ...dates, ...args })
    )

    const lastEventCallCache = {
      startDate: args.startDate,
      endDate: args.endDate,
    }
    setState((currentState) => ({
      ...currentState,
      lastEventCallCache,
    }))
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

export type DateProps = {
  date?: Date | string
  startDate?: Date | string
  endDate?: Date | string
  startMonth?: Date | string
  endMonth?: Date | string
  minDate?: Date | string
  maxDate?: Date | string
  hoverDate?: Date | string | null
}

type UseDatesOptions = {
  dateFormat: string
  isRange: boolean
  shouldCorrectDate: boolean
}

export type Dates = {
  date?: Date | string
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  startMonth?: Date
  endMonth?: Date
  partialStartDate?: Date
  partialEndDate?: Date
  hasHadValidDate?: boolean
  hoverDate?: Date
  __startDay?: string
  __startMonth?: string
  __startYear?: string
  __endDay?: string
  __endMonth?: string
  __endYear?: string
}

function useDates(
  initialDates: DateProps,
  {
    dateFormat,
    isRange = false,
    shouldCorrectDate = false,
  }: UseDatesOptions
) {
  const [hasHadValidDate, setHasHadValidDate] = useState<boolean>(false)
  const [updateInputDates, setUpdateInputDates] = useState<boolean>(false)

  const initDates = useCallback(() => {
    const startDate = convertStringToDate(
      typeof initialDates?.startDate !== 'undefined'
        ? String(initialDates.startDate)
        : typeof initialDates?.date !== 'undefined'
        ? String(initialDates.date)
        : '',
      {
        date_format: dateFormat,
      }
    )

    const endDate = !isRange
      ? startDate
      : convertStringToDate(
          String(initialDates?.endDate) || String(initialDates?.date),
          {
            date_format: dateFormat,
          }
        ) || undefined

    const startMonth = convertStringToDate(
      String(initialDates.startMonth),
      {
        date_format: dateFormat,
      }
    )

    const endMonth = convertStringToDate(String(initialDates.endMonth), {
      date_format: dateFormat,
    })
    const minDate = convertStringToDate(String(initialDates.minDate), {
      date_format: dateFormat,
    })

    const maxDate = convertStringToDate(String(initialDates.maxDate), {
      date_format: dateFormat,
    })

    const hasValidStartDate = isValid(startDate)
    const hasValidEndDate = isValid(endDate)

    const __startDay = hasValidStartDate
      ? pad(format(startDate, 'dd'), 2)
      : null

    const __startMonth = hasValidStartDate
      ? pad(format(startDate, 'MM'), 2)
      : null

    const __startYear = hasValidStartDate
      ? format(startDate, 'yyyy')
      : null

    const __endDay = hasValidEndDate ? pad(format(endDate, 'dd'), 2) : null

    const __endMonth = hasValidEndDate
      ? pad(format(endDate, 'MM'), 2)
      : null

    const __endYear = hasValidEndDate ? format(endDate, 'yyyy') : null

    return {
      startDate,
      endDate,
      startMonth,
      endMonth,
      minDate,
      maxDate,
      __startDay,
      __startMonth,
      __startYear,
      __endDay,
      __endMonth,
      __endYear,
      hasHadValidDate: hasValidStartDate || hasValidEndDate,
    }
  }, [initialDates, dateFormat, isRange])

  const [previousDates, setPreviousDates] = useState<DateProps>({
    ...initialDates,
  })
  const [dates, setDates] = useState<Dates>({
    date:
      previousDates.date !== initialDates.date
        ? initialDates.date
        : previousDates.date,
    ...initDates(),
  })

  const updateDates = useCallback(
    (newDates, callback?: (dates: Dates) => void) => {
      const correctedDates = {}
      // CorrectDate
      if (shouldCorrectDate) {
        const startDate = newDates.startDate ?? dates.startDate
        const endDate = newDates.endDate ?? dates.endDate
        if (isDisabled(startDate, dates.minDate, dates.maxDate)) {
          correctedDates['startDate'] = dates.minDate
        }
        if (isDisabled(endDate, dates.minDate, dates.maxDate)) {
          // state.endDate is only used by the input if range is set to true.
          // this is done to make max_date correction work if the input is not a range and only max_date is defined.
          if (!isRange && !dates.minDate) {
            correctedDates['startDate'] = dates.maxDate
          } else {
            correctedDates['endDate'] = dates.maxDate
          }
        }

        if (Object.keys(correctedDates).length > 0) {
          setDates((d) => ({ ...d, ...correctedDates }))
        }
      }

      if (
        Object.keys(newDates).join().includes('__start') ||
        Object.keys(newDates).join().includes('__end') ||
        Object.keys(newDates).join().includes('startDate') ||
        Object.keys(newDates).join().includes('endDate')
      ) {
        setUpdateInputDates(true)
      }

      setDates((currentDates) => {
        if (callback) {
          // callbackRef.current = callback
          callback({
            ...currentDates,
            ...newDates,
            ...correctedDates,
          })
        }

        return {
          ...currentDates,
          ...newDates,
          ...correctedDates,
        }
      })
    },
    [dates, shouldCorrectDate, isRange]
  )

  // Update dates on prop change
  useEffect(() => {
    const hasDatePropsChanged = Object.keys(initialDates).some((date) => {
      return initialDates[date] !== previousDates[date]
    })

    if (hasDatePropsChanged) {
      setPreviousDates(initialDates)
      updateDates({ date: initialDates.date, ...initDates() })
    }
  }, [initialDates, previousDates, initDates, updateDates])

  useEffect(() => {
    if (!updateInputDates) {
      return
    }

    const datesToUpdate = {}
    let hasHadVali = false

    if (isValid(dates.startDate)) {
      datesToUpdate['__startDay'] = pad(format(dates.startDate, 'dd'), 2)
      datesToUpdate['__startMonth'] = pad(format(dates.startDate, 'MM'), 2)
      datesToUpdate['__startYear'] = format(dates.startDate, 'yyyy')
      hasHadVali = true
    } else if (dates.startDate === undefined) {
      datesToUpdate['__startDay'] = null
      datesToUpdate['__startMonth'] = null
      datesToUpdate['__startYear'] = null
    }

    if (isValid(dates.endDate)) {
      datesToUpdate['__endDay'] = pad(format(dates.endDate, 'dd'), 2)
      datesToUpdate['__endMonth'] = pad(format(dates.endDate, 'MM'), 2)
      datesToUpdate['__endYear'] = format(dates.endDate, 'yyyy')
      hasHadVali = true
    } else if (dates.endDate === undefined) {
      datesToUpdate['__endDay'] = null
      datesToUpdate['__endMonth'] = null
      datesToUpdate['__endYear'] = null
    }

    setHasHadValidDate(hasHadVali)
    updateDates({ ...datesToUpdate })
    setUpdateInputDates(false)
  }, [dates, updateInputDates, updateDates])

  return [dates, updateDates, hasHadValidDate, previousDates] as const
}

type ViewDates = {
  startDate?: DatePickerProviderState['startDate']
  endDate?: DatePickerProviderState['endDate']
  startMonth?: DatePickerProviderState['startMonth']
  endMonth?: DatePickerProviderState['endMonth']
}

type UseViewsParams = ViewDates & {
  isRange?: boolean
}

function useViews({ isRange, ...dates }: UseViewsParams) {
  const [prevDates, setPrevDates] = useState(dates)
  const [views, setViews] = useState<CalendarViews>(
    getViews({ ...dates, views: undefined, isRange })
  )

  function updateViews(views, cb = null) {
    setViews(views)
    cb?.()
  }

  // Update views based on date changes
  useEffect(() => {
    if (
      Object.keys(dates).some(
        (dateType) => prevDates[dateType] !== dates[dateType]
      )
    ) {
      const currentViews = Array.isArray(views)
        ? views.length > 1
          ? views
          : views[0]
        : views
      setViews(getViews({ ...dates, views: currentViews, isRange }))
      setPrevDates(dates)
    }
  }, [dates, isRange, prevDates, views])

  return [views, updateViews] as const
}

export function getViews({
  views,
  isRange,
  ...dates
}: ViewDates & UseViewsParams & { views: CalendarViews }): CalendarViews {
  // fill the views with the calendar data getMonth()
  return (
    Array.isArray(views)
      ? views
      : Array(
          isRange
            ? 2 // set default range calendars
            : views
        ).fill(1)
  ).map((view, nr) => ({
    month: getMonthView({ ...dates }, nr),
    nr,
  }))
}

function getMonthView(
  { startDate, endDate, startMonth, endMonth }: ViewDates,
  nr: number
) {
  if ((startMonth || startDate) && nr === 0) {
    return startMonth || startDate
  }
  if ((endMonth || endDate) && nr === 1) {
    return endMonth || endDate
  }

  // Here we add that default offset to every new calendar added,
  // the first will get 0, the next one 1, and so forth
  const fallbackMonth = startMonth || startDate || new Date()

  return addMonths(fallbackMonth, nr)
}

export const pad = (num, size) => ('000000000' + num).substr(-size)
