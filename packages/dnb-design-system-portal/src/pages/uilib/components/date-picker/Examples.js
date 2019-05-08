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
    return (
      <Fragment>
        <ComponentBox data-dnb-test={IS_TEST && 'date-picker-input'}>
          {/* @jsx */ `
<DatePicker
  label="Range DatePicker:"
  start_date="2019-05-1"
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
  label="Defualt DatePicker with Input:"
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
  label="Defualt DatePicker:"
  date="2019-05-05"
  on_change={({ date }) => {
    console.log('on_change', date)
  }}
  on_show={({ date }) => {
    console.log('on_show', date)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox>
          {/* @jsx */ `
<DatePicker
  label="Hidden Nav:"
  date="2019-05-05"
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
      </Fragment>
    )
  }
}

export default Example
