import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{v as r}from"./forms-CsJzlVUF.js";import{t as i}from"./P-CbimSwQH.js";import{B as a}from"./index-DdG6L_K8.js";import{t as o}from"./ComponentBox-q_23Ylzi.js";var s=e({Inline:()=>f,LabelAndValue:()=>d,Range:()=>p,VariantNumeric:()=>u,VariantShort:()=>l}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`VariantShort`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.Date label="Label text" value="2023-01-16" variant="short" />
`}),u=()=>(0,c.jsx)(o,{stableName:`VariantNumeric`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.Date label="Label text" value="2023-01-16" variant="numeric" />
`}),d=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.Date label="Label text" value="2023-01-16" />
`}),f=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:i,Value:r},children:`<P>
  This is before the component{' '}
  <Value.Date label="Label text" value="2023-01-16" inline /> This is after
  the component
</P>
`}),p=()=>(0,c.jsx)(o,{stableName:`Range`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:r},children:`<Value.Date label="Label text" value="2023-01-16|2023-04-01" />
`});function m(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||g(`Examples`,!1),f||g(`Examples.Inline`,!0),d||g(`Examples.LabelAndValue`,!0),p||g(`Examples.Range`,!0),u||g(`Examples.VariantNumeric`,!0),l||g(`Examples.VariantShort`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Variant short`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Variant numeric`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Date range`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(f,{})]})}function h(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};