/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import Provider from '../../../shared/Provider'
import {
  ToggleButton,
  Button,
  Space,
  FormLabel,
  GlobalStatus,
  Flex,
} from '../..'

import { H2 } from '../../..'
import { FieldBlock } from '../../../extensions/forms'

export default {
  title: 'Eufemia/Components/ToggleButton',
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
      <Provider
        formElement={{ label_direction: 'vertical', disabled: true }}
      >
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
      </Provider>
    </Box>
    <Box>
      <FieldBlock label="Horizontal Legend Aptent maecenas non pharetra libero massa auctor pretium vulputate vivamus:">
        <Flex.Vertical>
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
        </Flex.Vertical>
      </FieldBlock>
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
          role="group"
        >
          <ToggleButton
            value="first"
            text="First"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
          <ToggleButton
            checked
            value="second"
            text="Second"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
          <ToggleButton
            checked
            value="third"
            text="Third"
            on_change={({ group, value }) => {
              console.log('on_change', group, value)
            }}
          />
        </span>
      </p>
    </Box>
    <Box>
      <Flex.Vertical>
        <H2>A h2 in a FormRow without a label</H2>
        <FieldBlock label="Long Group name with on_change dapibus eros viverra torquent euismod at dignissim vel mattis:">
          <ToggleButton.Group
            on_change={({ value, values, event }) => {
              console.log('on_change', value, values, event)
            }}
            status="Error message"
            multiselect={true}
          >
            <ToggleButton text="First" value="first" />
            <ToggleButton text="Second" value="second" checked />
            <ToggleButton text="Third" value="third" checked />
            <ToggleButton text="Third" value="third" checked />
            <ToggleButton text="Third" value="third" checked />
            <ToggleButton text="Third" value="third" checked />
          </ToggleButton.Group>
        </FieldBlock>
      </Flex.Vertical>
    </Box>
    <Box>
      <FieldBlock label="Long Group name Vitae dapibus eros viverra torquent euismod at dignissim vel mattis:">
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
      </FieldBlock>
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
        // vertical={true}
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

export function MultiselectRerender() {
  const [values, setValues] = React.useState(['third'])
  const [count, increment] = React.useState(0)

  const selectAll = () => setValues(['first', 'second', 'third'])
  const deselectAll = () => setValues([])

  return (
    <>
      <Button
        variant="secondary"
        text="Select all"
        on_click={selectAll}
        right
      />
      <Button
        variant="secondary"
        text="Deselect"
        on_click={deselectAll}
        right
      />
      <Button
        variant="secondary"
        text={'Increment ' + count}
        on_click={() => increment((s) => s + 1)}
        right
      />
      <br />
      <ToggleButton.Group
        top
        label="Vertical Group:"
        variant="checkbox"
        value={'second'}
        multiselect={true}
        values={values}
        on_change={({ values }) => {
          console.log('on_change', values)
          setValues(values)
        }}
      >
        <ToggleButton text="First" value="first" />
        <ToggleButton text="Second" value="second" />
        <ToggleButton text="Third" value="third" checked />
      </ToggleButton.Group>
    </>
  )
}

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <ToggleButton
        variant="checkbox"
        text="Item 3"
        value="item_3"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}
