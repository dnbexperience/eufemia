import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-BqMs-VnB.js";import{t as i}from"./Form-C8lTzZqR.js";import{t as a}from"./Value-Cjs3mKU7.js";import{K as o}from"./index-Bx3ttow-.js";import{t as s}from"./ComponentBox-CG7uqrFy.js";var c=e({Inline:()=>m,LabelAndValue:()=>f,Placeholder:()=>d,ValueAndPath:()=>p,WithLabelAndEmpty:()=>u}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`WithLabelAndEmpty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Number label="Label text" showEmpty />
`}),d=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Number placeholder="The number was not filled in" />
`}),f=()=>(0,l.jsx)(s,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:a},children:`<Value.Number label="Label text" value={12345678} />
`}),p=()=>(0,l.jsx)(s,{stableName:`ValueAndPath`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Value:a},children:`<Form.Handler
  data={{
    myNumber: 12345678,
  }}
>
  <Value.Number
    label="Label text"
    currency
    currencyDisplay="code"
    currencyPosition="before"
    path="/myNumber"
  />
</Form.Handler>
`}),m=()=>(0,l.jsx)(s,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:a},children:`<P>
  This is before the component <Value.Number value={123} inline /> This is
  after the component
</P>
`});function h(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||_(`Examples`,!1),m||_(`Examples.Inline`,!0),f||_(`Examples.LabelAndValue`,!0),d||_(`Examples.Placeholder`,!0),p||_(`Examples.ValueAndPath`,!0),u||_(`Examples.WithLabelAndEmpty`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Label and value`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Value from path`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Label only`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Inline`}),`
`,(0,l.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};