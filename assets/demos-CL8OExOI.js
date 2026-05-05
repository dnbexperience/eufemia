import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({FieldSelectionAndOption:()=>f,FieldSelectionPath:()=>d,Inline:()=>u,Label:()=>c,LabelAndValue:()=>l,Placeholder:()=>o,WithValue:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Selection placeholder="No value selected" />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Selection value="Bar" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Selection label="Label text" showEmpty />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.Selection label="Label text" value="Foo" />
`}),u=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component <Value.Selection value="Baz" inline /> This
  is after the component
</P>
`}),d=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),f=()=>(0,a.jsx)(n,{children:`<Form.Handler>
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
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||h(`Examples`,!1),f||h(`Examples.FieldSelectionAndOption`,!0),d||h(`Examples.FieldSelectionPath`,!0),u||h(`Examples.Inline`,!0),c||h(`Examples.Label`,!0),l||h(`Examples.LabelAndValue`,!0),o||h(`Examples.Placeholder`,!0),s||h(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Value`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Field.Selection with path`}),`
`,(0,a.jsxs)(t.p,{children:[`When using the same `,(0,a.jsx)(t.code,{children:`path`}),` as on a `,(0,a.jsx)(t.code,{children:`Field.Selection`}),`, the title will be used as the displayed value.`]}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Field.Option and Field.Selection`}),`
`,(0,a.jsxs)(t.p,{children:[`When using the same `,(0,a.jsx)(t.code,{children:`path`}),` as on a `,(0,a.jsx)(t.code,{children:`Field.Selection`}),`, the `,(0,a.jsx)(t.code,{children:`Field.Option`}),` title will be used as the displayed value.`]}),`
`,(0,a.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};