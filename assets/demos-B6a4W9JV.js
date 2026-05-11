import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({FieldArraySelectionAndOption:()=>l,FieldArraySelectionPath:()=>u,Inline:()=>p,Label:()=>d,LabelAndValue:()=>f,ListTypes:()=>h,ListVariants:()=>m,Placeholder:()=>o,WithCustomFormat:()=>c,WithValue:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.ArraySelection placeholder="No value given" />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler
  locale="en-GB"
  data={{
    myPath: [123, 456, 789],
  }}
>
  <Value.ArraySelection
    path="/myPath"
    format={{
      type: 'disjunction',
    }}
  />
</Form.Handler>
`}),l=()=>(0,a.jsx)(n,{children:`<Form.Handler>
  <Flex.Stack>
    <Field.ArraySelection
      label="My selections"
      path="/myPath"
      value={['bar', 'baz']}
    >
      <Field.Option value="foo" title="Foo" />
      <Field.Option value="bar" title="Bar" />
      <Field.Option value="baz" title="Baz" />
    </Field.ArraySelection>

    <Value.ArraySelection inheritLabel path="/myPath" />
  </Flex.Stack>
</Form.Handler>
`}),u=()=>(0,a.jsx)(n,{children:`<Form.Handler
  data={{
    myPath: [
      {
        value: 'foo',
        title: 'Foo',
      },
      {
        value: 'bar',
        title: 'Bar',
      },
      {
        value: 'baz',
        title: 'Baz',
      },
    ],
  }}
>
  <Flex.Stack>
    <Field.ArraySelection label="My selections" path="/myPath" />
    <Value.ArraySelection inheritLabel path="/myPath" />
  </Flex.Stack>
</Form.Handler>
`}),d=()=>(0,a.jsx)(n,{children:`<Value.ArraySelection label="Label text" showEmpty />
`}),f=()=>(0,a.jsx)(n,{children:`<Value.ArraySelection label="Label text" value={['Foo', 'Bar', 'Baz']} />
`}),p=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This is
  after the component
</P>
`}),m=()=>(0,a.jsx)(n,{children:`<Value.SummaryList>
  <Value.ArraySelection
    value={['Foo', 'Bar', 'Baz']}
    label="Ordered List"
    variant="ol"
  />
  <Value.ArraySelection
    value={['Foo', 'Bar', 'Baz']}
    label="Unordered List"
    variant="ul"
  />
</Value.SummaryList>
`}),h=()=>(0,a.jsx)(n,{hideCode:!0,children:`
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List a"
  variant="ol"
  listType="a"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List A"
  variant="ol"
  listType="A"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List i"
  variant="ol"
  listType="i"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List I"
  variant="ol"
  listType="I"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List square"
  variant="ul"
  listType="square"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List circle"
  variant="ul"
  listType="circle"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List unstyled"
  variant="ul"
  listType="unstyled"
/>

`});function g(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||v(`Examples`,!1),l||v(`Examples.FieldArraySelectionAndOption`,!0),p||v(`Examples.Inline`,!0),d||v(`Examples.Label`,!0),f||v(`Examples.LabelAndValue`,!0),h||v(`Examples.ListTypes`,!0),m||v(`Examples.ListVariants`,!0),o||v(`Examples.Placeholder`,!0),c||v(`Examples.WithCustomFormat`,!0),s||v(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Value`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Custom format`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`List variants`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h3,{children:`List types`}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h3,{children:`Field.Option and Field.ArraySelection`}),`
`,(0,a.jsxs)(t.p,{children:[`When using the same `,(0,a.jsx)(t.code,{children:`path`}),` as on a `,(0,a.jsx)(t.code,{children:`Field.ArraySelection`}),`, the `,(0,a.jsx)(t.code,{children:`Field.Option`}),` title will be used as the displayed value.`]}),`
`,(0,a.jsx)(l,{})]})}function _(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};