/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import {
  addDays,
  isSameDay,
  startOfMonth,
  lastDayOfMonth,
  startOfWeek,
  lastDayOfWeek,
  isWeekend,
} from 'date-fns'
import { DatePicker, HelpButton } from '@dnb/eufemia/src'
import { getOsloDate } from '@dnb/eufemia/src/components/date-format/DateFormatUtils'

export const DatePickerRange = () => (
  <ComponentBox
    scope={{
      addDays,
      startOfMonth,
      lastDayOfMonth,
      startOfWeek,
      lastDayOfWeek,
    }}
  >
    <DatePicker
      label="DatePicker"
      startDate="2019-04-01"
      endDate="2019-05-17"
      range
      showInput
      onChange={({ startDate, endDate }) => {
        console.log('onChange', startDate, endDate)
      }}
      onSubmit={({ startDate, endDate }) => {
        console.log('onSubmit', startDate, endDate)
      }}
      onCancel={({ startDate, endDate }) => {
        console.log('onCancel', startDate, endDate)
      }}
      onBlur={({
        startDate,
        endDate,
        partialStartDate,
        partialEndDate,
      }) => {
        console.log('onBlurPartial', partialStartDate, partialEndDate)
        console.log('onBlurComplete', startDate, endDate)
      }}
      shortcuts={[
        {
          title: 'Set date period',
          startDate: '1969-07-15',
          endDate: '1969-08-15',
        },
        {
          title: 'Today',
          startDate: new Date(),
        },
        {
          title: 'This week',
          startDate: startOfWeek(new Date()),
          endDate: lastDayOfWeek(new Date()),
        },
        {
          closeOnSelect: true,
          title: 'This month',
          startDate: startOfMonth(new Date()),
          endDate: lastDayOfMonth(new Date()),
        },
        {
          title: 'Relative +3 days',
          startDate: ({ startDate }) => startDate || new Date(),
          endDate: ({ endDate }) => addDays(endDate || new Date(), 3),
        },
      ]}
    />
  </ComponentBox>
)

export const DatePickerWithInput = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      showInput
      showCancelButton
      showResetButton
      onChange={({ date }) => {
        console.log('onChange', date)
      }}
      onCancel={({ date }) => {
        console.log('onCancel', date)
      }}
      onBlur={({ date }) => {
        console.log('onBlur', date)
      }}
    />
  </ComponentBox>
)

export const DatePickerTrigger = () => (
  <ComponentBox data-visual-test="date-picker-trigger-default">
    <DatePicker
      label="DatePicker"
      date="2019-05-05"
      returnFormat="dd-MM-yyyy"
      onChange={({ date }) => {
        console.log('onChange', date)
      }}
      onShow={({ date }) => {
        console.log('onShow', date)
      }}
      onBlur={({ startDate, endDate }) => {
        console.log('onBlur', startDate, endDate)
      }}
    />
  </ComponentBox>
)

export const DatePickerHiddenNav = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date="2022/05/05"
      minDate="2022/05/01"
      maxDate="2022/05/17"
      dateFormat="yyyy/MM/dd"
      returnFormat="dd/MM/yyyy"
      hideNavigation
      hideDays
      onChange={({ date }) => {
        console.log('onChange', date)
      }}
      onHide={({ date }) => {
        console.log('onHide', date)
      }}
      onBlur={({ date }) => {
        console.log('onBlur', date)
      }}
    />
  </ComponentBox>
)

export const DatePickerMonthOnly = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date="05/02/2019"
      dateFormat="MM/dd/yyyy"
      onlyMonth
    />
  </ComponentBox>
)

export const DatePickerStatusMessage = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      showInput
      status="Please select a valid date"
      statusState="info"
    />
  </ComponentBox>
)

export const DatePickerSuffix = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      showInput
      suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
    />
  </ComponentBox>
)

export const DatePickerLinked = () => (
  <ComponentBox data-visual-test="date-picker-input">
    <DatePicker label="DatePicker" range link showInput />
  </ComponentBox>
)

export const DatePickerNoInputStatus = () => (
  <ComponentBox data-visual-test="date-picker-trigger-error">
    <DatePicker
      label="DatePicker"
      date="2019-05-05"
      hideNavigation
      status="Please select a valid date"
    />
  </ComponentBox>
)

export const DatePickerErrorMessage = () => (
  <ComponentBox data-visual-test="date-picker-input-error">
    <DatePicker
      label="DatePicker"
      date="2019-05-05"
      showInput
      showSubmitButton
      status={
        <span>
          Status message with <b>HTML</b> inside
        </span>
      }
    />
  </ComponentBox>
)

export const DatePickerErrorStatus = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker"
      date={new Date()}
      hideNavigation
      status="error"
    />
  </ComponentBox>
)

export const DatePickerCalendarInline = () => (
  <ComponentBox background="white">
    <DatePicker inline range startDate="2019-05-05" endDate="2019-06-05" />
  </ComponentBox>
)

export const DatePickerDateFns = () => (
  <ComponentBox scope={{ addDays }} hidePreview hideToolbar>
    <DatePicker
      shortcuts={[
        { title: 'Set date', date: '1969-07-15' },
        {
          title: 'Relative +3 days',
          date: ({ date }) => date && addDays(date, 3),
        },
      ]}
    />
  </ComponentBox>
)

export const DatePickerDateFnsRange = () => (
  <ComponentBox
    scope={{ startOfMonth, lastDayOfMonth }}
    hidePreview
    hideToolbar
  >
    <DatePicker
      shortcuts={[
        {
          title: 'Set date period',
          startDate: '1969-07-15',
          endDate: '1969-07-15',
          closeOnSelect: true, // will close the picker
        },
        {
          title: 'This month',
          startDate: startOfMonth(new Date()),
          endDate: lastDayOfMonth(new Date()),
        },
      ]}
    />
  </ComponentBox>
)

export const DatePickerDateFnsRangeIsWeekend = () => (
  <ComponentBox scope={{ isWeekend }}>
    <DatePicker
      onDaysRender={(days, calendarNumber = 0) => {
        return days.map((dayObject) => {
          if (isWeekend(dayObject.date)) {
            dayObject.isInactive = true
            dayObject.className = 'dnb-date-picker__day--weekend' // custom css
          }
          return dayObject
        })
      }}
    />
  </ComponentBox>
)

export const DatePickerOsloDate = () => (
  <ComponentBox scope={{ getOsloDate, isSameDay }}>
    {() => {
      const osloDate = getOsloDate()
      return (
        <DatePicker
          onDaysRender={(days) => {
            return days.map((dayObject) => {
              dayObject.isToday = isSameDay(dayObject.date, osloDate)
              return dayObject
            })
          }}
        />
      )
    }}
  </ComponentBox>
)

export const DatePickerLabelAlignmentRight = () => (
  <ComponentBox data-visual-test="date-picker-label-alignment-right">
    <DatePicker label="Label" labelAlignment="right" />
  </ComponentBox>
)

export const DatePickerLabelAlignmentWithButtonRight = () => (
  <ComponentBox data-visual-test="date-picker-with-button-label-alignment-right">
    <DatePicker label="Label" labelAlignment="right" showInput={true} />
  </ComponentBox>
)

export const DatePickerYearNavigation = () => (
  <ComponentBox>
    <DatePicker showInput yearNavigation />
  </ComponentBox>
)
