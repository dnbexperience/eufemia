/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerProps } from './DatePicker'
import { ContextProps } from '../../shared/Context'
import {
  DatePickerProviderState,
  GetReturnObjectParams,
  ReturnObject,
} from './DatePickerProvider'
import { DateProps, Dates } from './hooks/useDates'
import { CalendarView } from './hooks/useViews'

export type DatePickerChangeEvent = Dates & {
  nr?: number
  hidePicker?: boolean
  event:
    | React.MouseEvent<HTMLButtonElement>
    | React.ChangeEvent<HTMLButtonElement | HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>
}

export type HidePickerEvent = Dates & {
  focusOnHide?: boolean
}

export type DatePickerContextValues = ContextProps & {
  props: DatePickerProps
  startDate?: Date
  endDate?: Date
  minDate?: Date
  maxDate?: Date
  hoverDate?: Date
  translation: ContextProps['translation']
  views: Array<CalendarView>
  hasHadValidDate: boolean
  updateDates: (dates: Dates, callback?: (dates: Dates) => void) => void
  setState?: (state: DatePickerProviderState) => void
  setViews: (views: Array<CalendarView>, callback?: () => void) => void
  callOnChangeHandler: (event: DatePickerChangeEvent) => void
  hidePicker: (event: HidePickerEvent) => void
  previousDates: DateProps
  getReturnObject: <E>(params: GetReturnObjectParams<E>) => ReturnObject<E>
}

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
