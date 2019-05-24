/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  Radio
  // , FormLabel
} from '../../src/components'

export default [
  'Radio',
  () => (
    <Wrapper>
      {/* <Box>
        <p className="dnb-p">
          Text: <FormLabel for_id="radio">Unchecked:</FormLabel>
          <Radio id="radio" />
        </p>
      </Box> */}
      <Box>
        <Radio
          label="Unchecked:"
          value="Alone"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
        />
      </Box>
      <Box>
        <Radio
          // label="A:"
          value="A"
          group="RadioGroup"
          on_change={({ group, value }) => {
            console.log('on_change', group, value)
          }}
        />
        <Radio
          // label="B:"
          checked
          value="B"
          group="RadioGroup"
          on_change={({ group, value }) => {
            console.log('on_change', group, value)
          }}
        />
      </Box>
      <Box>
        <Radio.Group
          label="Group:"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
          value="First"
          // name="A"
          // disabled
        >
          <Radio
            // group="A"
            // label="Checked:"
            // checked
            value="First"
            // on_change={({ value, checked }) => {
            //   console.log('on_change', value, checked)
            // }}
          />
          <Radio
            // group="A"
            // label="Checked:"
            // checked
            value="Second"
            // on_change={({ value, checked }) => {
            //   console.log('on_change', value, checked)
            // }}
          />
        </Radio.Group>
      </Box>
      {/* <Box>
        <Radio
          label="Unchecked:"
          on_change={({  value,checked, }) => {
            console.log('on_change', value, checked)
          }}
        />
      </Box>
      <Box>
        <Radio label="Unchecked disabled:" checked={false} disabled />
      </Box>
      <Box>
        <Radio label="Checked disabled:" checked disabled />
      </Box>
      <Box>
        <Radio
          label="Unchecked status error:"
          checked={false}
          status="error"
        />
      </Box>
      <Box>
        <Radio
          label="Checked status message:"
          checked
          status="Error message"
        />
      </Box> */}
    </Wrapper>
  )
]
