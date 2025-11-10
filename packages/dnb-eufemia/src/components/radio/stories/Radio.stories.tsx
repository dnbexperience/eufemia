/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Radio, FormLabel, Button, HelpButton, GlobalStatus } from '../..'

import { Flex } from '../../..'
import { Provider } from '../../../shared'
import { Form } from '../../../extensions/forms'

export default {
  title: 'Eufemia/Components/Radio',
}

export const RadioButtonSandbox = () => (
  <Wrapper>
    <Box>
      <Radio.Group label="With suffixes:" suffix="And a group suffix">
        <Radio label="First" value="first" />
        <Radio
          label="Second"
          value="second"
          status="Error message"
          suffix={
            <HelpButton title="Modal Title">Modal content</HelpButton>
          }
        />
        <Radio label="Third" value="third" />
      </Radio.Group>
    </Box>
    <Box>
      <Flex.Horizontal align="baseline">
        <Radio.Group label="Group A label:" suffix="Suffix 123">
          <Radio label="first" value="first" />
          <Radio suffix="Suffix 123" label="second" value="second" />
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
      </Flex.Horizontal>
    </Box>
    <Box>
      <RadioGroupsWithStatus />
    </Box>
    <Box>
      <p className="dnb-p">
        Text: <FormLabel forId="alone">Single Radio button:</FormLabel>
        <Radio
          id="alone"
          value="I'm alone"
          onChange={({ value, checked }) => {
            console.log('onChange', value, checked)
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
            onChange={({ group, value }) => {
              console.log('onChange', group, value)
            }}
          />
          <Radio
            checked
            value="second"
            label="Second"
            group="MyRadioGroup"
            onChange={({ group, value }) => {
              console.log('onChange', group, value)
            }}
          />
          <Radio
            checked
            value="third"
            label="Third"
            group="MyRadioGroup"
            onChange={({ group, value }) => {
              console.log('onChange', group, value)
            }}
          />
        </span>
      </p>
    </Box>
    <Box>
      <Flex.Horizontal align="baseline">
        <Radio.Group
          onChange={({ value }) => {
            console.log('onChange', value)
          }}
          value="first"
          status="Error message"
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" />
        </Radio.Group>
      </Flex.Horizontal>
    </Box>
    <Box>
      <Flex.Horizontal align="baseline">
        <Radio.Group
          label="Group label:"
          onChange={({ value }) => {
            console.log('onChange', value)
          }}
          status="Error message"
        >
          <Radio label="First" value="first" />
          <Radio
            label="Second"
            value="second"
            status="Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
            suffix="Suffix 123"
          />
          <Radio
            label="Third"
            value="third"
            checked
            status="Info message"
            statusState="info"
          />
        </Radio.Group>
      </Flex.Horizontal>
    </Box>
    <Box>
      <Radio.Group label="Vertical group:" layoutDirection="column">
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
        <Radio label="Third" value="third" />
      </Radio.Group>
    </Box>
    <Box>
      <Radio.Group
        label="Vertical group with error:"
        layoutDirection="column"
        labelDirection="vertical"
        status="Error message Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
      >
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
        <Radio label="Third" value="third" checked />
      </Radio.Group>
    </Box>
    <Box>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Radio.Group label="Vertical with Provider:">
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" checked />
        </Radio.Group>
      </Provider>
    </Box>
    <Box>
      <Radio.Group label="Vertical label:" labelDirection="vertical">
        <Radio label="First" value="first" />
        <Radio label="Second" value="second" />
        <Radio label="Third" value="third" checked />
      </Radio.Group>
    </Box>
    <Box>
      <Radio.Group
        label="Group with error:"
        labelDirection="vertical"
        labelPosition="left" // for every radio button
        status="Error message left position Potenti viverra facilisi blandit sodales lorem est fusce pulvinar a imperdiet quis mi parturient mattis feugiat tellus ipsum magnis rutrum"
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

const RadioGroupsWithStatus = () => {
  const [currentValueForGroupA, setValueForGroupA] =
    React.useState('first')
  const [currentValueForGroupB, setValueForGroupB] =
    React.useState('second')

  return (
    <Form.Handler>
      <Provider formElement={{ labelDirection: 'vertical' }}>
        <Radio.Group
          label="Group A label:"
          value={currentValueForGroupA}
          onChange={({ value }) => {
            console.log('onChange A', value)
            setValueForGroupA(value)
          }}
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" />
        </Radio.Group>
        <Radio.Group
          label="Group B label:"
          value={currentValueForGroupB}
          onChange={({ value }) => {
            console.log('onChange B', value)
          }}
        >
          <Radio label="First" value="first" />
          <Radio label="Second" value="second" />
          <Radio label="Third" value="third" />
        </Radio.Group>
        <Button
          on_click={() => {
            setValueForGroupB(
              shuffleArray(['first', 'second', 'third'])[0]
            )
          }}
          text="Set New State"
        />
      </Provider>
    </Form.Handler>
  )
}
const shuffleArray = (arr) =>
  arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1])

export const GlobalStatusExample = () => {
  return (
    <>
      <GlobalStatus id="my-id" />
      <Radio
        label="First"
        value="first"
        globalStatus={{ id: 'my-id', message: 'my message' }}
        status="Message"
      />
    </>
  )
}
