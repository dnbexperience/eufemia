/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import enLocale from 'date-fns/locale/en-US'

import { DatePicker, FormRow } from '../../src/components'

const Scrollbar = styled.div`
  height: 10rem;
  padding: 1rem;
  overflow-x: scroll;

  background: yellow;
`
const ScrollbarInner = styled.div`
  width: 110%;
  height: 100%;
`

export default [
  'DatePicker',
  () => (
    <Wrapper>
      <Box>
        <Scrollbar>
          <ScrollbarInner>
            <DatePicker label="Date Picker 1:" show_input />
          </ScrollbarInner>
        </Scrollbar>
      </Box>
      <Box>
        <FormRow label_direction="vertical" label="Legend:">
          <DatePicker
            label="Date Picker 1:"
            right="small"
            date="1981-01-15"
            title="My Button"
          />
          <DatePicker
            label="Date Picker 2:"
            align_picker="right"
            date={new Date()}
          />
          <DatePicker
            label="Date Picker 3:"
            show_input
            align_picker="right"
            mask_placeholder="dd/mm/yyyy"
            locale={enLocale}
            // inputElement="input"
            first_day="sunday"
            return_format="DD/MM/YYYY"
            date="1981-01-15"
            data-foo="bar"
            on_show={props => {
              console.log(
                'on_show',
                // props,
                props.event.currentTarget.dataset
              )
            }}
            on_hide={props => {
              console.log(
                'on_hide',
                // props,
                props.event.currentTarget.dataset
              )
            }}
            on_change={props => {
              console.log(
                'on_change',
                // props,
                props.event.currentTarget.dataset
              )
            }}
          />
          <DatePicker
            label="Hidden Nav:"
            show_input
            // date="2019/05/05"
            // start_date="05/05/2019"
            // hide_navigation={true}
            // hide_days={true}
            submit_button_text="OK"
            cancel_button_text="Cancel"
            date_format="dd/MM/yyyy"
            range={true}
            // return_format="DD/MM/YYYY"
            return_format="YYYY/MM/DD"
            on_change={({ date }) => {
              console.log('on_change', date)
            }}
            // on_hide={({ date }) => {
            //   console.log('on_hide', date)
            // }}
          />
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
