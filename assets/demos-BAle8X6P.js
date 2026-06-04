import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{c as i}from"./ToggleButton-BtQrsiHY.js";import{t as a}from"./Form-913YPZs6.js";import{t as o}from"./Field-CbVmykdw.js";import{t as s}from"./Value-C2hl5_67.js";import{W as c}from"./index-D7e1avVt.js";import{t as l}from"./ComponentBox-CE7bpcJy.js";var u=e({FieldArraySelectionAndOption:()=>h,FieldArraySelectionPath:()=>g,Inline:()=>y,Label:()=>_,LabelAndValue:()=>v,ListTypes:()=>x,ListVariants:()=>b,Placeholder:()=>f,WithCustomFormat:()=>m,WithValue:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`Placeholder`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.ArraySelection placeholder="No value given" />
`}),p=()=>(0,d.jsx)(l,{stableName:`WithValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />
`}),m=()=>(0,d.jsx)(l,{stableName:`WithCustomFormat`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Value:s},children:`<Form.Handler
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
`}),h=()=>(0,d.jsx)(l,{stableName:`FieldArraySelectionAndOption`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o,Value:s},children:`<Form.Handler>
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
`}),g=()=>(0,d.jsx)(l,{stableName:`FieldArraySelectionPath`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o,Value:s},children:`<Form.Handler
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
`}),_=()=>(0,d.jsx)(l,{stableName:`Label`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.ArraySelection label="Label text" showEmpty />
`}),v=()=>(0,d.jsx)(l,{stableName:`LabelAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.ArraySelection label="Label text" value={['Foo', 'Bar', 'Baz']} />
`}),y=()=>(0,d.jsx)(l,{stableName:`Inline`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:s},children:`<P>
  This is before the component{' '}
  <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This is
  after the component
</P>
`}),b=()=>(0,d.jsx)(l,{stableName:`ListVariants`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.SummaryList>
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
`}),x=()=>(0,d.jsx)(l,{hideCode:!0,stableName:`ListTypes`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`
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

`});function S(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...c(),...e.components};return u||w(`Examples`,!1),h||w(`Examples.FieldArraySelectionAndOption`,!0),y||w(`Examples.Inline`,!0),_||w(`Examples.Label`,!0),v||w(`Examples.LabelAndValue`,!0),x||w(`Examples.ListTypes`,!0),b||w(`Examples.ListVariants`,!0),f||w(`Examples.Placeholder`,!0),m||w(`Examples.WithCustomFormat`,!0),p||w(`Examples.WithValue`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Value`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`Custom format`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Label`}),`
`,(0,d.jsx)(_,{}),`
`,(0,d.jsx)(t.h3,{children:`Label and value`}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(t.h3,{children:`Inline`}),`
`,(0,d.jsx)(y,{}),`
`,(0,d.jsx)(t.h3,{children:`List variants`}),`
`,(0,d.jsx)(b,{}),`
`,(0,d.jsx)(t.h3,{children:`List types`}),`
`,(0,d.jsx)(x,{}),`
`,(0,d.jsx)(t.h3,{children:`Field.Option and Field.ArraySelection`}),`
`,(0,d.jsxs)(t.p,{children:[`When using the same `,(0,d.jsx)(t.code,{children:`path`}),` as on a `,(0,d.jsx)(t.code,{children:`Field.ArraySelection`}),`, the `,(0,d.jsx)(t.code,{children:`Field.Option`}),` title will be used as the displayed value.`]}),`
`,(0,d.jsx)(h,{})]})}function C(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};