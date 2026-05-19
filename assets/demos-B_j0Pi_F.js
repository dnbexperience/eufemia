import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{H as r,t as i}from"./ComponentBox-a4aOn231.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({Inline:()=>f,ListTypes:()=>m,ListVariants:()=>p,UsingListFormatFunction:()=>c,WithChildren:()=>u,WithCustomFormat:()=>d,WithValue:()=>l}),s=e(n()),c=()=>(0,s.jsx)(i,{"data-visual-test":`list-format-function`,scope:{listFormat:r},stableName:`UsingListFormatFunction`,children:`{
  listFormat(
    [
      <Fragment key="a">A</Fragment>,
      <>
        <b>B</b>
      </>,
      <>C</>,
      'D',
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ],
    {
      format: {
        type: 'disjunction',
      },
      locale: 'en-US',
    }
  )
}
`}),l=()=>(0,s.jsx)(i,{"data-visual-test":`list-format-default`,stableName:`WithValue`,children:`<ListFormat
  value={[
    <Fragment key="a">A</Fragment>,
    <>
      <b>B</b>
    </>,
    <>C</>,
    'D',
    123,
    <Anchor
      target="_blank"
      href="https://github.com/dnbexperience/eufemia"
      rel="noopener noreferrer"
      key="github"
    >
      Link to Eufemia's Github Repo
    </Anchor>,
    <>
      Text <Badge content="Info" variant="information" /> Text
    </>,
  ]}
/>
`}),u=()=>(0,s.jsx)(i,{stableName:`WithChildren`,children:`<ListFormat>
  <Fragment key="a">A</Fragment>
  <>
    <b>B</b>
  </>
  <>C</>
  <>D</>
  123
  <Anchor
    target="_blank"
    href="https://github.com/dnbexperience/eufemia"
    rel="noopener noreferrer"
    key="github"
  >
    Link to Eufemia's Github Repo
  </Anchor>
  <>
    Text <Badge content="Info" variant="information" /> Text
  </>
</ListFormat>
`}),d=()=>(0,s.jsx)(i,{"data-visual-test":`list-format-custom-format`,stableName:`WithCustomFormat`,children:`<Provider locale="en-GB">
  <ListFormat
    value={[
      <Fragment key="a">A</Fragment>,
      <>
        <b>B</b>
      </>,
      <>C</>,
      'D',
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ]}
    format={{
      type: 'disjunction',
    }}
  />
</Provider>
`}),f=()=>(0,s.jsx)(i,{"data-visual-test":`list-format-inline`,stableName:`Inline`,children:`<P>
  This is before the component{' '}
  <ListFormat
    value={[
      123,
      <Anchor
        target="_blank"
        href="https://github.com/dnbexperience/eufemia"
        rel="noopener noreferrer"
        key="github"
      >
        Link to Eufemia's Github Repo
      </Anchor>,
      <>
        Text <Badge content="Info" variant="information" /> Text
      </>,
    ]}
  />{' '}
  This is after the component
</P>
`}),p=()=>(0,s.jsx)(i,{"data-visual-test":`list-format-variants`,stableName:`ListVariants`,children:`
<P>Ordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" />
<P>Unordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ul" />

`}),m=()=>(0,s.jsx)(i,{"data-visual-test":`list-format-types`,stableName:`ListTypes`,children:`
<P>Ordered List a:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="a" />
<P>Ordered List A:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="A" />
<P>Ordered List i:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="i" />
<P>Ordered List I:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" listType="I" />
<P>Unordered List square:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="square"
/>
<P>Unordered List circle:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="circle"
/>
<P>Unordered List unstyled:</P>
<ListFormat
  value={['Foo', 'Bar', 'Baz']}
  variant="ul"
  listType="unstyled"
/>

`});function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,...a(),...e.components};return o||_(`Examples`,!1),f||_(`Examples.Inline`,!0),m||_(`Examples.ListTypes`,!0),p||_(`Examples.ListVariants`,!0),c||_(`Examples.UsingListFormatFunction`,!0),u||_(`Examples.WithChildren`,!0),d||_(`Examples.WithCustomFormat`,!0),l||_(`Examples.WithValue`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsxs)(t.h3,{children:[`Basic usage with `,(0,s.jsx)(t.code,{children:`value`})]}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsxs)(t.h3,{children:[`Basic usage with `,(0,s.jsx)(t.code,{children:`children`})]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Custom format`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`List variants`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`List types`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Using listFormat function`}),`
`,(0,s.jsx)(c,{})]})}function g(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};