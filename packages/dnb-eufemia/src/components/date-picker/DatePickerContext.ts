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
import { DateProps, Dates, InputDates } from './hooks/useDates'

export type DatePickerView = {
  month: Date
  nr: number
}

export type DatePickerContextValues = ContextProps & {
  props: DatePickerProps
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  hoverDate: Date
  translation: ContextProps['translation']
  views: Array<DatePickerView>
  hasHadValidDate: boolean
  updateState: (
    states: DatePickerProviderState,
    callback?: (state: DatePickerProviderState) => void
  ) => void
  updateDates: (dates: Dates, callback?: (dates: Dates) => void) => void
  setState?: (state: DatePickerProviderState) => void
  setViews: (views: DatePickerView[], callback?: () => void) => void
  callOnChangeHandler: (
    args: Dates &
      InputDates & {
        nr: number
        hidePicker: boolean
        event: React.MouseEvent<HTMLButtonElement>
      }
  ) => void
  hidePicker: (
    params: Dates & {
      focusOnHide?: boolean
    }
  ) => void

  previousDates: DateProps
  getReturnObject: (params: GetReturnObjectParams) => ReturnObject
}

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
