/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'
import { Global, css } from '@emotion/react'

import { Input, Tabs, Icon, Button, ToggleButton } from '../../'
import { bell as Bell } from '../../../icons'

import { H2 } from '../../../elements'
import { TabsNavigation } from './TabsNavigation.stories'

export default {
  title: 'Eufemia/Components/Tabs',
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

          /* .dnb-tabs__tabs {
            NB: Now this gets handled automatically
            margin: 0 -2rem;
            padding: 0 2rem;
          } */

          /* .dnb-tabs__tabs__tablist {
            padding: 0 2rem;
          } */
        `}
      />
      <Box>
        <TabsContentUsage />
      </Box>
      <Box>
        <TabsInGrid />
      </Box>
      <Box>
        <Tabs tabs_style="mint-green" content_style="black-3">
          <Tabs.Content title="First">
            <H2>First</H2>
          </Tabs.Content>
          <Tabs.Content title="Second">
            <H2>Second</H2>
          </Tabs.Content>
        </Tabs>
      </Box>
      <Box>
        <Input
          label="Change state"
          value={value}
          onChange={({ value }) => setValue(value)}
        />

        <pre>I am changing!: {value}</pre>

        <Tabs
          bottom
          prerender
          content_style="black-3"
          content_spacing={false}
        >
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
            fourth: () => <H2>Fourth</H2>,
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
            second: { title: 'Second', content: () => <H2>Second</H2> },
          }}
        />
      </Box>
      <Box>
        <Tabs tabs_style="mint-green">
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
  { title: 'Second', key: 2, content: () => <H2>Second</H2> },
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
  fourth: () => <H2>Fourth</H2>,
}
const tabsData = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' },
  {
    title: (
      <>
        <Icon right="x-small" icon={Bell} />
        Three long name
      </>
    ),
    selected: true,
    key: 'three',
    content: 'Content three',
  },
]

const TabsAndRerender = () => (
  <Tabs
    tabs_style="mint-green"
    prevent_rerender
    content={manyTabsContent}
    data={manyTabs}
  />
)
const TabGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;

  margin: 0 auto;

  @media screen and (min-width: 40em) {
    grid-template-columns: repeat(6, 1fr);
    max-width: 35rem;
  }
  @media screen and (min-width: 60em) {
    grid-template-columns: repeat(12, 1fr);
    max-width: 71rem;
  }
`
const TabGridWrapperStyle = styled.div`
  grid-column: span 4;
  grid-column-start: span 4;
  grid-column-end: auto;

  @media screen and (min-width: 40em) {
    grid-column: span 6;
    grid-column-start: span 6;
  }
  @media screen and (min-width: 60em) {
    grid-column: span 12;
    grid-column-start: span 12;
  }
`
const manyTabs = [
  { title: 'Egen sparing til pensjon', key: 'first' },
  { title: 'Pensjon fra arbeidsgiver', key: 'second', selected: true },
  { title: 'Planlegg pensjon', key: 'third' },
  { title: 'Rammelån', key: 'fourth' },
  // { title: 'First', key: 'first' },
  // { title: 'Second', key: 'second' },
  // { title: 'Third', key: 'third', disabled: true },
  // { title: 'Fourth', key: 'fourth', selected: true },
  { title: 'Fifth', key: 'fifth' },
  { title: 'Sixth', key: 'sixth' },
  // { title: 'Seventh', key: 'seventh' },
  // { title: 'Eighth', key: 'eighth' },
  // { title: 'Ninth', key: 'ninth' },
  // { title: 'Tenth', key: 'tenth' }
]
const manyTabsContent = manyTabs.reduce((acc, { title, key }) => {
  acc[key] = title
  return acc
}, {})
const TabsInGrid = () => (
  <TabGridStyle>
    <TabGridWrapperStyle>
      <Tabs
        // tabs_style="mint-green"
        prevent_rerender
        content={manyTabsContent}
        data={manyTabs}
      />
    </TabGridWrapperStyle>
  </TabGridStyle>
)
const TabsContentUsage = () => {
  const [value, setValue] = React.useState('two')
  return (
    <>
      <Tabs
        id="unique-tabs-id"
        data={[
          {
            title: 'One',
            key: 'one',
          },
          {
            title: 'Two',
            key: 'two',
          },
        ]}
        selected_key={value}
        on_change={({ key }) => {
          setValue(key)
        }}
      />

      <Tabs.Content id="unique-tabs-id">
        {({ key }) => {
          return <pre>{JSON.stringify({ key }, null, 2)}</pre>
        }}
      </Tabs.Content>

      <Button
        size="small"
        variant="secondary"
        text="one"
        on_click={() => {
          setValue('one')
        }}
      />
      <Button
        size="small"
        variant="secondary"
        text="two"
        on_click={() => {
          setValue('two')
        }}
      />
    </>
  )
}

const data = [
  { title: '1st item', key: '1' },
  { title: '2nd item', key: '2' },
  { title: '3rd item', key: '3' },
  { title: '4th item', key: '4' },
  { title: '5th item', key: '5' },
  { title: '6th item', key: '6' },
  // { title: '7th item', key: '7' },
  // { title: '8th item', key: '8' },
  // { title: '9th item', key: '9' },
  // { title: '10th item', key: '10' },
  // { title: '11th item', key: '11' },
  // { title: '12th item', key: '12' },
  // { title: '13th item', key: '13' },
]

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const MaxWidthWrapper = styled.div`
  max-width: 30rem;
  background: var(--color-mint-green-12);
`

const LeftArea = styled.div`
  /* Ensure no-wrap */
  flex-shrink: 0;
`
const RightArea = styled.div`
  /* Ensure the tabbar is hidden outside this area */
  overflow: hidden;

  /* Ensure the focus ring is visible! (because of overflow: hidden) */
  margin: -2px;
  padding: 2px;
`

export function TabsAndFlex() {
  return (
    <>
      <FlexWrapper>
        <LeftArea>
          <ToggleButton.Group value="first">
            <ToggleButton text="first" value="first" />
            <ToggleButton text="second" value="second" />
          </ToggleButton.Group>
        </LeftArea>

        <RightArea>
          <Tabs
            left
            no_border
            selected_key="5"
            id="unique-tabs-row"
            data={data}
          />
        </RightArea>
      </FlexWrapper>

      <MaxWidthWrapper>
        <Tabs
          top
          no_border
          nav_button_edge
          selected_key="5"
          id="unique-tabs-edge"
          data={data}
        />
      </MaxWidthWrapper>

      <Tabs
        top
        no_border
        id="right-aligned"
        selected_key="2"
        align="right"
        label="Some Tabs label"
        data={data.slice(0, 3)}
        render={({ Wrapper, Content, TabsList, Tabs }) => {
          return (
            <Wrapper>
              <TabsList className="dnb-section">
                <small>
                  <b>Content</b>
                </small>
                <Tabs />
              </TabsList>
              <Content />
            </Wrapper>
          )
        }}
      />
    </>
  )
}
