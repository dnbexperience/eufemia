/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'

import { Input, Tabs, Icon } from '../../src/components'
import { bell as Bell } from '../../src/icons'

import { H2 } from '../../src/elements'
import { TabsNavigation } from './TabsNavigation'

export default {
  title: 'Eufemia/Components/Tabs'
}

export const TabsSandbox = () => {
  const [value, setValue] = React.useState('test')

  return (
    <Wrapper>
      <Global
        styles={css`
          /* div > .dnb-space, */
          .sb-show-main {
            padding: 0 !important;
          }
          main.dnb-core-style > div {
            padding: 0 !important;
          }
          .dnb-tabs__tabs {
            margin: 0 -2rem;
            /* padding: 0 2rem; */
          }
          .dnb-tabs__tabs__tablist {
            padding: 0 2rem;
          }
        `}
      />
      <Box>
        <Input
          label="Change state"
          value={value}
          onChange={({ value }) => setValue(value)}
        />

        <pre>I am changing!: {value}</pre>

        <Tabs bottom prerender>
          <Tabs.Content title="Tab 1">
            <>
              Change me 1: {value}{' '}
              <Input
                label="Change state"
                value={value}
                onChange={({ value }) => setValue(value)}
              />
            </>
          </Tabs.Content>
          <Tabs.Content title="Tab 2">
            <>
              Change me 2: {value}{' '}
              <Input
                label="Change state"
                value={value}
                onChange={({ value }) => setValue(value)}
              />
            </>
          </Tabs.Content>
        </Tabs>
      </Box>
      <Box>
        <TabsAndRerender />
      </Box>
      <Box>
        <TabsNavigation />
      </Box>
      <Box>
        <Tabs prevent_rerender data={tabsData}>
          {{
            first: (
              <>
                Change me 1: {value}{' '}
                <Input
                  label="Change state"
                  // value={value}
                  onChange={({ value }) => setValue(value)}
                />
              </>
            ),
            second: () => (
              <>
                Change me 2: {value}{' '}
                <Input
                  label="Change state"
                  // value={value}
                  onChange={({ value }) => setValue(value)}
                />
              </>
            ),
            third: () => (
              <p className="dnb-p">
                Eros semper blandit tellus mollis primis quisque platea
                sollicitudin ipsum
              </p>
            ),
            fourth: () => <H2>Fourth</H2>
          }}
        </Tabs>
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
}

const tablistDataWithContent = [
  { title: 'First', key: 1, content: <H2>First</H2> },
  { title: 'Second', key: 2, content: () => <H2>Second</H2> }
]

const exampleTabsContent = {
  first: () => <H2>First</H2>,
  second: () => <Input>Value</Input>,
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

const TabStyle = styled.div`
  .dnb-tabs__button__title:active {
    opacity: 0.2;
  }
  ${'' /* .dnb-icon--default:active {
    opacity: 0.2;
  } */}
`

const TabsAndRerender = () => (
  <TabStyle>
    <Tabs
      section_style="mint-green"
      prevent_rerender
      // content={{
      //   one: ContentOne,
      //   two: ContentTwo,
      //   three: 'Content three'
      // }}
      data={[
        { title: 'One long', key: 'one', content: ContentOne },
        { title: 'Two long and more', key: 'two', content: ContentTwo },
        { title: 'Three long', key: 'two1', content: ContentTwo },
        { title: 'More long', key: 'two3', content: ContentTwo },
        { title: 'And here long', key: 'two41', content: ContentTwo },
        { title: 'Four name', key: 'two2', content: ContentTwo },
        {
          title: (
            <>
              <Icon right="x-small" icon={Bell} />
              Three long name asd
            </>
          ),
          selected: true,
          key: 'three',
          content: 'Content three'
        }
      ]}
    />
  </TabStyle>
)
const ContentOne = () => {
  console.log('Content one')
  return (
    <>
      <Input label="Content one" placeholder="Edit me" />
    </>
  )
}
const ContentTwo = () => {
  console.log('Content two')
  return <>Content two</>
}
