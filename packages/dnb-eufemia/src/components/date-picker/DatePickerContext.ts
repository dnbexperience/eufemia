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
  ReturnObject,
} from './DatePickerProvider'
import { DatePickerDateProps, DatePickerDates } from './hooks/useDates'
import { CalendarView } from './hooks/useViews'
import { SubmittedDates } from './hooks/useSubmittedDates'

export type DateType = Date | string

export type DatePickerContextValues = ContextProps &
  DatePickerDates & {
    props: DatePickerAllProps
    dateFormat: DatePickerAllProps['dateFormat']
    translation: ContextProps['translation']
    views: Array<CalendarView>
    previousDateProps: DatePickerDateProps
    updateDates: (
      dates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void
    ) => void
    setViews: (views: Array<CalendarView>, callback?: () => void) => void
    setHasClickedCalendarDay: (hasClicked: boolean) => void
    hoverDate?: Date
    setHoverDate: (date: Date) => void
    submittedDates: SubmittedDates
    setSubmittedDates: (dates: SubmittedDates) => void
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
