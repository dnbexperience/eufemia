/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerProps } from './DatePicker'
import { ContextProps } from '../../shared/Context'
import {
  DatePickerProviderState,
  DateProps,
  Dates,
} from './DatePickerProvider'

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
    states: any,
    callback?: (state: DatePickerProviderState) => void
  ) => void
  updateDates: (dates: any, callback?: (dates: Dates) => void) => void
  setState?: (state: any) => void
  setViews: (views: DatePickerView[], callback?: () => void) => void
  callOnChangeHandler: (...args: any[]) => void
  hidePicker: (...args: any[]) => void
  previousDates: DateProps
  getReturnObject: ({
    startDate,
    endDate,
    partialStartDate,
    partialEndDate,
    event,
  }: {
    startDate?: Date
    endDate?: Date
    partialStartDate?: Date
    partialEndDate?: Date
    event: React.FocusEvent | React.ChangeEvent
  }) => {
    is_valid: boolean
    is_valid_start_date: boolean
    is_valid_end_date: boolean
  }
}

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
