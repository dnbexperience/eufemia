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
  updateState: (states: any, callback?: () => void) => void
  setViews: (views: DatePickerView[], callback?: () => void) => void
  callOnChangeHandler: (...args: any[]) => void
}

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
