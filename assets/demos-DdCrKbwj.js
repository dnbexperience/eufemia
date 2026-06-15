import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-C9wBv35m.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{t as a}from"./Form-JTiJXf2d.js";import{t as o}from"./Field-DqRpWyNm.js";import{t as s}from"./Value-OsZalonW.js";import{K as c}from"./index-ppRu2ktv.js";import{t as l}from"./ComponentBox-R2c6Bo76.js";var u=e({DifferentLocale:()=>m,Inline:()=>_,Label:()=>h,LabelAndValue:()=>g,Placeholder:()=>f,WithFieldAndValue:()=>v,WithValue:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`Placeholder`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.SelectCurrency placeholder="No value given" />
`}),p=()=>(0,d.jsx)(l,{stableName:`WithValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.SelectCurrency value="NOK" />
`}),m=()=>(0,d.jsx)(l,{stableName:`DifferentLocale`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Value:s},children:`<Form.Handler
  locale="en-GB"
  data={{
    myCurrency: 'CHF',
  }}
>
  <Value.SelectCurrency path="/myCurrency" />
</Form.Handler>
`}),h=()=>(0,d.jsx)(l,{stableName:`Label`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.SelectCurrency label="Label text" showEmpty />
`}),g=()=>(0,d.jsx)(l,{stableName:`LabelAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:s},children:`<Value.SelectCurrency label="Label text" value="NOK" />
`}),_=()=>(0,d.jsx)(l,{stableName:`Inline`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:s},children:`<P>
  This is before the component <Value.SelectCurrency value="NOK" inline />{' '}
  This is after the component
</P>
`}),v=()=>(0,d.jsx)(l,{stableName:`WithFieldAndValue`,sourceImports:[`import { Flex, P } from '@dnb/eufemia'`,`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Flex:i,Field:o,Value:s},children:`<Form.Handler
  data={{
    myCurrency: 'NOK',
  }}
>
  <Flex.Stack>
    <Field.SelectCurrency path="/myCurrency" />
    <Value.SelectCurrency path="/myCurrency" />
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