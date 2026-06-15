import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-C9wBv35m.js";import{t as i}from"./Value-OsZalonW.js";import{K as a}from"./index-ppRu2ktv.js";import{t as o}from"./ComponentBox-R2c6Bo76.js";var s=e({Empty:()=>l,Inline:()=>h,Label:()=>p,LabelAndValue:()=>m,Placeholder:()=>u,ValueFalse:()=>f,ValueTrue:()=>d}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Boolean showEmpty />
`}),u=()=>(0,c.jsx)(o,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Boolean placeholder="The value was not filled in" />
`}),d=()=>(0,c.jsx)(o,{stableName:`ValueTrue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Boolean value={true} />
`}),f=()=>(0,c.jsx)(o,{stableName:`ValueFalse`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Boolean value={false} />
`}),p=()=>(0,c.jsx)(o,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Boolean label="Label text" showEmpty />
`}),m=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.Boolean label="Label text" value={false} />
`}),h=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  <span
    style={{
      color: 'red',
    }}
  >
    This is before the component
  </span>{' '}
  <Value.Boolean value={true} inline />{' '}
  <span
    style={{
      color: 'red',
    }}
  >
    This is after the component
  </span>
</P>
`});function g(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||v(`Examples`,!1),l||v(`Examples.Empty`,!0),h||v(`Examples.Inline`,!0),p||v(`Examples.Label`,!0),m||v(`Examples.LabelAndValue`,!0),u||v(`Examples.Placeholder`,!0),f||v(`Examples.ValueFalse`,!0),d||v(`Examples.ValueTrue`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Empty`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Value true`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Value false`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Label`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};