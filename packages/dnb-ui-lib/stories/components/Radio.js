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

import { H2 } from '../../src/elements'

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
          <span role="radiogroup" aria-labelledby="MyRadioGroup">
            <Radio
              value="first"
              label="First"
              group="MyRadioGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
            <Radio
              checked
              value="second"
              label="Second"
              group="MyRadioGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
            <Radio
              checked
              value="third"
              label="Third"
              group="MyRadioGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
          </span>
        </p>
      </Box>
      <Box>
        <FormRow size no_label>
          <H2>A h2 in a FormRow without a label</H2>
        </FormRow>
        <FormRow size>
          <Radio.Group
            label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
            // label="Group:"
            // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            value="first"
            // disabled
            // name="MyGroup" // The Group Name
          >
            <Radio label="First" value="first" />
            <Radio label="Second" value="second" />
            <Radio
              label="Third"
              value="third"
              // checked
            />
          </Radio.Group>
        </FormRow>
      </Box>
      <Box>
        <FormRow
          size
          label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
        >
          <Radio.Group
            label="Group label:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            // disabled
            // name="First" // Custom Group Name
          >
            <Radio label="First" value="first" />
            <Radio
              label="Second"
              value="second"
              status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
            />
            <Radio
              label="Third"
              value="third"
              checked
              status="Info message"
              status_state="info"
            />
          </Radio.Group>
        </FormRow>
      </Box>
      <Box>
        <Radio.Group label="Vertical group:" layout_direction="column">
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" checked />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group
          label="Vertical group with error:"
          layout_direction="column"
          vertical="true"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" checked />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group
          label="Group with error:"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <Radio label_position="left" label="First" value="first" />
          <Radio label_position="left" label="Second" value="second" />
          <Radio
            label_position="left"
            label="Third"
            value="third"
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
