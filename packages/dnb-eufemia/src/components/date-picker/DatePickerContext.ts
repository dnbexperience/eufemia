/**
 * Web DatePicker Context
 *
 */

import React from 'react'
import { DatePickerProps } from './DatePicker'
import { ContextProps } from '../../shared/Context'

type DatePickerContextValues = {
  props: DatePickerProps
  startDate: Date
  endDate: Date
  minDate: Date
  maxDate: Date
  hoverDate: Date
  translation: ContextProps['translation']
  updateState: (states: any, callback?: () => void) => void
}

const DatePickerContext = React.createContext<DatePickerContextValues>(
  {} as DatePickerContextValues
)

export default DatePickerContext
