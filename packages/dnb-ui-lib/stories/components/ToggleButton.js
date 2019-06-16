/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  ToggleButton,
  Button,
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
          <FormLabel for_id="alone-1">
            Single ToggleButton button:
          </FormLabel>
          <ToggleButton
            id="alone-1"
            left_component="checkbox"
            icon_position="left"
            // icon="bell"
            icon="chevron_left"
            text="Toggle Button"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
          <ToggleButton
            checked
            left_component="checkbox"
            icon_position="right"
            // icon="bell"
            icon="chevron_right"
            text="Toggle Button"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
          <ToggleButton
            // checked
            left_component="checkbox"
            text="Toggle Button"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
        </p>
      </Box>
      <Box>
        <p className="dnb-p">
          Text:{' '}
          <FormLabel for_id="alone-2">
            Single ToggleButton button:
          </FormLabel>
          <ToggleButton
            id="alone-2"
            checked
            left_component="radio"
            icon_position="left"
            // icon="bell"
            icon="chevron_left"
            text="Toggle Button"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
          <ToggleButton
            checked
            left_component="radio"
            icon_position="right"
            // icon="bell"
            icon="chevron_right"
            text="Toggle Button"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
          <ToggleButton
            // checked
            left_component="radio"
            text="Toggle Button"
            value="I'm alone"
            title="Give me a Title"
            on_change={({ value, checked }) => {
              console.log('on_change', value, checked)
            }}
          />
          <Button icon="chevron_right" text="Button" variant="secondary" />
        </p>
      </Box>
      {/* <Box>
        <p className="dnb-p dnb-toggle-button-group">
          <FormLabel id="MyToggleButtonGroup">
            Without ToggleButton.Group:
          </FormLabel>
          <span role="radiogroup" aria-labelledby="MyToggleButtonGroup">
            <ToggleButton
              value="first"
              text="First"
              group="MyToggleButtonGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
            <ToggleButton
              checked
              value="second"
              text="Second"
              group="MyToggleButtonGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
            <ToggleButton
              checked
              value="third"
              text="Third"
              group="MyToggleButtonGroup"
              on_change={({ group, value }) => {
                console.log('on_change', group, value)
              }}
            />
          </span>
        </p>
      </Box> */}
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
            on_change={({ value, values }) => {
              console.log('on_change', value, values)
            }}
            // value="first"
            multiselect
            values={['first', 'third']}
            left_component="checkbox"
            // value={['first', 'second']}
            // disabled
            // name="MyGroup" // The Group Name
          >
            <ToggleButton text="First" value="first" />
            <ToggleButton text="Second" value="second" />
            <ToggleButton
              text="Third"
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
            <ToggleButton text="First" value="first" />
            <ToggleButton
              text="Second"
              value="second"
              status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
            />
            <ToggleButton
              text="Third"
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
          <ToggleButton text="First" value="first" />
          <ToggleButton text="Second" value="second" />
          <ToggleButton text="Third" value="third" checked />
        </ToggleButton.Group>
      </Box>
      <Box>
        <ToggleButton.Group
          label="Vertical group with error:"
          layout_direction="column"
          vertical="true"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <ToggleButton text="First" value="first" />
          <ToggleButton text="Second" value="second" />
          <ToggleButton text="Third" value="third" checked />
        </ToggleButton.Group>
      </Box>
      <Box>
        <ToggleButton.Group
          label="Group with error:"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <ToggleButton
            // label_position="left"
            text="First"
            value="first"
          />
          <ToggleButton
            // label_position="left"
            text="Second"
            value="second"
          />
          <ToggleButton
            // label_position="left"
            text="Third"
            value="third"
            checked
          />
        </ToggleButton.Group>
      </Box>
      <Box>
        <ToggleButton text="Unchecked disabled" disabled />
      </Box>
      <Box>
        <ToggleButton text="Checked disabled" checked disabled />
      </Box>
      <Box>
        <ToggleButton
          text="Unchecked status error Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
          status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
      <Box>
        <ToggleButton
          text="Checked status message"
          checked
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        />
      </Box>
    </Wrapper>
  )
]
