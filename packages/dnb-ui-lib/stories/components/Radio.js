/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  Radio,
  // FormSet,
  FormRow,
  FormLabel
} from '../../src/components'

export default [
  'Radio',
  () => (
    <Wrapper>
      <Box>
        <p className="dnb-p">
          Text: <FormLabel for_id="alone">Single Radio button:</FormLabel>
          <Radio
            id="alone"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
        </p>
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
        {/* <FormSet size> */}
        <FormRow size>
          <FormLabel aria-hidden />
          123
        </FormRow>
        <FormRow
          size
          label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
        >
          <Radio.Group
            // label="Group:"
            // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            value="First"
            // disabled
            // name="MyGroup" // The Group Name
          >
            <Radio label="First" value="First" />
            <Radio label="Second" value="Second" />
            <Radio
              label="Third"
              value="Third"
              // checked
            />
          </Radio.Group>
        </FormRow>
        {/* </FormSet> */}
      </Box>
      <Box>
        <Radio.Group
          // label="Group:"
          label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
          title="Give me a Title"
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
          // disabled
          // name="First" // Custom Group Name
        >
          <Radio label="First" value="First" />
          <Radio
            label="Second"
            value="Second"
            status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          />
          <Radio
            label="Third"
            value="Third"
            checked
            status="Info message"
            status_state="info"
          />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group label="Vertical group:" direction="vertical">
          <Radio label="First" value="First" />
          <Radio label="Second" value="Second" />
          <Radio label="Third" value="Third" checked />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group
          label="Vertical group with error:"
          vertical="true"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <Radio label="First" value="First" />
          <Radio label="Second" value="Second" />
          <Radio label="Third" value="Third" checked />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group
          label="Group with error:"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <Radio label_position="left" label="First" value="First" />
          <Radio label_position="left" label="Second" value="Second" />
          <Radio
            label_position="left"
            label="Third"
            value="Third"
            checked
          />
        </Radio.Group>
      </Box>
      <Box>
        <Radio label="Unchecked disabled" disabled />
      </Box>
      <Box>
        <Radio label="Checked disabled" checked disabled />
      </Box>
      <Box>
        <Radio
          label="Unchecked status error Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
      <Box>
        <Radio
          label="Checked status message"
          checked
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
    </Wrapper>
  )
]
