import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as n,ri as r}from"./index-Da-r8F54.js";import{t as i}from"./ComponentBox-DXeEXSK2.js";var a=e(t()),o=()=>(0,a.jsx)(i,{stableName:`IconPrimaryDefaultExample`,sourceImports:[`import { IconPrimary } from '@dnb/eufemia'`],__buildScope:{IconPrimary:r},children:`
<IconPrimary icon="question" title="Give icons a title" />
<IconPrimary
  icon="question_medium"
  title="Size defined in name"
  aria-hidden
/>

`}),s=()=>(0,a.jsx)(i,{stableName:`IconPrimaryFixedSizeExample`,sourceImports:[`import { IconPrimary } from '@dnb/eufemia'`],__buildScope:{IconPrimary:r},children:`<IconPrimary icon="question" size="64" title="I'm not responsive!" />
`});function c(e){let t={h2:`h2`,h3:`h3`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Default and Medium-sized icons (responsive)`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Default Icon with custom, but fixed size (64)`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};