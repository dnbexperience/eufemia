import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-DPdYTeDv.js";import{La as n,Lr as r,Mt as i,vr as a,wt as o}from"./index--zEB_f_m.js";var s=e(),c=({children:e})=>(0,s.jsx)(s.Fragment,{children:e}),l=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{children:`
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

`})}),u=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{scope:{exampleContent:v},"data-visual-test":`tabs-tablist`,children:`<Tabs
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
`})}),d=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{children:`<>
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
`})}),f=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-clickhandler`,scope:{exampleContent:v},children:`<Tabs
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
`})}),p=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-tablist-scrollable`,scope:{manyTabs:y,manyTabsContent:b},children:`<Tabs selectedKey="second" data={manyTabs}>
  {manyTabsContent}
</Tabs>
`})}),m=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-section-styles`,children:`<Tabs tabsStyle="information" contentStyle="information">
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
`})}),h=()=>(0,s.jsx)(t,{"data-visual-test":`tabs-horizontally-aligned`,scope:{manyTabs:y},noInline:!0,children:`const FlexWrapper = styled.div\`
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
`}),g=()=>(0,s.jsx)(t,{"data-visual-test":`tabs-max-width`,scope:{manyTabs:y},noInline:!0,children:`const MaxWidthWrapper = styled.div\`
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
`}),_=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{scope:{useLocation:n,Router:c,navigate:o},noInline:!0,children:`const Home = ({ path, default: d }) => <H2>Home</H2>
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
`})}),v={first:()=>(0,s.jsx)(`h2`,{className:`dnb-h--large`,children:`First`}),second:()=>(0,s.jsx)(a,{label:`Label`,children:`Focus me with next Tab key`}),third:()=>(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(`p`,{children:`Paragraph 1`}),(0,s.jsx)(`p`,{children:`Paragraph 2`})]}),fourth:`Fourth as a string only`},y=[{title:`First`,key:`first`},{title:`Second`,key:`second`},{title:`Third`,key:`third`,disabled:!0},{title:`Fourth`,key:`fourth`,selected:!0},{title:`Fifth`,key:`fifth`},{title:`Sixth`,key:`sixth`},{title:`Seventh`,key:`seventh`},{title:`Eighth`,key:`eighth`},{title:`Ninth`,key:`ninth`},{title:`Tenth`,key:`tenth`}],b=y.reduce((e,{title:t,key:n})=>(e[n]=t,e),{}),x=i.div`
  .dnb-tabs {
    margin-top: 3rem;
  }
`,S=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-no-border`,children:`<Tabs noBorder={true}>
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
`})}),C=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-no-breakout`,children:`<Tabs breakout={false}>
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
`})}),w=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-single-children-react-element`,children:`<Tabs>
  <Tabs.Content title="First" key="first">
    <div>hello1</div>
  </Tabs.Content>
</Tabs>
`})}),T=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-single-element-data`,children:`<Tabs
  data={[
    {
      title: 'First',
      key: 1,
      content: <div>hello1</div>,
    },
  ]}
/>
`})}),E=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-align-property`,children:`
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

`})}),D=()=>(0,s.jsx)(x,{children:(0,s.jsx)(t,{"data-visual-test":`tabs-badge-notification`,children:`<Tabs
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
`})});function O(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...r(),...e.components},{VisibleWhenVisualTest:n}=t;return n||A(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Tabs where content is provided from outside`}),`
`,(0,s.jsx)(t.p,{children:`As this may be a more common use case, we still have to ensure our tabs content is linked together with the tabs – because of accessibility.`}),`
`,(0,s.jsxs)(t.p,{children:[`You have to provide an `,(0,s.jsx)(t.code,{children:`id`}),` to both of the components.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`NB:`}),` You do not need to use a function inside `,(0,s.jsx)(t.code,{children:`Tabs.Content`}),` – it can contain any element you need, as long as it is a React Node.`]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Tabs using 'data' property and content object`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Tabs using 'data' property only`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Tabs using React Components only`}),`
`,(0,s.jsxs)(t.p,{children:[`Also, this is an example of how to define a different content background color, by providing `,(0,s.jsx)(t.code,{children:`contentStyle`}),`.`]}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Tabs without bottom border`}),`
`,(0,s.jsx)(S,{}),`
`,(0,s.jsx)(t.h3,{children:`Tabs without breakout`}),`
`,(0,s.jsx)(C,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Tabs and `,(0,s.jsx)(t.code,{children:`keepInDOM`})]}),`
`,(0,s.jsxs)(t.p,{children:[`By using `,(0,s.jsx)(t.code,{children:`keepInDOM={true}`}),` the content is kept inside the DOM.`]}),`
`,(0,s.jsx)(t.p,{children:`Also, when switching the tabs, the height is animated.`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Tabs optimized for narrow screens`}),`
`,(0,s.jsx)(t.p,{children:`Navigation buttons will be shown and the tabs-list will be scrollable.`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal aligned tabs`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`max-width usage`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Router integration`}),`
`,(0,s.jsx)(t.p,{children:`This demo uses a Reach Router compatible API for tab navigation.`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Example Content`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`const exampleContent = {
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
`,(0,s.jsx)(t.h3,{children:`Tabs with badge notification`}),`
`,(0,s.jsx)(D,{}),`
`,(0,s.jsxs)(n,{children:[(0,s.jsx)(w,{}),(0,s.jsx)(T,{}),(0,s.jsx)(E,{})]})]})}function k(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(O,{...e})}):O(e)}function A(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{k as default};