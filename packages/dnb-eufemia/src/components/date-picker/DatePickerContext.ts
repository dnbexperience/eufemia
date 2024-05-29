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
import { CalendarView } from './hooks/useViews'

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
  updateState: (
    states: DatePickerProviderState,
    callback?: (state: DatePickerProviderState) => void
  ) => void
  updateDates: (dates: Dates, callback?: (dates: Dates) => void) => void
  setState?: (state: DatePickerProviderState) => void
  setViews: (views: Array<CalendarView>, callback?: () => void) => void
  callOnChangeHandler: (
    args: Dates &
      InputDates & {
        nr?: number
        hidePicker?: boolean
        event:
          | React.MouseEvent<HTMLButtonElement>
          | React.ChangeEvent<HTMLButtonElement | HTMLInputElement>
          | React.FocusEvent<HTMLInputElement>
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
