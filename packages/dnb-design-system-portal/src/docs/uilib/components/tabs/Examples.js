/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

import Input from 'dnb-ui-lib/src/components/input/Input'
import styled from '@emotion/styled'
import { Location, Router, navigate } from '@reach/router'
import { BrowserRouter, Route, withRouter } from 'react-router-dom'

// export class Example extends React.PureComponent {
//   static AdditionalCallback = {
//     info: ({ CodeRenderer }) => (
//       <React.Fragment>
//         <h3>Data Structure</h3>
//         <CodeRenderer language="json">{dataBlob}</CodeRenderer>
//       </React.Fragment>
//     )
//   }
//   render() {
//     return null
//   }
// }

export const TabsExampleContentObject = () => (
  <Wrapper>
    <ComponentBox
      scope={{ exampleContent }}
      data-visual-test="tabs-tablist"
      useRender
      hideSyntaxButton
    >
      {
        /* @jsx */ `
const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
];
render(
  <Tabs data={data}>
    { exampleContent /* See Example Content below */ }
  </Tabs>
)
  `
      }
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleUsingData = () => (
  <Wrapper>
    <ComponentBox scope={{ exampleContent }}>
      {
        /* @jsx */ `
<Tabs
  data={{
    first: {
    title: 'First',
    content: exampleContent.first /* See Example Content below */
  },
    second: {
    title: 'Second',
    content: exampleContent.second /* See Example Content below */
  }
  }}
/>
  `
      }
    </ComponentBox>
  </Wrapper>
)

export const TabsExampleScrollable = () => (
  <MaxWidth>
    <ComponentBox
      data-visual-test="tabs-tablist-scrollable"
      scope={{ manyTabs, manyTabsContent }}
    >
      {
        /* @jsx */ `
<Tabs data={manyTabs}>
  { manyTabsContent }
</Tabs>
  `
      }
    </ComponentBox>
  </MaxWidth>
)

export const TabsExampleLeftAligned = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<Tabs section_style="mint-green">
  <Tabs.Content title="First">
    <H2>First</H2>
  </Tabs.Content>
  <Tabs.Content title="Second">
    <H2>Second</H2>
  </Tabs.Content>
</Tabs>
  `
      }
    </ComponentBox>
  </Wrapper>
)

export class TabsExampleRightAligned extends React.PureComponent {
  state = { activeTabKey: 'second' }
  openTab = ({ key }) => {
    this.setState({
      activeTabKey: key
    })
  }
  isActive(tabKey) {
    return this.state.activeTabKey === tabKey
  }

  render() {
    const { activeTabKey } = this.state
    const openTab = this.openTab
    return (
      <Wrapper>
        <ComponentBox
          data-visual-test="tabs-tablist-right-aligned"
          scope={{ exampleContent, activeTabKey, openTab, data }}
        >
          {
            /* @jsx */ `
<Tabs
  selected_key={activeTabKey}
  align="right"
  label="Some Tabs label"
  data={data}
  on_change={openTab}
  render={({ Wrapper, Content, TabsList, Tabs }) => {
  return (
    <Wrapper>
      <TabsList className="dnb-section">
        <small>
          <b>Active:</b> {activeTabKey}
        </small>
        <Tabs />
      </TabsList>
      <Content />
    </Wrapper>
  )
  }}
>
  { exampleContent /* See Example Content below */ }
</Tabs>
      `
          }
        </ComponentBox>
      </Wrapper>
    )
  }
}

export const TabsExampleReactRouterNavigation = () =>
  typeof window === 'undefined' ? null : (
    <Wrapper>
      <ComponentBox
        title=""
        scope={{ BrowserRouter, Route, withRouter }}
        useRender
        hideSyntaxButton
      >
        {
          /* @jsx */ `
// import { Router, Route, withRouter } from 'react-router-dom'
const tabsData = [
  { title: 'Home', key: 'home' },
  { title: 'About', key: 'about' },
  { title: 'Topics', key: 'topics' }
]
const tabsContent = {
  home: () => <H2>Home</H2>,
  about: () => <H2>About</H2>,
  topics: () => <H2>Topics</H2>
}
const TabsNav = withRouter(({ history, location }) => (
  <Tabs
    data={tabsData}
    selected_key={(/path=(.*)/g.exec(location.search)||[null,''])[1]}
    on_change={({ key }) => history.push('?path=' + key)}
    section_style="mint-green"
  >
    {/* 1. Use either key method */}
    {tabsContent}

    {/* 2. Or the Router method */}
    {/* <>
    <Route path="(/|/home)" component={() => <H2>Home</H2>} />
    <Route path="/about" component={() => <H2>About</H2>} />
    <Route path="/topics" component={() => <H2>Topics</H2>} />
    </> */}
  </Tabs>
))
render(<BrowserRouter><TabsNav /></BrowserRouter>)
  `
        }
      </ComponentBox>
    </Wrapper>
  )

export const TabsExampleReachRouterNavigation = () =>
  typeof window === 'undefined' ? null : (
    <Wrapper>
      <ComponentBox
        scope={{ Location, Router, navigate }}
        useRender
        hideSyntaxButton
      >
        {
          /* @jsx */ `
// import { Location, Router, navigate } from '@reach/router'
const Home = () => <H2>Home</H2>
const About = () => <H2>About</H2>
const Topics = () => <H2>Topics</H2>
render(
  <Location>
    {({ location: { pathname } }) => {
    return (
      <Tabs
        data={[
          { title: 'Home', key: '/' },
          { title: 'About', key: '/about' },
          { title: 'Topics', key: '/topics' },
        ]}
        selected_key={pathname}
        on_change={({ key }) => navigate(key)}
        section_style="mint-green"
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
    }}
  </Location>
)
`
        }
      </ComponentBox>
    </Wrapper>
  )

const exampleContent = {
  first: () => <h2 className="dnb-h--large">First</h2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only'
}

const data = [
  { title: 'First', key: 'first' },
  { title: 'Second', key: 'second' },
  { title: 'Third', key: 'third', disabled: true },
  { title: 'Fourth', key: 'fourth' }
]
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
  { title: 'Tenth', key: 'tenth' }
]
const manyTabsContent = manyTabs.reduce((acc, { title, key }) => {
  acc[key] = title
  return acc
}, {})

// const dataBlob = JSON.stringify(data, null, 2)

const Wrapper = styled.div`
  .dnb-tabs {
    margin-top: 3rem;
  }
`

// The example has a `max-width` of 60rem.
const MaxWidth = styled(Wrapper)`
  @media screen and (max-width: 40em) {
    .dnb-tabs .dnb-tabs__tabs {
      margin: 0 -4rem;
    }
    .dnb-tabs .dnb-tabs__tabs__tablist {
      padding: 0 4rem;
    }
  }
`
