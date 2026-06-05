import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{s as n}from"./chunk-QUQL4437-CBr5Whxv.js";import{n as r}from"./portal-query-B-NeEeRd.js";import{M as i}from"./Autocomplete-D_rgJ8Uh.js";import{t as a}from"./P-BqMs-VnB.js";import{t as o}from"./H2-BUc7e5iR.js";import{t as s}from"./Section-rdyRjaib.js";import{t as c}from"./ToggleButton-BMi2PwcS.js";import{K as l,W as u,_ as d,m as f}from"./index-Bx3ttow-.js";import{t as p}from"./ComponentBox-CG7uqrFy.js";var m=e(t()),h=({children:e})=>(0,m.jsx)(m.Fragment,{children:e}),g=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{stableName:`TabsExampleContentOutside`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,H2:o},children:`
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

`})}),_=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{scope:{exampleContent:T},"data-visual-test":`tabs-tablist`,stableName:`TabsExampleContentObject`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d},children:`<Tabs
  data={[
    {
      title: 'First',
      key: 'first',
    },
    {
      title: 'Second',
      key: 'second',
    },
    {
      title: 'Third',
      key: 'third',
      disabled: true,
    },
    {
      title: 'Fourth',
      key: 'fourth',
    },
  ]}
>
  {exampleContent /* See Example Content below */}
</Tabs>
`})}),v=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{stableName:`TabsExampleKeepInDOM`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,H2:o,P:a},children:`<>
  <Tabs keepInDOM contentStyle="information">
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
`})}),y=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-clickhandler`,scope:{exampleContent:T},stableName:`TabsExampleUsingData`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d},children:`<Tabs
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
  // Only use "onClick" if you really have to
  onClick={({ selectedKey }) => {
    console.log('onClick', selectedKey)
  }}
  // Preferred way to listen on changes
  onChange={({ selectedKey }) => {
    console.log('onChange', selectedKey)
  }}
/>
`})}),b=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-tablist-scrollable`,scope:{manyTabs:E,manyTabsContent:D},stableName:`TabsExampleScrollable`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d},children:`<Tabs selectedKey="second" data={manyTabs}>
  {manyTabsContent}
</Tabs>
`})}),x=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-section-styles`,stableName:`TabsExampleLeftAligned`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,Section:s,H2:o},children:`<Tabs tabsStyle="information" contentStyle="information">
  <Tabs.Content title="First" key="first">
    <Section
      innerSpace={{
        block: 'large',
      }}
      top
      bottom
    >
      <H2 top={0} bottom>
        First
      </H2>
    </Section>
  </Tabs.Content>
  <Tabs.Content title="Second" key="second">
    <Section
      innerSpace={{
        block: 'large',
      }}
      top
      bottom
    >
      <H2 top={0} bottom>
        Second
      </H2>
    </Section>
  </Tabs.Content>
</Tabs>
`})}),S=()=>(0,m.jsx)(p,{"data-visual-test":`tabs-horizontally-aligned`,scope:{manyTabs:E},stableName:`TabsExampleHorizontallyAligned`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{ToggleButton:c,Tabs:d},noInline:!0,children:`const FlexWrapper = styled.div\`
  display: flex;
  flex-direction: row;
\`
const LeftArea = styled.div\`
  /* Ensure no-wrap */
  flex-shrink: 0;
\`
const RightArea = styled.div\`
  /* Ensure the tab bar is hidden outside this area */
  overflow: hidden;

  /* Ensure the focus ring is visible! (because of overflow: hidden) */
  margin: -2px;
  padding: 2px;
\`
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
          noBorder
          selectedKey="first"
          id="unique-tabs-row"
          data={manyTabs}
        />
      </RightArea>
    </FlexWrapper>
  )
}
render(<TabsHorizontalAligned />)
`}),C=()=>(0,m.jsx)(p,{"data-visual-test":`tabs-max-width`,scope:{manyTabs:E},stableName:`TabsExampleMaxWidth`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d},noInline:!0,children:`const MaxWidthWrapper = styled.div\`
  max-width: 30rem;
  background: var(--color-white);
\`
function TabsMaxWidth() {
  return (
    <MaxWidthWrapper>
      <Tabs
        top
        noBorder
        selectedKey="fifth"
        id="unique-tabs-max-width"
        data={manyTabs}
      />
    </MaxWidthWrapper>
  )
}
render(<TabsMaxWidth />)
`}),w=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{scope:{useLocation:n,Router:h,navigate:r},stableName:`TabsExampleReachRouterNavigation`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{H2:o,Tabs:d},noInline:!0,children:`const Home = ({ path, default: d }) => <H2>Home</H2>
const About = ({ path }) => <H2>About</H2>
const Topics = ({ path }) => <H2>Topics</H2>
const Component = () => {
  const { pathname } = useLocation()
  return (
    <Tabs
      data={[
        {
          title: 'Home',
          key: '/',
        },
        {
          title: 'About',
          key: '/about',
        },
        {
          title: 'Topics',
          key: '/topics',
        },
      ]}
      selectedKey={pathname}
      onChange={({ key }) => navigate(String(key))}
      tabsStyle="information"
    >
      <Suspense fallback={<em>Loading ...</em>}>
        <Router>
          <Home path="/" default />
          <About path="/about" />
          <Topics path="/topics" />
        </Router>
      </Suspense>
    </Tabs>
  )
}
render(<Component />)
`})}),T={first:()=>(0,m.jsx)(`h2`,{className:`dnb-h--large`,children:`First`}),second:()=>(0,m.jsx)(i,{label:`Label`,children:`Focus me with next Tab key`}),third:()=>(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(`p`,{children:`Paragraph 1`}),(0,m.jsx)(`p`,{children:`Paragraph 2`})]}),fourth:`Fourth as a string only`},E=[{title:`First`,key:`first`},{title:`Second`,key:`second`},{title:`Third`,key:`third`,disabled:!0},{title:`Fourth`,key:`fourth`,selected:!0},{title:`Fifth`,key:`fifth`},{title:`Sixth`,key:`sixth`},{title:`Seventh`,key:`seventh`},{title:`Eighth`,key:`eighth`},{title:`Ninth`,key:`ninth`},{title:`Tenth`,key:`tenth`}],D=E.reduce((e,{title:t,key:n})=>(e[n]=t,e),{}),O=f.div`
  .dnb-tabs {
    margin-top: 3rem;
  }
`,k=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-no-border`,stableName:`TabsNoBorder`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,H2:o},children:`<Tabs noBorder={true}>
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
`})}),A=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-no-breakout`,stableName:`TabsNoBreakout`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,H2:o},children:`<Tabs breakout={false}>
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
`})}),j=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-single-children-react-element`,stableName:`TabsSingleChildrenReactElement`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d},children:`<Tabs>
  <Tabs.Content title="First" key="first">
    <div>hello1</div>
  </Tabs.Content>
</Tabs>
`})}),M=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-single-element-data`,stableName:`TabsSingleElementData`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d},children:`<Tabs
  data={[
    {
      title: 'First',
      key: 1,
      content: <div>hello1</div>,
    },
  ]}
/>
`})}),N=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-align-property`,stableName:`TabsAlignProperty`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,H2:o},children:`
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

`})}),P=()=>(0,m.jsx)(O,{children:(0,m.jsx)(p,{"data-visual-test":`tabs-badge-notification`,stableName:`TabsExampleWithBadgeNotification`,sourceImports:[`import { Suspense, ReactNode } from 'react'`,`import Input from '@dnb/eufemia/components/input/Input'`,`import styled from '@emotion/styled'`,`import { useLocation } from 'react-router-dom'`,`import { navigate } from 'portal-query'`,`import { Tabs, Section, H2, P, ToggleButton, Badge } from '@dnb/eufemia'`],__buildScope:{Tabs:d,Badge:u},children:`<Tabs
  data={[
    {
      title: (
        <>
          Transaksjoner{' '}
          <Badge
            content={1}
            label="Transaksjoner"
            variant="notification"
            vertical="top"
          />
        </>
      ),
      key: 'one',
    },
    {
      title: 'Second',
      key: 'second',
    },
    {
      title: 'Third',
      key: 'third',
    },
  ]}
/>
`})});function F(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...l(),...e.components},{VisibleWhenVisualTest:n}=t;return n||L(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Tabs where content is provided from outside`}),`
`,(0,m.jsx)(t.p,{children:`As this may be a more common use case, we still have to ensure our tabs content is linked together with the tabs – because of accessibility.`}),`
`,(0,m.jsxs)(t.p,{children:[`You have to provide an `,(0,m.jsx)(t.code,{children:`id`}),` to both of the components.`]}),`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`NB:`}),` You do not need to use a function inside `,(0,m.jsx)(t.code,{children:`Tabs.Content`}),` – it can contain any element you need, as long as it is a React Node.`]}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsx)(t.h3,{children:`Tabs using 'data' property and content object`}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Tabs using 'data' property only`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h3,{children:`Tabs using React Components only`}),`
`,(0,m.jsxs)(t.p,{children:[`Also, this is an example of how to define a different content background color, by providing `,(0,m.jsx)(t.code,{children:`contentStyle`}),`.`]}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h3,{children:`Tabs without bottom border`}),`
`,(0,m.jsx)(k,{}),`
`,(0,m.jsx)(t.h3,{children:`Tabs without breakout`}),`
`,(0,m.jsx)(A,{}),`
`,(0,m.jsxs)(t.h3,{children:[`Tabs and `,(0,m.jsx)(t.code,{children:`keepInDOM`})]}),`
`,(0,m.jsxs)(t.p,{children:[`By using `,(0,m.jsx)(t.code,{children:`keepInDOM={true}`}),` the content is kept inside the DOM.`]}),`
`,(0,m.jsx)(t.p,{children:`Also, when switching the tabs, the height is animated.`}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Tabs optimized for narrow screens`}),`
`,(0,m.jsx)(t.p,{children:`Navigation buttons will be shown and the tabs-list will be scrollable.`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h3,{children:`Horizontal aligned tabs`}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsx)(t.h3,{children:`max-width usage`}),`
`,(0,m.jsx)(C,{}),`
`,(0,m.jsx)(t.h3,{children:`Router integration`}),`
`,(0,m.jsx)(t.p,{children:`This demo uses a Reach Router compatible API for tab navigation.`}),`
`,(0,m.jsx)(w,{}),`
`,(0,m.jsx)(t.h3,{children:`Example Content`}),`
`,(0,m.jsx)(t.pre,{children:(0,m.jsx)(t.code,{className:`language-jsx`,children:`const exampleContent = {
  first: () => <H2>First</H2>,
  second: () => <Input label="Label:">Focus me with next Tab key</Input>,
  third: () => (
    <>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    </>
  ),
  fourth: 'Fourth as a string only',
}
`})}),`
`,(0,m.jsx)(t.h3,{children:`Tabs with badge notification`}),`
`,(0,m.jsx)(P,{}),`
`,(0,m.jsxs)(n,{children:[(0,m.jsx)(j,{}),(0,m.jsx)(M,{}),(0,m.jsx)(N,{})]})]})}function I(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(F,{...e})}):F(e)}function L(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{I as default};