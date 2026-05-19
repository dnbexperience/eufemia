import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({PortalRootExample:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`PortalRootExample`,children:`
<PortalRoot>
  <div
    style={{
      position: 'fixed',
      top: '16rem',
      right: '1rem',
      width: '8rem',
      height: '8rem',
      placeContent: 'center',
      textAlign: 'center',
      backgroundColor: 'red',
      zIndex: 4000,
    }}
  >
    <P>My content</P>
  </div>
</PortalRoot>
<P>Do you see the red box?</P>

`});function c(e){let t={h2:`h2`,...i(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.PortalRootExample`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};