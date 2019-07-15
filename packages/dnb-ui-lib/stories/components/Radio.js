/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState } from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import {
  Radio,
  FormSet,
  FormRow,
  FormLabel,
  Button
} from '../../src/components'

import { H2 } from '../../src/elements'

export default [
  'Radio',
  () => (
    <Wrapper>
      <Box>
        <FormRow label="Legend:">
          <Radio.Group label="Group A label:">
            <Radio label="first" value="first" />
            <Radio label="second" value="second" />
            <Radio label="third" value="third" />
            <Radio label="third-1" value="third-1" />
            <Radio label="third-2" value="third-2" />
            <Radio label="third-3" value="third-3" />
            <Radio label="third-4" value="third-4" />
          </Radio.Group>
          <Radio.Group label="Group B label:">
            <Radio label="first" value="first" />
            <Radio label="second" value="second" />
            <Radio label="third" value="third" />
            <Radio label="third-1" value="third-1" />
            <Radio label="third-2" value="third-2" />
            <Radio label="third-3" value="third-3" />
            <Radio label="third-4" value="third-4" />
          </Radio.Group>
        </FormRow>
      </Box>
      <Box>
        <RadioGroupsWithStatus />
      </Box>
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
        <FormRow indent no_label>
          <H2>A h2 in a FormRow without a label</H2>
        </FormRow>
        <FormRow
          indent
          label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
        >
          <Radio.Group
            // label="Group:"
            // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            value="first"
            status="Error message"
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
          indent
          label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
        >
          <Radio.Group
            // direction="vertical"
            label="Group label:"
            title="Give me a Title"
            on_change={({ value }) => {
              console.log('on_change', value)
            }}
            status="Error message"
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
          label_direction="vertical"
          // vertical="true"
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" checked />
        </Radio.Group>
      </Box>
      <Box>
        <FormRow vertical>
          <Radio.Group label="Vertical with FormRow:">
            <Radio label="First" value="first" />
            <Radio label="Second" value="second" />
            <Radio label="Third" value="third" checked />
          </Radio.Group>
        </FormRow>
      </Box>
      <Box>
        <Radio.Group label="Vertical label:" label_direction="vertical">
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" checked />
        </Radio.Group>
      </Box>
      <Box>
        <Radio.Group
          label="Group with error:"
          label_direction="vertical"
          label_position="left" // for every radio button
          status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" checked />
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

const RadioGroupsWithStatus = () => {
  const [currentValueForGorupA, setValueForGorupA] = useState('first')
  const [currentValueForGorupB, setValueForGorupB] = useState('second')

  return (
    <FormSet>
      <FormRow vertical>
        <Radio.Group
          label="Group A label:"
          // label_direction="vertical"
          value={currentValueForGorupA}
          on_change={({ value }) => {
            console.log('on_change A', value)
            setValueForGorupA(value)
          }}
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" />
        </Radio.Group>
        <Radio.Group
          label="Group B label:"
          // label_direction="vertical"
          value={currentValueForGorupB}
          on_change={({ value }) => {
            console.log('on_change B', value)
          }}
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" />
        </Radio.Group>
        <Button
          on_click={() => {
            setValueForGorupB(
              shuffleArray(['first', 'second', 'third'])[0]
            )
          }}
          text="Set New State"
        />
      </FormRow>
    </FormSet>
  )
}
const shuffleArray = arr =>
  arr
    .map(a => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1])
