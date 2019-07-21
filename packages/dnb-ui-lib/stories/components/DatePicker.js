/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { DatePicker, FormRow } from '../../src/components'

export default [
  'DatePicker',
  () => (
    <Wrapper>
      <Box>
        <FormRow label_direction="vertical" label="Legend:">
          <DatePicker label="Date Picker 1:" right="small" />
          <DatePicker label="Date Picker 2:" />
        </FormRow>
      </Box>
      <Box>
        <FormRow direction="vertical" label="Legend:">
          <DatePicker label="Date Picker 1:" />
          <DatePicker label="Date Picker 2:" top="small" />
        </FormRow>
      </Box>
      <Box>
        <FormRow vertical label="Legend:">
          <DatePicker label="Date Picker 1:" />
          <DatePicker label="Date Picker 2:" top="small" />
        </FormRow>
      </Box>
      <Box>
        <CustomDate />
      </Box>
      <Box>
        <FormRow vertical>
          <DatePicker
            label="Range DatePicker:"
            // label_direction="vertical"
            // start_date={new Date()}
            // start_date="2019-01-15"
            start_date="1981-01-15"
            end_date="2019-06-15"
            range={true}
            // link={true}
            // sync={false}
            opened={false}
            show_input={true}
            on_show={props => {
              console.log('on_show', props)
            }}
            on_hide={props => {
              console.log('on_hide', props)
            }}
            on_change={props => {
              console.log('on_change', props)
            }}
            on_submit={props => {
              console.log('on_submit', props)
            }}
            on_cancel={props => {
              console.log('on_cancel', props)
            }}
            status="Please select a valid date"
          />
        </FormRow>
      </Box>
      <Box>
        <DatePicker
          label="Range DatePicker:"
          // start_date="2019-05-01"
          // end_date="2019-06-17"
          // min_date="2019-05-02"
          // max_date="2019-06-15"
          range={true}
          opened={false}
          show_input={true}
          on_change={props => {
            console.log('on_change', props)
          }}
          on_submit={props => {
            console.log('on_submit', props)
          }}
          on_cancel={props => {
            console.log('on_cancel', props)
          }}
        />
      </Box>
      <Box>
        <DatePicker
          label="Default DatePicker with Input:"
          date="2019-05-05"
          show_input={true}
          // show_submit_button={true}
          show_cancel_button={true}
          on_change={props => {
            console.log('on_change', props)
          }}
        />
      </Box>
      <Box>
        <DatePicker
          label="Hidden Nav:"
          date="2019-05-05"
          hide_navigation={true}
          hide_days={true}
        />
      </Box>
      <Box>
        <DatePicker
          label="Show month only:"
          date="2019-02-05"
          // hide_navigation_buttons={true}
          only_month={true}
        />
      </Box>
    </Wrapper>
  )
]

const CustomDate = () => {
  const [date, setDate] = useState('2019-02-15')
  console.log('date', date)
  return (
    <DatePicker
      label="Default DatePicker:"
      date={date}
      return_format="YYYY-MM-DD"
      on_change={({ date }) => {
        console.log('on_change', date)
        setDate(date)
      }}
      status="Please select a valid date"
    />
  )
}
