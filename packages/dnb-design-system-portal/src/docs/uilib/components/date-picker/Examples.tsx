/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import startOfWeek from 'date-fns/startOfWeek'
import lastDayOfWeek from 'date-fns/lastDayOfWeek'
import isWeekend from 'date-fns/isWeekend'
import { DatePicker, FormRow, HelpButton } from '@dnb/eufemia/src'

const Wrapper = styled.div`
  [data-visual-test='date-picker-calendar'] .dnb-date-picker__container {
    display: block;
    position: relative;
    top: 0;
  }
  [data-visual-test='date-picker-calendar'] .dnb-date-picker {
    margin-left: 1rem;
  }
`

export const DatePickerRange = () =>
  globalThis.IS_TEST ? null : (
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
        label="DatePicker:"
        start_date="2019-04-01"
        end_date="2019-05-17"
        range={true}
        show_input={true}
        on_change={({ start_date, end_date }) => {
          console.log('on_change', start_date, end_date)
        }}
        on_submit={({ start_date, end_date }) => {
          console.log('on_submit', start_date, end_date)
        }}
        on_cancel={({ start_date, end_date }) => {
          console.log('on_cancel', start_date, end_date)
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

export const DatePickerWithInput = () =>
  globalThis.IS_TEST ? null : (
    <ComponentBox>
      <DatePicker
        label="DatePicker:"
        date={new Date()}
        show_input={true}
        show_cancel_button={true}
        show_reset_button={true}
        on_change={({ date }) => {
          console.log('on_change', date)
        }}
        on_cancel={({ date }) => {
          console.log('on_cancel', date)
        }}
      />
    </ComponentBox>
  )

export const DatePickerTrigger = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-trigger-default">
      <DatePicker
        label="DatePicker:"
        date="2019-05-05"
        return_format="dd-MM-yyyy"
        on_change={({ date }) => {
          console.log('on_change', date)
        }}
        on_show={({ date }) => {
          console.log('on_show', date)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerHiddenNav = () =>
  globalThis.IS_TEST ? null : (
    <ComponentBox>
      <DatePicker
        label="DatePicker:"
        date="2022/05/05"
        min_date="2022/05/01"
        max_date="2022/05/17"
        date_format="yyyy/MM/dd"
        return_format="dd/MM/yyyy"
        hide_navigation={true}
        hide_days={true}
        on_change={({ date }) => {
          console.log('on_change', date)
        }}
        on_hide={({ date }) => {
          console.log('on_hide', date)
        }}
      />
    </ComponentBox>
  )

export const DatePickerMonthOnly = () =>
  globalThis.IS_TEST ? null : (
    <ComponentBox>
      <DatePicker
        label="DatePicker:"
        date="05/02/2019"
        date_format="MM/dd/yyyy"
        only_month={true}
      />
    </ComponentBox>
  )

export const DatePickerStatusMessage = () =>
  globalThis.IS_TEST ? null : (
    <ComponentBox>
      <DatePicker
        label="DatePicker:"
        date={new Date()}
        show_input={true}
        status="Please select a valid date"
        status_state="info"
      />
    </ComponentBox>
  )

export const DatePickerSuffix = () =>
  globalThis.IS_TEST ? null : (
    <ComponentBox>
      <DatePicker
        label="DatePicker:"
        date={new Date()}
        show_input
        suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
      />
    </ComponentBox>
  )

export const DatePickerLinked = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-input">
      <DatePicker label="DatePicker:" range link show_input />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerNoInputStatus = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-trigger-error">
      <DatePicker
        label="DatePicker:"
        date="2019-05-05"
        hide_navigation={true}
        status="Please select a valid date"
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerErrorMessage = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-input-error">
      <DatePicker
        label="DatePicker:"
        date="2019-05-05"
        show_input={true}
        show_submit_button={true}
        stretch={true}
        status={
          <span>
            Status message with <b>HTML</b> inside
          </span>
        }
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerErrorStatus = () => (
  <ComponentBox>
    <DatePicker
      label="DatePicker:"
      date={new Date()}
      hide_navigation={true}
      status="error"
    />
  </ComponentBox>
)

export const DatePickerCalendar = () => (
  <Wrapper>
    <ComponentBox data-visual-test="date-picker-calendar">
      <DatePicker
        opened={true}
        prevent_close={true}
        disable_autofocus={true}
        range={true}
        start_date="2019-05-05"
        end_date="2019-06-05"
      />
    </ComponentBox>
  </Wrapper>
)

export const DatePickerScreenshotTests = () => {
  if (!globalThis.IS_TEST) {
    return null
  }
  return (
    <Wrapper>
      <ComponentBox data-visual-test="date-picker-sizes">
        <FormRow vertical>
          <DatePicker
            label="DatePicker:"
            date={new Date('2022/06/10')}
            show_input={true}
          />
          <DatePicker
            size="small"
            label="DatePicker:"
            date={new Date('2022/06/10')}
            show_input={true}
          />
          <DatePicker
            size="medium"
            label="DatePicker:"
            date={new Date('2022/06/10')}
            show_input={true}
          />
          <DatePicker
            size="large"
            label="DatePicker:"
            date={new Date('2022/06/10')}
            show_input={true}
          />
        </FormRow>
      </ComponentBox>
    </Wrapper>
  )
}

export const DatePickerDateFns = () =>
  globalThis.IS_TEST ? null : (
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

export const DatePickerDateFnsRange = () =>
  globalThis.IS_TEST ? null : (
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

export const DatePickerDateFnsRangeIsWeekend = () =>
  globalThis.IS_TEST ? null : (
    <ComponentBox scope={{ isWeekend }} hidePreview>
      <DatePicker
        on_days_render={(days, calendarNumber = 0) => {
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
