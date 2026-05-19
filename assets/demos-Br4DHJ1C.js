import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({FieldSelectionAndOption:()=>p,FieldSelectionPath:()=>f,Inline:()=>d,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>s,WithValue:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.Selection placeholder="No value selected" />
`}),c=()=>(0,o.jsx)(r,{stableName:`WithValue`,children:`<Value.Selection value="Bar" />
`}),l=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Value.Selection label="Label text" showEmpty />
`}),u=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.Selection label="Label text" value="Foo" />
`}),d=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component <Value.Selection value="Baz" inline /> This
  is after the component
</P>
`}),f=()=>(0,o.jsx)(r,{stableName:`FieldSelectionPath`,children:`<Form.Handler
  data={{
    selection: 'bar',
    myList: [
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
    <Field.Selection
      path="/selection"
      dataPath="/myList"
      variant="radio"
      label="My selection"
    />
    <Value.Selection path="/selection" dataPath="/myList" inheritLabel />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,o.jsx)(r,{stableName:`FieldSelectionAndOption`,children:`<Form.Handler>
  <Flex.Stack>
    <Field.Selection
      label="My selection"
      path="/myPath"
      variant="radio"
      value="bar"
    >
      <Field.Option value="foo" title="Foo" />
      <Field.Option value="bar" title="Bar" />
      <Field.Option value="baz" title="Baz" />
    </Field.Selection>

    <Value.Selection label="My selection" path="/myPath" />
  </Flex.Stack>
</Form.Handler>
`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||g(`Examples`,!1),p||g(`Examples.FieldSelectionAndOption`,!0),f||g(`Examples.FieldSelectionPath`,!0),d||g(`Examples.Inline`,!0),l||g(`Examples.Label`,!0),u||g(`Examples.LabelAndValue`,!0),s||g(`Examples.Placeholder`,!0),c||g(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Value`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Field.Selection with path`}),`
`,(0,o.jsxs)(t.p,{children:[`When using the same `,(0,o.jsx)(t.code,{children:`path`}),` as on a `,(0,o.jsx)(t.code,{children:`Field.Selection`}),`, the title will be used as the displayed value.`]}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Field.Option and Field.Selection`}),`
`,(0,o.jsxs)(t.p,{children:[`When using the same `,(0,o.jsx)(t.code,{children:`path`}),` as on a `,(0,o.jsx)(t.code,{children:`Field.Selection`}),`, the `,(0,o.jsx)(t.code,{children:`Field.Option`}),` title will be used as the displayed value.`]}),`
`,(0,o.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};