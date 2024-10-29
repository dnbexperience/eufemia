/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerProps, DisplayPickerEvent } from './DatePicker'
import { ContextProps } from '../../shared/Context'
import {
  DatePickerChangeEvent,
  DatePickerProviderState,
  GetReturnObjectParams,
  ReturnObject,
} from './DatePickerProvider'
import { DatePickerDateProps, DatePickerDates } from './hooks/useDates'
import { CalendarView } from './hooks/useViews'

export type DatePickerContextValues = ContextProps &
  DatePickerDates & {
    props: DatePickerProps
    translation: ContextProps['translation']
    views: Array<CalendarView>
    hasHadValidDate: boolean
    updateDates: (
      dates: DatePickerDates,
      callback?: (dates: DatePickerDates) => void,
      isTriggeredByShortcut?: boolean
    ) => void
    setState?: (state: DatePickerProviderState) => void
    setViews: (views: Array<CalendarView>, callback?: () => void) => void
    callOnChangeHandler: <E>(event: DatePickerChangeEvent<E>) => void
    hidePicker: (event: DisplayPickerEvent) => void
    previousDates: DatePickerDateProps
    getReturnObject: <E>(
      params: GetReturnObjectParams<E>
    ) => ReturnObject<E>
  }

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
