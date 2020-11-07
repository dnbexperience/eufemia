/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import Provider from '../../src/shared/Provider'
import {
  ToggleButton,
  Space,
  // FormSet,
  FormRow,
  FormLabel
} from '../../src/components'

import { H2 } from '../../src/elements'

export default {
  title: 'Eufemia/Components/ToggleButton'
}

function ToggleButtonGroup() {
  const [button1, setButton1] = React.useState(false)
  const [button2, setButton2] = React.useState(false)
  const [button3, setButton3] = React.useState(false)

  return (
    <>
      <ToggleButton.Group
        multiselect
        on_change={({ values }) => {
          console.log('values', values)
        }}
      >
        <ToggleButton
          checked={button1}
          variant="checkbox"
          text="Item 1"
          value="item_1"
          on_change={() => setButton1((s) => !s)}
        />
        <ToggleButton
          checked={button2}
          variant="checkbox"
          text="Item 2"
          value="item_2"
          on_change={() => setButton2((s) => !s)}
        />
        <ToggleButton
          checked={button3}
          variant="checkbox"
          text="Item 3"
          value="item_3"
          on_change={() => setButton3((s) => !s)}
        />
      </ToggleButton.Group>

      <Space top>
        <button
          onClick={() => {
            setButton1(true)
            setButton2(true)
            setButton3(true)
          }}
        >
          Check all
        </button>
        <button
          onClick={() => {
            setButton1(false)
            setButton2(false)
            setButton3(false)
          }}
        >
          Uncheck all
        </button>
      </Space>
      <Space element="pre" top>
        <div>State contents:</div>
        <div>Button1 state: {button1 ? 'true' : 'false'}</div>
        <div>Button2 state: {button2 ? 'true' : 'false'}</div>
        <div>Button3 state: {button3 ? 'true' : 'false'}</div>
      </Space>
    </>
  )
}

export const ToggleButtonSandbox = () => (
  <Wrapper>
    <Box>
      <ToggleButtonGroup />
    </Box>

    <Box>
      <Provider formRow={{ vertical: true }}>
        <FormRow disabled>
          <ToggleButton.Group>
            <ToggleButton
              text="First"
              value="first"
              suffix="123"
              status="error message"
              disabled={false}
            />
            <ToggleButton text="Second" value="second" disabled={false} />
            <ToggleButton text="Third A" value="thirdA" />
            <ToggleButton text="Third B" value="thirdB" />
            <ToggleButton text="Third C" value="thirdC" />
            <ToggleButton text="Third D" value="thirdD" />
            <ToggleButton text="Third E" value="thirdE" />
            <ToggleButton text="Third F" value="thirdF" />
            <ToggleButton text="Third G" value="thirdG" />
            <ToggleButton text="Third H" value="thirdH" />
            <ToggleButton text="Third I" value="thirdI" />
            <ToggleButton text="Third J" value="thirdJ" />
            <ToggleButton text="Third K" value="thirdK" />
            <ToggleButton text="Third L" value="thirdL" />
            <ToggleButton text="Third M" value="thirdM" />
            <ToggleButton text="Third N" value="thirdN" />
            <ToggleButton text="Last" value="last" />
          </ToggleButton.Group>
        </FormRow>
      </Provider>
    </Box>
    <Box>
      <FormRow
        indent
        label="Horizontal Legend Aptent maecenas non pharetra libero massa auctor pretium vulputate vivamus:"
        indent_offset="m-large"
      >
        <ToggleButton.Group label="Group A label:">
          <ToggleButton text="First" value="first" />
          <ToggleButton text="Second" value="second" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
        </ToggleButton.Group>
        <ToggleButton.Group label="Group B label:">
          <ToggleButton text="First" value="first" />
          <ToggleButton text="Second" value="second" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
          <ToggleButton text="Third" value="third" />
        </ToggleButton.Group>
      </FormRow>
    </Box>
    <Box>
      <p className="dnb-p">
        Text:
        <ToggleButton
          checked
          label="Label:"
          variant="checkbox"
          icon_position="right"
          // icon="bell"
          icon="chevron_right"
          text="Toggle Button"
          value="I'm alone"
          on_change={({ value, checked }) => {
            console.log('on_change', value, checked)
          }}
        />
      </p>
    </Box>
    <Box>
      <p className="dnb-p">
        Text:{' '}
        <ToggleButton
          checked
          label="Label"
          variant="radio"
          icon_position="right"
          // icon="bell"
          icon="chevron_right"
          text="Toggle Button"
          value="I'm alone"
          on_change={({ value, checked }) => {
            console.log('on_change', value, checked)
          }}
        />
      </p>
    </Box>
    <Box>
      <p className="dnb-p">
        <FormLabel id="MyToggleButtonGroup">
          Without ToggleButton.Group:
        </FormLabel>
        <span
          className="dnb-toggle-button-group"
          aria-labelledby="MyToggleButtonGroup"
        >
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
    </Box>
    <Box>
      <FormRow indent no_label>
        <H2>A h2 in a FormRow without a label</H2>
      </FormRow>
      <FormRow
        indent
        indent_offset="m-large"
        label="Long Group name with on_change dapibus eros viverra torquent euismod at dignissim vel mattis:"
      >
        <ToggleButton.Group
          // label="Group:"
          // label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
          on_change={({ value, values, event }) => {
            console.log('on_change', value, values, event)
          }}
          // value="first"
          status="Error message"
          // multiselect
          multiselect={true}
          // values={['first', 'third']}
          // variant="checkbox"
        >
          <ToggleButton text="First" value="first" />
          <ToggleButton text="Second" value="second" checked />
          <ToggleButton text="Third" value="third" checked />
          <ToggleButton text="Third" value="third" checked />
          <ToggleButton text="Third" value="third" checked />
          <ToggleButton text="Third" value="third" checked />
        </ToggleButton.Group>
      </FormRow>
    </Box>
    <Box>
      <FormRow
        indent
        indent_offset="m-large"
        label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:"
      >
        <ToggleButton.Group
          on_change={({ value }) => {
            console.log('on_change', value)
          }}
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
      <ToggleButton.Group label="Column group:" layout_direction="column">
        <ToggleButton text="First" value="first" />
        <ToggleButton text="Second" value="second" />
        <ToggleButton text="Third" value="third" checked />
      </ToggleButton.Group>
    </Box>
    <Box>
      <ToggleButton.Group
        label="Vertical group with error:"
        layout_direction="column"
        label_direction="vertical"
        // vertical="true"
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
        suffix="123"
        status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
      >
        <ToggleButton text="First" value="first" />
        <ToggleButton text="Second" value="second" />
        <ToggleButton text="Third" value="third" checked />
      </ToggleButton.Group>
    </Box>
    <Box>
      <ToggleButton
        text="Unchecked disabled"
        disabled
        checked
        variant="radio"
      />
    </Box>
    <Box>
      <ToggleButton
        text="Checked disabled"
        checked
        disabled
        variant="checkbox"
      />
    </Box>
    <Box>
      <ToggleButton
        text="Unchecked status error"
        status="error"
        variant="checkbox"
      />
      <ToggleButton
        text="Unchecked status error"
        status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        variant="checkbox"
        checked
        top="small"
      />
    </Box>
    <Box>
      <ToggleButton
        text="Checked status message"
        variant="radio"
        status="error"
      />
      <ToggleButton
        text="Checked status message"
        checked
        variant="radio"
        status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        top="small"
      />
    </Box>
    <Box>
      <ToggleButton
        text="Checked status message"
        variant="radio"
        status="Info message\n123"
        status_state="info"
      />
      <ToggleButton
        text="Checked status message"
        checked
        variant="checkbox"
        status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
        status_state="info"
        top="small"
      />
    </Box>
  </Wrapper>
)
