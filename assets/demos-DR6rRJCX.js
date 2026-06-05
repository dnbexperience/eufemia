import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-BqMs-VnB.js";import{t as i}from"./Value-Cjs3mKU7.js";import{K as a,o}from"./index-Bx3ttow-.js";import{t as s}from"./ComponentBox-CG7uqrFy.js";var c=e({Empty:()=>u,Inline:()=>h,Label:()=>p,LabelAndValue:()=>m,Placeholder:()=>d,WithValue:()=>f}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.DateOfBirth showEmpty />
`}),d=()=>(0,l.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.DateOfBirth placeholder="The value was not filled in" />
`}),f=()=>(0,l.jsx)(s,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.DateOfBirth value="2023-01-16" />
`}),p=()=>(0,l.jsx)(s,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.DateOfBirth label="Label text" showEmpty />
`}),m=()=>(0,l.jsx)(s,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.DateOfBirth label="Label text" value="2023-01-16" />
`}),h=()=>(0,l.jsx)(s,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  This is before the component{' '}
  <Value.DateOfBirth value="2023-01-16" inline /> This is after the
  component
</P>
`});function g(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return c||v(`Examples`,!1),u||v(`Examples.Empty`,!0),h||v(`Examples.Inline`,!0),p||v(`Examples.Label`,!0),m||v(`Examples.LabelAndValue`,!0),d||v(`Examples.Placeholder`,!0),f||v(`Examples.WithValue`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(o,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,l.jsx)(t.h3,{children:`Empty`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,l.jsx)(d,{}),`
`,(0,l.jsx)(t.h3,{children:`Value`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsx)(t.h3,{children:`Label`}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsx)(t.h3,{children:`Label and value`}),`
`,(0,l.jsx)(m,{}),`
`,(0,l.jsx)(t.h3,{children:`Inline`}),`
`,(0,l.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};