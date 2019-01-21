/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'

// UI Components
import {
  Button,
  Tabs,
  Input,
  IconPrimary as Icon,
  Modal,
  Dropdown
} from '../src/components'

const stories = []
export default stories

stories.push([
  'Buttons',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Button text="Primary" icon="add" />
      </Box>
      <Box>
        <Button text="Secondary" variant="secondary" icon="add" />
      </Box>
      <Box>
        <Button text="Signal" variant="signal" icon="add" />
      </Box>
      <Box>
        <Button
          text="Tertiary"
          variant="tertiary"
          icon_position="left"
          icon="add"
        />
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Anchor',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <a href="http://dnb.no">
          <Icon icon="chevron_left" /> Anchor
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no">
          Anchor <Icon icon="chevron_right" />
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no">
          Default Anchor - Adipiscing per egestas duis feugiat dignissim
          quam cras eget non est ante purus taciti volutpat mi phasellus
          rhoncus ridiculus diam at proin fusce bibendum netus dapibus
          natoque varius eros litora
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no" className="dnb-with-animation">
          Anchor with Animation <Icon icon="chevron_right" />
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no" className="dnb-with-animation">
          Anchor with Animation - Adipiscing per egestas duis feugiat
          dignissim quam cras eget non est ante purus taciti volutpat mi
          phasellus rhoncus ridiculus diam at proin fusce bibendum netus
          dapibus natoque varius eros litora
        </a>
      </Box>
      <Box>
        <a
          href="http://dnb.no"
          className="dnb-with-animation"
          style={{ whiteSpace: 'normal' }}
        >
          Anchor with Animation and no `white-space: pre;` - Adipiscing per
          egestas duis feugiat dignissim quam cras eget non est ante purus
          taciti volutpat mi phasellus rhoncus ridiculus diam at proin
          fusce bibendum netus dapibus natoque varius eros litora
        </a>
      </Box>
    </Wrapper>
  )
])

const tablistDataWithContent = [
  { title: 'First', key: 'first', content: <h2>First</h2> },
  { title: 'Second', key: 'second', content: () => <h2>Second</h2> }
]

stories.push([
  'Tabs',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Tabs use_hash="true" data={tabsData}>
          {exampleTabsContent}
        </Tabs>
      </Box>
      <Box>
        <Tabs data={tablistDataWithContent} />
      </Box>
      <Box>
        <Tabs
          selected_key="second"
          data={{
            first: { title: 'First', content: () => <h2>First</h2> },
            second: { title: 'Second', content: () => <h2>Second</h2> }
          }}
        />
      </Box>
      <Box>
        <Tabs>
          <Tabs.Content title="First">
            <h2>First</h2>
          </Tabs.Content>
          <Tabs.Content title="Second" selected>
            <h2>Second</h2>
          </Tabs.Content>
        </Tabs>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Inputs',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Input label="Label:">Input ...</Input>
      </Box>
      <Box>
        <Input placeholder="Placeholder ..." />
      </Box>
      <Box>
        <Input
          label="Input with Status:"
          status="Message to the user"
          value="Input value with status"
        />
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Icons',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Icon icon="add" size="medium" />
      </Box>
      <Box>
        <Button icon="add" />
      </Box>
      <Box>
        <Button title="Click Me" on_click={showMe}>
          <Icon icon="add" size="medium" />
        </Button>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Modal',
  () => (
    <Wrapper className="dnb-style">
      <Modal
        modal_trigger_text="Open Modal"
        title="Title for accessibility"
      >
        <h2>Some content</h2>
        <Input>Focus me with Tab key</Input>
      </Modal>
    </Wrapper>
  )
])

stories.push([
  'Dropdown',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Dropdown data={data} selected_item={2} />
      </Box>
    </Wrapper>
  )
])

const exampleTabsContent = {
  first: () => <h2>First</h2>,
  second: () => <Input>Focus me with next Tab key</Input>,
  third: () => (
    <p>
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: () => <h2>Fourth</h2>
}
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]

const showMe = e => {
  console.log('showMe', e)
}

const data = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    // outside_value: '1234.56.78901',
    content: 'Brukskonto - Kari Nordmann'
  },
  {
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    // outside_value: '1134.56.78962',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    // outside_value: '1534.96.48901',
    content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
  }
]
