import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({FieldArraySelectionAndOption:()=>u,FieldArraySelectionPath:()=>d,Inline:()=>m,Label:()=>f,LabelAndValue:()=>p,ListTypes:()=>g,ListVariants:()=>h,Placeholder:()=>s,WithCustomFormat:()=>l,WithValue:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.ArraySelection placeholder="No value given" />
`}),c=()=>(0,o.jsx)(r,{stableName:`WithValue`,children:`<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />
`}),l=()=>(0,o.jsx)(r,{stableName:`WithCustomFormat`,children:`<Form.Handler
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
`}),u=()=>(0,o.jsx)(r,{stableName:`FieldArraySelectionAndOption`,children:`<Form.Handler>
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
`}),d=()=>(0,o.jsx)(r,{stableName:`FieldArraySelectionPath`,children:`<Form.Handler
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
`}),f=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Value.ArraySelection label="Label text" showEmpty />
`}),p=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.ArraySelection label="Label text" value={['Foo', 'Bar', 'Baz']} />
`}),m=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component{' '}
  <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This is
  after the component
</P>
`}),h=()=>(0,o.jsx)(r,{stableName:`ListVariants`,children:`<Value.SummaryList>
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
`}),g=()=>(0,o.jsx)(r,{hideCode:!0,stableName:`ListTypes`,children:`
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

`});function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||y(`Examples`,!1),u||y(`Examples.FieldArraySelectionAndOption`,!0),m||y(`Examples.Inline`,!0),f||y(`Examples.Label`,!0),p||y(`Examples.LabelAndValue`,!0),g||y(`Examples.ListTypes`,!0),h||y(`Examples.ListVariants`,!0),s||y(`Examples.Placeholder`,!0),l||y(`Examples.WithCustomFormat`,!0),c||y(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Value`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Custom format`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`List variants`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`List types`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Field.Option and Field.ArraySelection`}),`
`,(0,o.jsxs)(t.p,{children:[`When using the same `,(0,o.jsx)(t.code,{children:`path`}),` as on a `,(0,o.jsx)(t.code,{children:`Field.ArraySelection`}),`, the `,(0,o.jsx)(t.code,{children:`Field.Option`}),` title will be used as the displayed value.`]}),`
`,(0,o.jsx)(u,{})]})}function v(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};