import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{u as r}from"./Table-DacTQdxx.js";import{U as i}from"./index-CGxQ8PRe.js";import{t as a}from"./ComponentBox-DOwlXUSS.js";var o=e({ScrollViewInfo:()=>l,ScrollViewInteractive:()=>c}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`ScrollViewInteractive`,sourceImports:[`import { ScrollView } from '@dnb/eufemia/components'`],__buildScope:{ScrollView:r},children:`<ScrollView
  interactive="auto"
  aria-label="Scrollable color example"
  style={{
    maxHeight: '10rem',
  }}
>
  <div
    style={{
      minHeight: 800,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      background:
        'linear-gradient(rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100%) 0 0/100% 200%',
    }}
  >
    large content
  </div>
</ScrollView>
`}),l=()=>(0,s.jsx)(a,{hidePreview:!0,hideToolbar:!0,stableName:`ScrollViewInfo`,sourceImports:[`import { ScrollView } from '@dnb/eufemia/components'`],__buildScope:{ScrollView:r},children:`<ScrollView>scrollable content</ScrollView>
`});function u(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return o||f(`Examples`,!1),c||f(`Examples.ScrollViewInteractive`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Keyboard-accessible overflow`}),`
`,(0,s.jsxs)(t.p,{children:[`Use `,(0,s.jsx)(t.code,{children:`interactive="auto"`}),` to make the region keyboard-focusable only when its content overflows. The example constrains its height to create vertical overflow.`]}),`
`,(0,s.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default,l as t};