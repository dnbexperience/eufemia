/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerProps } from './DatePicker'
import { ContextProps } from '../../shared/Context'

type DatePickerView = {
  month: Date
  nr: number
}

type DatePickerContextValues = {
  props: DatePickerProps
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  hoverDate: Date
  translation: ContextProps['translation']
  views: Array<DatePickerView>
  hasHadValidDate: boolean
  updateState: (states: any, callback?: () => void) => void
  setState?: (state: any) => void
  setViews: (views: DatePickerView[], callback?: () => void) => void
  callOnChangeHandler: (...args: any[]) => void
  getReturnObject: ({
    startDate,
    endDate,
    event,
  }: {
    startDate?: Date
    endDate?: Date
    event: Event
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
