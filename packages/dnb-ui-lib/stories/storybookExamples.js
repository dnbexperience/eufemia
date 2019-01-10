/**
 * Storybook Story
 *
 */

import React from 'react'
import styled from '@emotion/styled'

// UI style + theme
// import '../src/style'

// for testing with IE11, we have to use the build version
// make sure to run `yarn build` first
import '../style/lib-IE11'

// UI Components
import {
  Button,
  Tabs,
  Input,
  IconPrimary as Icon,
  Modal,
  Dropdown
} from '../src/components'

export const components = []

components.push([
  'Buttons',
  () => (
    <Wrapper className="dnb-style">
      <Button text="Primary" icon="add" />
      <Button text="Secondary" variant="secondary" icon="add" />
      <Button text="Signal" variant="signal" icon="add" />
      <Button
        text="Tertiary"
        variant="tertiary"
        icon_position="left"
        icon="add"
      />
      <a href="http://dnb.no">
        <Icon icon="add" /> Anker
      </a>
    </Wrapper>
  )
])

components.push([
  'Tabs',
  () => (
    <Wrapper className="dnb-style">
      <Tabs use_hash="true" data={tabsData}>
        {exampleTabsContent}
      </Tabs>
    </Wrapper>
  )
])

components.push([
  'Inputs',
  () => (
    <Wrapper className="dnb-style">
      <Input label="Label:">Input ...</Input>
      <Input value="Value ..." />
      <Input placeholder="Placeholder ..." />
      <Input
        label="Input with Status:"
        status="Message to the user"
        value="Input value with status"
      />
    </Wrapper>
  )
])

components.push([
  'Icons',
  () => (
    <Wrapper className="dnb-style">
      <Icon icon="add" size="medium" />
      <Button icon="add" />
      <Button on_click={showMe}>
        <Icon icon="add" size="medium" />
      </Button>
    </Wrapper>
  )
])

components.push([
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

components.push([
  'Dropdown',
  () => (
    <Wrapper className="dnb-style">
      <Dropdown data={data} selected_item={2} />
    </Wrapper>
  )
])

// components.push(['Icon', () => <Icon icon="add" />])
// components.sort(([a], [b]) => (a > b ? 1 : -1))

const Wrapper = styled.div``

const exampleTabsContent = {
  first: <h2>First</h2>,
  second: <Input>Focus me with next Tab key</Input>,
  third: (
    <p>
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: <h2>Fourth</h2>
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
