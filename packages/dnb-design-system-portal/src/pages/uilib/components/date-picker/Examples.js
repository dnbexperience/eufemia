/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox>
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
  // show_submit_button={true}
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
      </Fragment>
    )
  }
}

export default Example
