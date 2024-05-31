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
import { DatePickerInitialDates, DatePickerDates } from './hooks/useDates'
import { CalendarView } from './hooks/useViews'

export type DatePickerChangeEvent = DatePickerDates & {
  nr?: number
  hidePicker?: boolean
  event:
    | React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    | React.ChangeEvent<HTMLButtonElement | HTMLInputElement>
    | React.FocusEvent<HTMLInputElement>
}

export type HidePickerEvent = React.MouseEvent<
  HTMLButtonElement | HTMLAnchorElement
> &
  DatePickerDates & {
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
  updateDates: (
    dates: DatePickerDates,
    callback?: (dates: DatePickerDates) => void
  ) => void
  setState?: (state: DatePickerProviderState) => void
  setViews: (views: Array<CalendarView>, callback?: () => void) => void
  callOnChangeHandler: (event: DatePickerChangeEvent) => void
  hidePicker: (event: HidePickerEvent) => void
  previousDates: DatePickerInitialDates
  getReturnObject: <E>(params: GetReturnObjectParams<E>) => ReturnObject<E>
}

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
