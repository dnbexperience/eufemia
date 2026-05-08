import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{H as n,t as r}from"./ComponentBox-DPdYTeDv.js";import{Lr as i}from"./index--zEB_f_m.js";var a=e({Inline:()=>d,ListTypes:()=>p,ListVariants:()=>f,UsingListFormatFunction:()=>s,WithChildren:()=>l,WithCustomFormat:()=>u,WithValue:()=>c}),o=t(),s=()=>(0,o.jsx)(r,{"data-visual-test":`list-format-function`,scope:{listFormat:n},children:`{
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
`}),c=()=>(0,o.jsx)(r,{"data-visual-test":`list-format-default`,children:`<ListFormat
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
`}),l=()=>(0,o.jsx)(r,{children:`<ListFormat>
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
`}),u=()=>(0,o.jsx)(r,{"data-visual-test":`list-format-custom-format`,children:`<Provider locale="en-GB">
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
`}),d=()=>(0,o.jsx)(r,{"data-visual-test":`list-format-inline`,children:`<P>
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
`}),f=()=>(0,o.jsx)(r,{"data-visual-test":`list-format-variants`,children:`
<P>Ordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ol" />
<P>Unordered List:</P>
<ListFormat value={['Foo', 'Bar', 'Baz']} variant="ul" />

`}),p=()=>(0,o.jsx)(r,{"data-visual-test":`list-format-types`,children:`
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

`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,...i(),...e.components};return a||g(`Examples`,!1),d||g(`Examples.Inline`,!0),p||g(`Examples.ListTypes`,!0),f||g(`Examples.ListVariants`,!0),s||g(`Examples.UsingListFormatFunction`,!0),l||g(`Examples.WithChildren`,!0),u||g(`Examples.WithCustomFormat`,!0),c||g(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsxs)(t.h3,{children:[`Basic usage with `,(0,o.jsx)(t.code,{children:`value`})]}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsxs)(t.h3,{children:[`Basic usage with `,(0,o.jsx)(t.code,{children:`children`})]}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Custom format`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`List variants`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`List types`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Using listFormat function`}),`
`,(0,o.jsx)(s,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};