/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Radio, FormLabel } from '../../src/components'

export default [
  'Radio',
  () => (
    <Wrapper>
      <Box>
        <Radio
          label="Alone:"
          value="I'm alone"
          on_change={({ value, checked }) => {
            console.log('on_change', value, checked)
          }}
        />
      </Box>
      <Box>
        <p className="dnb-p dnb-radio-group">
          <FormLabel id="RadioGroup">Without Radio.Group:</FormLabel>
          <Radio
            value="A"
            label="A"
            group="RadioGroup"
            labelledby="RadioGroup"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
          <Radio
            checked
            value="B"
            label="B"
            group="RadioGroup"
            labelledby="RadioGroup"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
        </p>
      </Box>
      <Box>
        <Radio.Group
          label="Group:"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
          // value="First"
          // disabled
          // name="A" // The Group Name
        >
          <Radio label="First" value="First" label_position="right" />
          <Radio label="Second" value="Second" label_position="right" />
          <Radio
            label="Third"
            value="Third"
            // checked
            label_position="right"
          />
        </Radio.Group>
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
      </Box>
    </Wrapper>
  )
]
