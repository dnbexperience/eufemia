/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import lastDayOfWeek from 'date-fns/lastDayOfWeek'
import isWeekend from 'date-fns/isWeekend'
import isSameDay from 'date-fns/isSameDay'
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
      onChange={({ start_date, end_date }) => {
        console.log('onChange', start_date, end_date)
      }}
      onSubmit={({ start_date, end_date }) => {
        console.log('onSubmit', start_date, end_date)
      }}
      onCancel={({ start_date, end_date }) => {
        console.log('onCancel', start_date, end_date)
      }}
      onBlur={({
        start_date,
        end_date,
        partialStartDate,
        partialEndDate,
      }) => {
        console.log('onBlurPartial', partialStartDate, partialEndDate)
        console.log('onBlurComplete', start_date, end_date)
      }}
      shortcuts={[
        {
          title: 'Set date period',
          start_date: '1969-07-15',
          end_date: '1969-08-15',
        },
        {
          title: 'Today',
          start_date: new Date(),
        },
        {
          title: 'This week',
          start_date: startOfWeek(new Date()),
          end_date: lastDayOfWeek(new Date()),
        },
        {
          close_on_select: true,
          title: 'This month',
          start_date: startOfMonth(new Date()),
          end_date: lastDayOfMonth(new Date()),
        },
        {
          title: 'Relative +3 days',
          start_date: ({ start_date }) => start_date || new Date(),
          end_date: ({ end_date }) => addDays(end_date || new Date(), 3),
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
      onBlur={({ start_date, end_date }) => {
        console.log('onBlur', start_date, end_date)
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
          start_date: '1969-07-15',
          end_date: '1969-07-15',
          close_on_select: true, // will close the picker
        },
        {
          title: 'This month',
          start_date: startOfMonth(new Date()),
          end_date: lastDayOfMonth(new Date()),
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
