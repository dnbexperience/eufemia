/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'

class Example extends PureComponent {
  render() {
    const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
    if (IS_TEST) {
      return <ScreenshotTests />
    }
    return (
      <Fragment>
        <ComponentBox scope={{ addDays, startOfMonth, lastDayOfMonth }}>
          {/* @jsx */ `
<DatePicker
  label="Range DatePicker:"
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
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="Default DatePicker with Input:"
  date={new Date()}
  show_input={true}
  show_cancel_button={true}
  on_change={({ date }) => {
    console.log('on_change', date)
  }}
  on_cancel={({ date }) => {
    console.log('on_cancel', date)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="Hidden Nav:"
  date="2019/05/05"
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
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="Show month only:"
  date="05/02/2019"
  date_format="MM/dd/yyyy"
  only_month={true}
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="DatePicker with error message:"
  date={new Date()}
  show_input={true}
  show_submit_button={true}
  status="Please select a valid date"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="DatePicker with error status:"
  date={new Date()}
  hide_navigation={true}
  status="error"
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="Disabled with info message:"
  date={new Date()}
  show_input={true}
  status="Please select a valid date"
  status_state="info"
  disabled
/>
          `}
        </ComponentBox>

        <ScreenshotTests />
      </Fragment>
    )
  }
}

export default Example

const ScreenshotTests = () => {
  return (
    <Wrapper>
      <ComponentBox data-dnb-test="date-picker-trigger-default">
        {/* @jsx */ `
<DatePicker
  label="Default DatePicker:"
  date="2019-05-05"
  return_format="dd-MM-yyyy"
  on_change={({ date }) => {
    console.log('on_change', date)
  }}
  on_show={({ date }) => {
    console.log('on_show', date)
  }}
/>
        `}
      </ComponentBox>
      <ComponentBox data-dnb-test="date-picker-input">
        {/* @jsx */ `
<DatePicker
  label="Range DatePicker:"
  range={true}
  show_input={true}
/>
        `}
      </ComponentBox>
      <ComponentBox data-dnb-test="date-picker-trigger-error">
        {/* @jsx */ `
<DatePicker
  label="DatePicker with error status:"
  date={new Date()}
  hide_navigation={true}
  status="Please select a valid date"
/>
    `}
      </ComponentBox>
      <ComponentBox
        data-dnb-test="date-picker-calendar"
        caption="Opened DatePicker (also used for screenshot tests)"
      >
        {/* @jsx */ `
<DatePicker
  opened="true"
  disable_autofocus="true"
  range="true"
  start_date="2019-05-05"
  end_date="2019-06-05"
/>
    `}
      </ComponentBox>
    </Wrapper>
  )
}

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
