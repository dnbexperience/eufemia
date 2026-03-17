/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerAllProps, DisplayPickerEvent } from './DatePicker'
import { ContextProps } from '../../shared/Context'
import {
  DatePickerChangeEvent,
  GetReturnObjectParams,
  DatePickerReturnObject,
} from './DatePickerProvider'
import { DatePickerDateProps, DatePickerDates } from './hooks/useDates'
import { DatePickerCalendarView } from './hooks/useViews'
import { DatePickerSubmittedDates } from './hooks/useSubmittedDates'

export type DatePickerDateType = Date | string

export type DatePickerContextValue = ContextProps &
  DatePickerDates & {
    props: DatePickerAllProps
    dateFormat: DatePickerAllProps['dateFormat']
    translation: ContextProps['translation']
    views: Array<DatePickerCalendarView>
    previousDateProps: DatePickerDateProps
    updateDates: (
      dates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => void
    setViews: (
      views: Array<DatePickerCalendarView>,
      callback?: () => void
    ) => void
    setHasClickedCalendarDay: (hasClicked: boolean) => void
    hoverDate?: Date
    setHoverDate: (date: Date) => void
    submittedDates: DatePickerSubmittedDates
    setSubmittedDates: (dates: DatePickerSubmittedDates) => void
    callOnChangeHandler: <E>(event: DatePickerChangeEvent<E>) => void
    hidePicker: (event: DisplayPickerEvent) => void
    getReturnObject: <E>(
      params: GetReturnObjectParams<E>
    ) => DatePickerReturnObject<E>
  }

const DatePickerContext = React.createContext<DatePickerContextValue>(
  {} as DatePickerContextValue
)

export default DatePickerContext
