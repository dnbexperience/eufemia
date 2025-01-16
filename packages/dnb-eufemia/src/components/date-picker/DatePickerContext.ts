/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerAllProps, DisplayPickerEvent } from './DatePicker'
import { ContextProps } from '../../shared/Context'
import {
  DatePickerChangeEvent,
  DatePickerProviderState,
  GetReturnObjectParams,
  ReturnObject,
} from './DatePickerProvider'
import { DatePickerDateProps, DatePickerDates } from './hooks/useDates'
import { CalendarView } from './hooks/useViews'

export type DateType = Date | string

export type DatePickerContextValues = ContextProps &
  DatePickerDates & {
    props: DatePickerAllProps
    translation: ContextProps['translation']
    views: Array<CalendarView>
    hasHadValidDate: boolean
    minMaxDateValidationMessage: string | undefined
    previousDateProps: DatePickerDateProps
    updateDates: (
      dates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => void
    setState?: (state: DatePickerProviderState) => void
    setViews: (views: Array<CalendarView>, callback?: () => void) => void
    forceViewMonthChange: () => void
    callOnChangeHandler: <E>(event: DatePickerChangeEvent<E>) => void
    hidePicker: (event: DisplayPickerEvent) => void
    getReturnObject: <E>(
      params: GetReturnObjectParams<E>
    ) => ReturnObject<E>
  }

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
