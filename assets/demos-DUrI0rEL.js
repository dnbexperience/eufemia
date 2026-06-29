import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-DfKpi57X.js";import{j as i,v as a,w as o}from"./forms-D54jfDKN.js";import{t as s}from"./P-CVKBz4XO.js";import{U as c}from"./index-BsJ3GLEw.js";import{t as l}from"./ComponentBox-sLMgHvLi.js";var u=e({FieldSelectionAndOption:()=>v,FieldSelectionPath:()=>_,Inline:()=>g,Label:()=>m,LabelAndValue:()=>h,Placeholder:()=>f,WithValue:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`Placeholder`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Selection placeholder="No value selected" />
`}),p=()=>(0,d.jsx)(l,{stableName:`WithValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Selection value="Bar" />
`}),m=()=>(0,d.jsx)(l,{stableName:`Label`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Selection label="Label text" showEmpty />
`}),h=()=>(0,d.jsx)(l,{stableName:`LabelAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Selection label="Label text" value="Foo" />
`}),g=()=>(0,d.jsx)(l,{stableName:`Inline`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:s,Value:a},children:`<P>
  This is before the component <Value.Selection value="Baz" inline /> This
  is after the component
</P>
`}),_=()=>(0,d.jsx)(l,{stableName:`FieldSelectionPath`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:r,Field:i,Value:a},children:`<Form.Handler
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
`}),v=()=>(0,d.jsx)(l,{stableName:`FieldSelectionAndOption`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:r,Field:i,Value:a},children:`<Form.Handler>
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
`});function y(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return u||x(`Examples`,!1),v||x(`Examples.FieldSelectionAndOption`,!0),_||x(`Examples.FieldSelectionPath`,!0),g||x(`Examples.Inline`,!0),m||x(`Examples.Label`,!0),h||x(`Examples.LabelAndValue`,!0),f||x(`Examples.Placeholder`,!0),p||x(`Examples.WithValue`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Value`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`Label`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Label and value`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Inline`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`Field.Selection with path`}),`
`,(0,d.jsxs)(t.p,{children:[`When using the same `,(0,d.jsx)(t.code,{children:`path`}),` as on a `,(0,d.jsx)(t.code,{children:`Field.Selection`}),`, the title will be used as the displayed value.`]}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`Field.Option and Field.Selection`}),`
`,(0,d.jsxs)(t.p,{children:[`When using the same `,(0,d.jsx)(t.code,{children:`path`}),` as on a `,(0,d.jsx)(t.code,{children:`Field.Selection`}),`, the `,(0,d.jsx)(t.code,{children:`Field.Option`}),` title will be used as the displayed value.`]}),`
`,(0,d.jsx)(v,{})]})}function b(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};