import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-BqMs-VnB.js";import{t as i}from"./Value-Cjs3mKU7.js";import{K as a}from"./index-Bx3ttow-.js";import{t as o}from"./ComponentBox-CG7uqrFy.js";var s=e({Empty:()=>l,Inline:()=>m,Label:()=>f,LabelAndValue:()=>p,Placeholder:()=>u,WithValue:()=>d}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.OrganizationNumber showEmpty />
`}),u=()=>(0,c.jsx)(o,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.OrganizationNumber placeholder="The value was not filled in" />
`}),d=()=>(0,c.jsx)(o,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.OrganizationNumber value="123456789" />
`}),f=()=>(0,c.jsx)(o,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.OrganizationNumber label="Label text" showEmpty />
`}),p=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.OrganizationNumber label="Label text" value="123456789" />
`}),m=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  This is before the component{' '}
  <Value.OrganizationNumber value="123456789" inline /> This is after the
  component
</P>
`});function h(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||_(`Examples`,!1),l||_(`Examples.Empty`,!0),m||_(`Examples.Inline`,!0),f||_(`Examples.Label`,!0),p||_(`Examples.LabelAndValue`,!0),u||_(`Examples.Placeholder`,!0),d||_(`Examples.WithValue`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Empty`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Value`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Label`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};