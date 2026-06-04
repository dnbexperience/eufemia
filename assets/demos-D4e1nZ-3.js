import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./P-avM674pJ.js";import{t as r}from"./Hr-Bm2_i4ho.js";import{W as i}from"./index-D7e1avVt.js";import{t as a}from"./ComponentBox-CE7bpcJy.js";var o=e(t()),s=()=>(0,o.jsx)(a,{background:`plain`,hideCode:!0,"data-visual-test":`hr-default`,stableName:`HorizontalRuleDefaultExample`,sourceImports:[`import { Hr, P } from '@dnb/eufemia'`],__buildScope:{P:n,Hr:r},children:`
<P>Before</P>
<Hr
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`}),c=()=>(0,o.jsx)(a,{background:`plain`,hideCode:!0,"data-visual-test":`hr-breakout`,stableName:`HorizontalRuleBreakoutExample`,sourceImports:[`import { Hr, P } from '@dnb/eufemia'`],__buildScope:{P:n,Hr:r},children:`
<P>Before</P>
<Hr
  breakout
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`}),l=()=>(0,o.jsx)(a,{background:`plain`,hideCode:!0,"data-visual-test":`hr-dashed`,stableName:`HorizontalRuleDashedExample`,sourceImports:[`import { Hr, P } from '@dnb/eufemia'`],__buildScope:{P:n,Hr:r},children:`
<P>Before</P>
<Hr
  dashed
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`});function u(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Rule default`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Rule dashed`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Horizontal Rule in fullscreen`}),`
`,(0,o.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};