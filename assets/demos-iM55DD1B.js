import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({ScrollViewInfo:()=>c,ScrollViewInteractive:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`ScrollViewInteractive`,children:`<ScrollView
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
`}),c=()=>(0,o.jsx)(r,{hidePreview:!0,hideToolbar:!0,stableName:`ScrollViewInfo`,children:`<ScrollView>scrollable content</ScrollView>
`});function l(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.ScrollViewInteractive`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Keyboard support`}),`
`,(0,o.jsx)(t.p,{children:`When used for regular content, it should be possible for the user to user their keyboard to control the scroll position.`}),`
`,(0,o.jsxs)(t.p,{children:[`You can enable keyboard support with the `,(0,o.jsx)(t.code,{children:`interactive`}),` property.`]}),`
`,(0,o.jsx)(s,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default,c as t};