import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{background:`plain`,hideCode:!0,"data-visual-test":`hr-default`,stableName:`HorizontalRuleDefaultExample`,children:`
<P>Before</P>
<Hr
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`}),o=()=>(0,i.jsx)(n,{background:`plain`,hideCode:!0,"data-visual-test":`hr-breakout`,stableName:`HorizontalRuleBreakoutExample`,children:`
<P>Before</P>
<Hr
  breakout
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`}),s=()=>(0,i.jsx)(n,{background:`plain`,hideCode:!0,"data-visual-test":`hr-dashed`,stableName:`HorizontalRuleDashedExample`,children:`
<P>Before</P>
<Hr
  dashed
  space={{
    top: '0.5rem',
    bottom: '0.5rem',
  }}
/>
<P>After</P>

`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Horizontal Rule default`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Horizontal Rule dashed`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Horizontal Rule in fullscreen`}),`
`,(0,i.jsx)(o,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};