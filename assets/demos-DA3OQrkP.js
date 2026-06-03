import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{f as r}from"./Anchor-ywdvt45E.js";import{t as i}from"./P-DtVKLSL-.js";import{W as a}from"./index-BCXtuv-b.js";import{t as o}from"./ComponentBox-B2X8809Z.js";var s=e({PortalRootExample:()=>l}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`PortalRootExample`,sourceImports:[`import { P, PortalRoot } from '@dnb/eufemia'`],__buildScope:{PortalRoot:r,P:i},children:`
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

`});function u(e){let t={h2:`h2`,...a(),...e.components};return s||f(`Examples`,!1),l||f(`Examples.PortalRootExample`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};