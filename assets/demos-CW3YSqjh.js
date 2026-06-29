import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{v as r}from"./forms-D54jfDKN.js";import{t as i}from"./P-CVKBz4XO.js";import{U as a}from"./index-BsJ3GLEw.js";import{t as o}from"./ComponentBox-sLMgHvLi.js";var s=e({Empty:()=>l,Inline:()=>m,Label:()=>f,LabelAndValue:()=>p,Placeholder:()=>u,WithValue:()=>d}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.NationalIdentityNumber showEmpty />
`}),u=()=>(0,c.jsx)(o,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.NationalIdentityNumber placeholder="The value was not filled in" />
`}),d=()=>(0,c.jsx)(o,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.NationalIdentityNumber value="25017598765" />
`}),f=()=>(0,c.jsx)(o,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.NationalIdentityNumber label="Label text" showEmpty />
`}),p=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.NationalIdentityNumber label="Label text" value="25017598765" />
`}),m=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:i,Value:r},children:`<P>
  This is before the component{' '}
  <Value.NationalIdentityNumber value="25017598765" inline /> This is after
  the component
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