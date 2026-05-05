import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Gn as r,La as i,Rr as a,a as o,xr as s}from"./index-CMgyXmp3.js";e();var c=t(),l=({children:e})=>(0,c.jsx)(c.Fragment,{children:e}),u=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{children:`
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

`})}),d=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{scope:{exampleContent:y},"data-visual-test":`tabs-tablist`,children:`<Tabs
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
`})}),f=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{children:`<>
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
`})}),p=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-clickhandler`,scope:{exampleContent:y},children:`<Tabs
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
`})}),m=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-tablist-scrollable`,scope:{manyTabs:b,manyTabsContent:x},children:`<Tabs selectedKey="second" data={manyTabs}>
  {manyTabsContent}
</Tabs>
`})}),h=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-section-styles`,children:`<Tabs tabsStyle="information" contentStyle="information">
  <Tabs.Content title="First" key="first">
    <Section
      innerSpace={{
        block: 'large',
      }}
      top
      bottom
      backgroundColor="white"
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
      backgroundColor="white"
    >
      <H2 top={0} bottom>
        Second
      </H2>
    </Section>
  </Tabs.Content>
</Tabs>
`})}),g=()=>(0,c.jsx)(n,{"data-visual-test":`tabs-horizontally-aligned`,scope:{manyTabs:b},noInline:!0,children:`const FlexWrapper = styled.div\`
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
`}),_=()=>(0,c.jsx)(n,{"data-visual-test":`tabs-max-width`,scope:{manyTabs:b},noInline:!0,children:`const MaxWidthWrapper = styled.div\`
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
`}),v=()=>typeof window>`u`?null:(0,c.jsx)(S,{children:(0,c.jsx)(n,{scope:{useLocation:i,Router:l,navigate:s},noInline:!0,children:`const Home = ({ path, default: d }) => <H2>Home</H2>
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
render(<Component />)
`})}),y={first:()=>(0,c.jsx)(`h2`,{className:`dnb-h--large`,children:`First`}),second:()=>(0,c.jsx)(r,{label:`Label`,children:`Focus me with next Tab key`}),third:()=>(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(`p`,{children:`Paragraph 1`}),(0,c.jsx)(`p`,{children:`Paragraph 2`})]}),fourth:`Fourth as a string only`},b=[{title:`First`,key:`first`},{title:`Second`,key:`second`},{title:`Third`,key:`third`,disabled:!0},{title:`Fourth`,key:`fourth`,selected:!0},{title:`Fifth`,key:`fifth`},{title:`Sixth`,key:`sixth`},{title:`Seventh`,key:`seventh`},{title:`Eighth`,key:`eighth`},{title:`Ninth`,key:`ninth`},{title:`Tenth`,key:`tenth`}],x=b.reduce((e,{title:t,key:n})=>(e[n]=t,e),{}),S=o.div`
  .dnb-tabs {
    margin-top: 3rem;
  }
`,C=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-no-border`,children:`<Tabs noBorder={true}>
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
`})}),w=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-no-breakout`,children:`<Tabs breakout={false}>
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
`})}),T=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-single-children-react-element`,children:`<Tabs>
  <Tabs.Content title="First" key="first">
    <div>hello1</div>
  </Tabs.Content>
</Tabs>
`})}),E=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-single-element-data`,children:`<Tabs
  data={[
    {
      title: 'First',
      key: 1,
      content: <div>hello1</div>,
    },
  ]}
/>
`})}),D=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-align-property`,children:`
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

`})}),O=()=>(0,c.jsx)(S,{children:(0,c.jsx)(n,{"data-visual-test":`tabs-badge-notification`,children:`<Tabs
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
`})});function k(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,pre:`pre`,strong:`strong`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return n||j(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Tabs where content is provided from outside`}),`
`,(0,c.jsx)(t.p,{children:`As this may be a more common use case, we still have to ensure our tabs content is linked together with the tabs – because of accessibility.`}),`
`,(0,c.jsxs)(t.p,{children:[`You have to provide an `,(0,c.jsx)(t.code,{children:`id`}),` to both of the components.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`NB:`}),` You do not need to use a function inside `,(0,c.jsx)(t.code,{children:`Tabs.Content`}),` – it can contain any element you need, as long as it is a React Node.`]}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Tabs using 'data' property and content object`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Tabs using 'data' property only`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Tabs using React Components only`}),`
`,(0,c.jsxs)(t.p,{children:[`Also, this is an example of how to define a different content background color, by providing `,(0,c.jsx)(t.code,{children:`contentStyle`}),`.`]}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Tabs without bottom border`}),`
`,(0,c.jsx)(C,{}),`
`,(0,c.jsx)(t.h3,{children:`Tabs without breakout`}),`
`,(0,c.jsx)(w,{}),`
`,(0,c.jsxs)(t.h3,{children:[`Tabs and `,(0,c.jsx)(t.code,{children:`keepInDOM`})]}),`
`,(0,c.jsxs)(t.p,{children:[`By using `,(0,c.jsx)(t.code,{children:`keepInDOM={true}`}),` the content is kept inside the DOM.`]}),`
`,(0,c.jsx)(t.p,{children:`Also, when switching the tabs, the height is animated.`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Tabs optimized for narrow screens`}),`
`,(0,c.jsx)(t.p,{children:`Navigation buttons will be shown and the tabs-list will be scrollable.`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Horizontal aligned tabs`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`max-width usage`}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(t.h3,{children:`Router integration`}),`
`,(0,c.jsxs)(t.p,{children:[`This demo uses `,(0,c.jsx)(t.code,{children:`@gatsbyjs/reach-router`}),` (Gatsby's maintained fork of `,(0,c.jsx)(t.code,{children:`@reach/router`}),`).`]}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsx)(t.h3,{children:`Example Content`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`const exampleContent = {
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
`,(0,c.jsx)(t.h3,{children:`Tabs with badge notification`}),`
`,(0,c.jsx)(O,{}),`
`,(0,c.jsxs)(n,{children:[(0,c.jsx)(T,{}),(0,c.jsx)(E,{}),(0,c.jsx)(D,{})]})]})}function A(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(k,{...e})}):k(e)}function j(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{A as default};