import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{In as n,Rr as r,kn as i}from"./index-BIrFyEEc.js";import{t as a}from"./ComponentBox-DFVIRw0w.js";var o=e(t()),s=()=>(0,o.jsx)(a,{background:`plain`,hideCode:!0,"data-visual-test":`hr-default`,stableName:`HorizontalRuleDefaultExample`,sourceImports:[`import { Hr, P } from '@dnb/eufemia'`],__buildScope:{P:n,Hr:i},children:`
<P>Before</P>
<Hr
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`}),c=()=>(0,o.jsx)(a,{background:`plain`,hideCode:!0,"data-visual-test":`hr-breakout`,stableName:`HorizontalRuleBreakoutExample`,sourceImports:[`import { Hr, P } from '@dnb/eufemia'`],__buildScope:{P:n,Hr:i},children:`
<P>Before</P>
<Hr
  breakout
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`}),l=()=>(0,o.jsx)(a,{background:`plain`,hideCode:!0,"data-visual-test":`hr-dashed`,stableName:`HorizontalRuleDashedExample`,sourceImports:[`import { Hr, P } from '@dnb/eufemia'`],__buildScope:{P:n,Hr:i},children:`
<P>Before</P>
<Hr
  dashed
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`});function u(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Rule default`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Rule dashed`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Rule in fullscreen`}),`
`,(0,o.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};