import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({ScrollViewInfo:()=>s,ScrollViewInteractive:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<ScrollView
  interactive={true}
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
`}),s=()=>(0,a.jsx)(n,{hidePreview:!0,hideToolbar:!0,children:`<ScrollView>scrollable content</ScrollView>
`});function c(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.ScrollViewInteractive`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Keyboard support`}),`
`,(0,a.jsx)(t.p,{children:`When used for regular content, it should be possible for the user to user their keyboard to control the scroll position.`}),`
`,(0,a.jsxs)(t.p,{children:[`You can enable keyboard support with the `,(0,a.jsx)(t.code,{children:`interactive`}),` property.`]}),`
`,(0,a.jsx)(o,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default,s as t};