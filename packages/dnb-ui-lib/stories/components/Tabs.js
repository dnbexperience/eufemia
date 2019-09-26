/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Input, Tabs } from '../../src/components'

import { H2 } from '../../src/elements'
import TabsNavigation from './TabsNavigation'

export default [
  'Tabs',
  () => (
    <Wrapper>
      <Box>
        <TabsNavigation />
      </Box>
      <Box>
        <Tabs data={tabsData}>{exampleTabsContent}</Tabs>
      </Box>
      <Box>
        <Tabs data={tablistDataWithContent} />
      </Box>
      <Box>
        <Tabs
          selected_key="second"
          data={{
            first: { title: 'First', content: () => <H2>First</H2> },
            second: { title: 'Second', content: () => <H2>Second</H2> }
          }}
        />
      </Box>
      <Box>
        <Tabs section_style="mint-green">
          <Tabs.Content title="First">
            <H2>First</H2>
          </Tabs.Content>
          <Tabs.Content title={<>Second as component</>} selected>
            <H2>Second</H2>
          </Tabs.Content>
        </Tabs>
      </Box>
      <Box>
        <Tabs
          align="right"
          label="Some Tabs label"
          data={tabsData}
          render={({ Wrapper, Content, TabsList, Tabs }) => {
            return (
              <Wrapper>
                <TabsList className="dnb-section">
                  <small>I'm on the left side</small>
                  <Tabs />
                </TabsList>
                <Content />
              </Wrapper>
            )
          }}
        >
          {exampleTabsContent}
        </Tabs>
      </Box>
    </Wrapper>
  )
]

const tablistDataWithContent = [
  { title: 'First', key: 'first', content: <H2>First</H2> },
  { title: 'Second', key: 'second', content: () => <H2>Second</H2> }
]

const exampleTabsContent = {
  first: () => <H2>First</H2>,
  second: () => <Input>Focus me with next Tab key</Input>,
  third: () => (
    <p className="dnb-p">
      Eros semper blandit tellus mollis primis quisque platea sollicitudin
      ipsum
    </p>
  ),
  fourth: () => <H2>Fourth</H2>
}
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]
