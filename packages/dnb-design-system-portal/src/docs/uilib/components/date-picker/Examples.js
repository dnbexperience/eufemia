/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'

const isTest = () => typeof window !== 'undefined' && window.IS_TEST

const Wrapper = styled.div`
  [data-dnb-test='date-picker-calendar'] .dnb-date-picker__container {
    display: block;
    position: relative;
    top: 0;
  }
  [data-dnb-test='date-picker-calendar'] .dnb-date-picker {
    margin-left: 1rem;
  }
`

export const DatePickerRange = () =>
  isTest() ? (
    <></>
  ) : (
    <ComponentBox scope={{ addDays, startOfMonth, lastDayOfMonth }}>
      {
        /* @jsx */ `
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
      end_date: '1969-08-15'
    },
    {
      title: 'This month',
      start_date: startOfMonth(new Date()),
      end_date: lastDayOfMonth(new Date())
    },
    {
      title: 'Relative +3 days',
      start_date: ({ start_date }) => start_date || new Date(),
      end_date: ({ end_date }) => addDays(end_date || new Date(), 3)
    }
  ]}
/>
          `
      }
    </ComponentBox>
  )

export const DatePickerWithInput = () =>
  isTest() ? (
    <></>
  ) : (
    <ComponentBox>
      {
        /* @jsx */ `
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
          `
      }
    </ComponentBox>
  )

export const DatePickerTrigger = () => (
  <Wrapper>
    <ComponentBox data-dnb-test="date-picker-trigger-default">
      {
        /* @jsx */ `
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
        `
      }
    </ComponentBox>
  </Wrapper>
)

export const DatePickerHiddenNav = () =>
  isTest() ? (
    <></>
  ) : (
    <ComponentBox>
      {
        /* @jsx */ `
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
          `
      }
    </ComponentBox>
  )

export const DatePickerMonthOnly = () =>
  isTest() ? (
    <></>
  ) : (
    <ComponentBox>
      {
        /* @jsx */ `
<DatePicker
  label="DatePicker:"
  date="05/02/2019"
  date_format="MM/dd/yyyy"
  only_month={true}
/>
          `
      }
    </ComponentBox>
  )

export const DatePickerDisabled = () =>
  isTest() ? (
    <></>
  ) : (
    <ComponentBox>
      {
        /* @jsx */ `
<DatePicker
  label="DatePicker:"
  date={new Date()}
  show_input={true}
  status="Please select a valid date"
  status_state="info"
/>
          `
      }
    </ComponentBox>
  )

export const DatePickerSuffix = () =>
  isTest() ? (
    <></>
  ) : (
    <ComponentBox>
      {
        /* @jsx */ `
<DatePicker
  label="DatePicker:"
  date={new Date()}
  show_input
  suffix={<Modal title="Modal Title">Modal content</Modal>}
/>
          `
      }
    </ComponentBox>
  )

export const DatePickerLinked = () => (
  <Wrapper>
    <ComponentBox data-dnb-test="date-picker-input">
      {
        /* @jsx */ `
<DatePicker
  label="DatePicker:"
  range
  link
  show_input
/>
        `
      }
    </ComponentBox>
  </Wrapper>
)

export const DatePickerNoInputStatus = () => (
  <Wrapper>
    <ComponentBox data-dnb-test="date-picker-trigger-error">
      {
        /* @jsx */ `
<DatePicker
  label="DatePicker:"
  date="2019-05-05"
  hide_navigation={true}
  status="Please select a valid date"
/>
    `
      }
    </ComponentBox>
  </Wrapper>
)

export const DatePickerErrorMessage = () => (
  <Wrapper>
    <ComponentBox data-dnb-test="date-picker-input-error">
      {
        /* @jsx */ `
<DatePicker
  label="DatePicker:"
  date="2019-05-05"
  show_input={true}
  show_submit_button={true}
  status="Please select a valid date"
/>
        `
      }
    </ComponentBox>
  </Wrapper>
)

export const DatePickerErrorStatus = () => (
  <ComponentBox>
    {
      /* @jsx */ `
<DatePicker
  label="DatePicker:"
  date={new Date()}
  hide_navigation={true}
  status="error"
/>
          `
    }
  </ComponentBox>
)

export const DatePickerCalendar = () => (
  <Wrapper>
    <ComponentBox data-dnb-test="date-picker-calendar">
      {
        /* @jsx */ `
<DatePicker
  opened="true"
  prevent_close="true"
  disable_autofocus="true"
  range="true"
  start_date="2019-05-05"
  end_date="2019-06-05"
/>
    `
      }
    </ComponentBox>
  </Wrapper>
)
