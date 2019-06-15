/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  ToggleButton,
  // FormSet,
  FormRow,
  FormLabel
} from '../../src/components'

import { H2 } from '../../src/elements'

export default [
  'ToggleButton',
  () => (
    <Wrapper>
      <Box>
        <p className="dnb-p">
          Text:{' '}
          <FormLabel for_id="alone">Single ToggleButton button:</FormLabel>
          <ToggleButton
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
        <p className="dnb-p dnb-toggle-button-group">
          <FormLabel id="MyToggleButtonGroup">
            Without ToggleButton.Group:
          </FormLabel>
          <span role="radiogroup" aria-labelledby="MyToggleButtonGroup">
            <ToggleButton
              value="first"
              label="First"
              group="MyToggleButtonGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
            <ToggleButton
              checked
              value="second"
              label="Second"
              group="MyToggleButtonGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
            <ToggleButton
              checked
              value="third"
              label="Third"
              group="MyToggleButtonGroup"
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
          <ToggleButton.Group
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
            <ToggleButton label="First" value="first" />
            <ToggleButton label="Second" value="second" />
            <ToggleButton
              label="Third"
              value="third"
              // checked
            />
          </ToggleButton.Group>
        </FormRow>
      </Box>
      <Box>
        <FormRow
          size
          label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
        >
          <ToggleButton.Group
            label="Group label:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            // disabled
            // name="First" // Custom Group Name
          >
            <ToggleButton label="First" value="first" />
            <ToggleButton
              label="Second"
              value="second"
              status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
            />
            <ToggleButton
              label="Third"
              value="third"
              checked
              status="Info message"
              status_state="info"
            />
          </ToggleButton.Group>
        </FormRow>
      </Box>
      <Box>
        <ToggleButton.Group
          label="Vertical group:"
          layout_direction="column"
        >
          <ToggleButton label="First" value="first" />
          <ToggleButton label="Second" value="second" />
          <ToggleButton label="Third" value="third" checked />
        </ToggleButton.Group>
      </Box>
      <Box>
        <ToggleButton.Group
          label="Vertical group with error:"
          layout_direction="column"
          vertical="true"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <ToggleButton label="First" value="first" />
          <ToggleButton label="Second" value="second" />
          <ToggleButton label="Third" value="third" checked />
        </ToggleButton.Group>
      </Box>
      <Box>
        <ToggleButton.Group
          label="Group with error:"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <ToggleButton
            label_position="left"
            label="First"
            value="first"
          />
          <ToggleButton
            label_position="left"
            label="Second"
            value="second"
          />
          <ToggleButton
            label_position="left"
            label="Third"
            value="third"
            checked
          />
        </ToggleButton.Group>
      </Box>
      <Box>
        <ToggleButton label="Unchecked disabled" disabled />
      </Box>
      <Box>
        <ToggleButton label="Checked disabled" checked disabled />
      </Box>
      <Box>
        <ToggleButton
          label="Unchecked status error Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
      <Box>
        <ToggleButton
          label="Checked status message"
          checked
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
    </Wrapper>
  )
]
