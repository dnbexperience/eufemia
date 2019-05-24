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
        <FormLabel for_id="alone">Single Radio button:</FormLabel>
        <Radio
          id="alone"
          // label="Alone:"
          value="I'm alone"
          title="Give me a Title"
          on_change={({ value, checked }) => {
            console.log('on_change', value, checked)
          }}
        />
      </Box>
      <Box>
        <p className="dnb-p dnb-radio-group">
          <FormLabel id="MyRadioGroup">Without Radio.Group:</FormLabel>
          <Radio
            value="First"
            label="First"
            group="MyRadioGroup"
            labelledby="MyRadioGroup"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
          <Radio
            checked
            value="Second"
            label="Second"
            group="MyRadioGroup"
            labelledby="MyRadioGroup"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
          <Radio
            checked
            value="Third"
            label="Third"
            group="MyRadioGroup"
            labelledby="MyRadioGroup"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
        </p>
      </Box>
      <Box>
        <Radio.Group
          label="Group:"
          title="Give me a Title"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
          value="First"
          // disabled
          // name="MyGroup" // The Group Name
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
        <Radio.Group
          label="Group:"
          title="Give me a Title"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
          // disabled
          // name="First" // Custom Group Name
        >
          <Radio label="First" value="First" label_position="right" />
          <Radio
            label="Second"
            value="Second"
            label_position="right"
            status="Error message"
          />
          <Radio
            label="Third"
            value="Third"
            checked
            label_position="right"
            status="Info message"
            status_state="info"
          />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group label="Vertical group:" layout_direction="column">
          <Radio label="First" value="First" label_position="right" />
          <Radio label="Second" value="Second" label_position="right" />
          <Radio
            label="Third"
            value="Third"
            checked
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
