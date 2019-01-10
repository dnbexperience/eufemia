/**
 * Storybook Story
 *
 */

import React from 'react'
import styled from '@emotion/styled'

// UI style + theme
// import '../src/style'
import '../style/lib-IE11' // for testing with IE11, we have to use the build version

// UI Components
import {
  Button,
  Tabs,
  Input,
  IconPrimary as Icon
} from '../src/components'

export const components = []

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

components.push([
  'Button',
  () => (
    <Wrapper className="dnb-style">
      <h1>H1</h1>
      <Button text="Button" />
      <Button text="Button" icon="add" />
    </Wrapper>
  )
])

const showMe = e => {
  console.log('showMe', e)
}

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

// components.push(['Icon', () => <Icon icon="add" />])
// components.sort(([a], [b]) => (a > b ? 1 : -1))
