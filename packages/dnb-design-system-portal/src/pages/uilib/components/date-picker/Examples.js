/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import DatePickerRange from 'dnb-ui-lib/src/components/date-picker/DatePickerRange'

class Example extends PureComponent {
  render() {
    const IS_TEST = typeof window !== 'undefined' && window.IS_TEST
    if (IS_TEST) {
      return <ScreenshotTests />
    }
    return (
      <Fragment>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="Range DatePicker:"
  start_date="2019-05-01"
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
  hide_navigation={true}
  hide_days={true}
  return_format="DD/MM/YYYY"
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
  date="2019/02/05"
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
    <>
      <ComponentBox data-dnb-test="date-picker-trigger-default">
        {/* @jsx */ `
<DatePicker
  label="Default DatePicker:"
  date="2019-05-05"
  return_format="DD-MM-YYYY"
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

      <div className="example-box">
        <div data-dnb-test="date-picker-calendar">
          <DatePickerRange
            range={true}
            startDate={new Date('2019-05-05')}
            endDate={new Date('2019-06-05')}
            firstDayOfWeek={'monday'}
          />
        </div>
        <p className="example-caption">
          Example styling of range calendar (also used for screenshot
          tests)
        </p>
      </div>
    </>
  )
}
