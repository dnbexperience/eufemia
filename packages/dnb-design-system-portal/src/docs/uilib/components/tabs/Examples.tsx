/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

import Input from '@dnb/eufemia/src/components/input/Input'
import styled from '@emotion/styled'
import {
  useLocation,
  Router as ReachRouter,
  navigate,
} from '@reach/router'
import { Tabs, Section, H2, P, ToggleButton } from '@dnb/eufemia/src'

const Router = ReachRouter as any

export const TabsExampleContentOutside = () => (
  <Wrapper>
    <ComponentBox>
      <Tabs
        id="unique-linked-id"
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
      />

      <Tabs.Content id="unique-linked-id" key="unique-linked-key">
        {({ key }) => {
          return <H2>{key}</H2>
        }}
      </Tabs.Content>
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleContentObject = () => (
  <Wrapper>
    <ComponentBox
      scope={{ exampleContent }}
      data-visual-test="tabs-tablist"
    >
      <Tabs
        data={[
          { title: 'First', key: 'first' },
          { title: 'Second', key: 'second' },
          { title: 'Third', key: 'third', disabled: true },
          { title: 'Fourth', key: 'fourth' },
        ]}
      >
        {exampleContent /* See Example Content below */}
      </Tabs>
    </ComponentBox>
  </Wrapper>
)

export const TabsExamplePrerender = () => (
  <Wrapper>
    <ComponentBox>
      <>
        <Tabs prerender content_style="info">
          <Tabs.Content title="Tab 1" key="first">
            <H2>Content 1</H2>
          </Tabs.Content>
          <Tabs.Content title="Tab 2" key="second">
            <div
              style={{
                height: '10rem',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <H2>Content 2</H2>
            </div>
          </Tabs.Content>
          <Tabs.Content title="Tab 3" key="third">
            <div
              style={{
                height: '20rem',
                display: 'flex',
                alignItems: 'flex-end',
              }}
            >
              <H2>Content 3</H2>
            </div>
          </Tabs.Content>
        </Tabs>
        <P top>Smile at me 📸</P>
      </>
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleUsingData = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="tabs-clickhandler"
      scope={{ exampleContent }}
    >
      <Tabs
        data={{
          first: {
            title: 'First',
            // See Example Content below
            content: exampleContent.first,
          },
          second: {
            title: 'Second',
            // See Example Content below
            content: exampleContent.second,
          },
        }}
        // Only use "on_click" if you really have to
        on_click={({ selected_key }) => {
          console.log('on_click', selected_key)
        }}
        // Preferred way to listen on changes
        on_change={({ selected_key }) => {
          console.log('on_change', selected_key)
        }}
      />
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleScrollable = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="tabs-tablist-scrollable"
      scope={{ manyTabs, manyTabsContent }}
    >
      <Tabs selected_key="second" data={manyTabs}>
        {manyTabsContent}
      </Tabs>
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleLeftAligned = () => (
  <Wrapper>
    <ComponentBox data-visual-test="tabs-section-styles">
      <Tabs tabs_style="info" content_style="info">
        <Tabs.Content title="First" key="first">
          <Section spacing top bottom style_type="white">
            <H2 top={0} bottom>
              First
            </H2>
          </Section>
        </Tabs.Content>
        <Tabs.Content title="Second" key="second">
          <Section spacing top bottom style_type="white">
            <H2 top={0} bottom>
              Second
            </H2>
          </Section>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleHorizontallyAligned = () => (
  <ComponentBox
    data-visual-test="tabs-horizontally-aligned"
    scope={{ manyTabs }}
  >
    {() => {
      const FlexWrapper = styled.div`
        display: flex;
        flex-direction: row;
      `

      const LeftArea = styled.div`
        /* Ensure no-wrap */
        flex-shrink: 0;
      `
      const RightArea = styled.div`
        /* Ensure the tab bar is hidden outside this area */
        overflow: hidden;

        /* Ensure the focus ring is visible! (because of overflow: hidden) */
        margin: -2px;
        padding: 2px;
      `

      function TabsHorizontalAligned() {
        return (
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
                selected_key="first"
                id="unique-tabs-row"
                data={manyTabs}
              />
            </RightArea>
          </FlexWrapper>
        )
      }

      return <TabsHorizontalAligned />
    }}
  </ComponentBox>
)

export const TabsExampleMaxWidth = () => (
  <ComponentBox data-visual-test="tabs-max-width" scope={{ manyTabs }}>
    {() => {
      const MaxWidthWrapper = styled.div`
        max-width: 30rem;
        background: var(--color-white);
      `

      function TabsMaxWidth() {
        return (
          <MaxWidthWrapper>
            <Tabs
              top
              no_border
              selected_key="fifth"
              id="unique-tabs-max-width"
              data={manyTabs}
            />
          </MaxWidthWrapper>
        )
      }

      return <TabsMaxWidth />
    }}
  </ComponentBox>
)

export const TabsExampleReachRouterNavigation = () =>
  typeof window === 'undefined' ? null : (
    <Wrapper>
      <ComponentBox scope={{ useLocation, Router, navigate }}>
        {() => {
          const Home = ({ path, default: d }) => <H2>Home</H2>
          const About = ({ path }) => <H2>About</H2>
          const Topics = ({ path }) => <H2>Topics</H2>

          const Component = () => {
            const { pathname } = useLocation()

            return (
              <Tabs
                data={[
                  { title: 'Home', key: '/' },
                  { title: 'About', key: '/about' },
                  { title: 'Topics', key: '/topics' },
                ]}
                selected_key={pathname}
                on_change={({ key }) => navigate(key)}
                tabs_style="info"
              >
                <React.Suspense fallback={<em>Loading ...</em>}>
                  <Router>
                    <Home path="/" default />
                    <About path="/about" />
                    <Topics path="/topics" />
                  </Router>
                </React.Suspense>
              </Tabs>
            )
          }

          return <Component />
        }}
      </ComponentBox>
    </Wrapper>
  )

const exampleContent = {
  first: () => <h2 className="dnb-h--large">First</h2>,
  second: () => <Input label="Label">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only',
}

const manyTabs = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth', selected: true },
  { title: 'Fifth', key: 'fifth' },
  { title: 'Sixth', key: 'sixth' },
  { title: 'Seventh', key: 'seventh' },
  { title: 'Eighth', key: 'eighth' },
  { title: 'Ninth', key: 'ninth' },
  { title: 'Tenth', key: 'tenth' },
]
const manyTabsContent = manyTabs.reduce((acc, { title, key }) => {
  acc[key] = title
  return acc
}, {})

const Wrapper = styled.div`
  .dnb-tabs {
    margin-top: 3rem;
  }
`

export const TabsNoBorder = () => (
  <Wrapper>
    <ComponentBox data-visual-test="tabs-no-border">
      <Tabs no_border={true}>
        <Tabs.Content title="First" key="first">
          <H2 top={0} bottom>
            First
          </H2>
        </Tabs.Content>
        <Tabs.Content title="Second" key="second">
          <H2 top={0} bottom>
            Second
          </H2>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)

export const TabsNoBreakout = () => (
  <Wrapper>
    <ComponentBox data-visual-test="tabs-no-breakout">
      <Tabs breakout={false}>
        <Tabs.Content title="First" key="first">
          <H2 top={0} bottom>
            First
          </H2>
        </Tabs.Content>
        <Tabs.Content title="Second" key="second">
          <H2 top={0} bottom>
            Second
          </H2>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)

export const TabsSingleChildrenReactElement = () => (
  <Wrapper>
    <ComponentBox data-visual-test="tabs-single-children-react-element">
      <Tabs>
        <Tabs.Content title="First" key="first">
          <div>hello1</div>
        </Tabs.Content>
      </Tabs>
    </ComponentBox>
  </Wrapper>
)

export const TabsSingleElementData = () => (
  <Wrapper>
    <ComponentBox data-visual-test="tabs-single-element-data">
      <Tabs
        data={[{ title: 'First', key: 1, content: <div>hello1</div> }]}
      />
    </ComponentBox>
  </Wrapper>
)

export const TabsAlignProperty = () => (
  <Wrapper>
    <ComponentBox data-visual-test="tabs-align-property">
      <Tabs
        align="left"
        data={[
          {
            title: 'Left',
            key: 1,
            content: <H2>Content</H2>,
          },
        ]}
      />
      <Tabs
        align="center"
        data={[
          {
            title: 'Center',
            key: 1,
            content: <H2>Content</H2>,
          },
        ]}
      />

      <Tabs
        align="right"
        data={[
          {
            title: 'Right',
            key: 1,
            content: <H2>Content</H2>,
          },
        ]}
      />
    </ComponentBox>
  </Wrapper>
)
