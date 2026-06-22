import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-DoxBGtHF.js";import{j as i,v as a,w as o}from"./forms-CsJzlVUF.js";import{t as s}from"./P-CbimSwQH.js";import{B as c}from"./index-DdG6L_K8.js";import{t as l}from"./ComponentBox-q_23Ylzi.js";var u=e({DifferentLocale:()=>m,Inline:()=>_,Label:()=>h,LabelAndValue:()=>g,Placeholder:()=>f,WithFieldAndValue:()=>v,WithValue:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`Placeholder`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.SelectCountry placeholder="No value given" />
`}),p=()=>(0,d.jsx)(l,{stableName:`WithValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.SelectCountry value="NO" />
`}),m=()=>(0,d.jsx)(l,{stableName:`DifferentLocale`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Value:a},children:`<Form.Handler
  locale="en-GB"
  data={{
    myCountry: 'CH',
  }}
>
  <Value.SelectCountry path="/myCountry" />
</Form.Handler>
`}),h=()=>(0,d.jsx)(l,{stableName:`Label`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.SelectCountry label="Label text" showEmpty />
`}),g=()=>(0,d.jsx)(l,{stableName:`LabelAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.SelectCountry label="Label text" value="NO" />
`}),_=()=>(0,d.jsx)(l,{stableName:`Inline`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:s,Value:a},children:`<P>
  This is before the component <Value.SelectCountry value="NO" inline />{' '}
  This is after the component
</P>
`}),v=()=>(0,d.jsx)(l,{stableName:`WithFieldAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Flex:r,Field:i,Value:a},children:`<Form.Handler
  data={{
    myCountry: 'NO',
  }}
>
  <Flex.Stack>
    <Field.SelectCountry path="/myCountry" />
    <Value.SelectCountry path="/myCountry" />
  </Flex.Stack>
</Form.Handler>
`});function y(e){let t={h2:`h2`,h3:`h3`,...c(),...e.components};return u||x(`Examples`,!1),m||x(`Examples.DifferentLocale`,!0),_||x(`Examples.Inline`,!0),h||x(`Examples.Label`,!0),g||x(`Examples.LabelAndValue`,!0),f||x(`Examples.Placeholder`,!0),v||x(`Examples.WithFieldAndValue`,!0),p||x(`Examples.WithValue`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Interactive`}),`
`,(0,d.jsx)(v,{}),`
`,(0,d.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Value`}),`
`,(0,d.jsx)(p,{}),`
`,(0,d.jsx)(t.h3,{children:`Use different locale`}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Label`}),`
`,(0,d.jsx)(h,{}),`
`,(0,d.jsx)(t.h3,{children:`Label and value`}),`
`,(0,d.jsx)(g,{}),`
`,(0,d.jsx)(t.h3,{children:`Inline`}),`
`,(0,d.jsx)(_,{})]})}function b(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};