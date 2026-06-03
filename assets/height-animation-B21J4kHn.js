import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-DWCF5ZJm.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { HeightAnimation } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The HeightAnimation component calculates the height, and animates from `,(0,i.jsx)(t.code,{children:`auto`}),` to `,(0,i.jsx)(t.code,{children:`auto`}),` – or from `,(0,i.jsx)(t.code,{children:`0`}),` to `,(0,i.jsx)(t.code,{children:`auto`}),` in height – powered by CSS transition. It calculates the height on the fly.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When the animation is done, it sets the element's height to `,(0,i.jsx)(t.code,{children:`auto`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`The component can be used as an opt-in replacement instead of vanilla HTML Elements.`}),`
`,(0,i.jsxs)(t.p,{children:[`The element animation is done with a CSS transition with `,(0,i.jsx)(t.code,{children:`400ms`}),` in duration.`]}),`
`,(0,i.jsx)(t.p,{children:`It also re-calculates and changes the height, when the given content changes.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/height-animation`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/height-animation`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Server-side rendering (SSR)`}),`
`,(0,i.jsxs)(t.p,{children:[`HeightAnimation is SSR-compatible. When `,(0,i.jsx)(t.code,{children:`open`}),` is `,(0,i.jsx)(t.code,{children:`true`}),` (the default), the component renders its content with the `,(0,i.jsx)(t.code,{children:`--is-visible`}),` class during server-side rendering so the initial HTML is correct without waiting for JavaScript.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Custom `,(0,i.jsx)(t.code,{children:`duration`}),` and `,(0,i.jsx)(t.code,{children:`delay`}),` props are applied after hydration via a DOM effect to avoid hydration mismatches caused by differences in how React serializes CSS custom properties on the server versus the client.`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsx)(t.p,{children:`It is important to never animate from 0 to e.g. 64px – because:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`The content may differ based on the viewport width (screen size)`}),`
`,(0,i.jsx)(t.li,{children:`The content itself may change`}),`
`,(0,i.jsxs)(t.li,{children:[`The user may have a larger `,(0,i.jsx)(t.code,{children:`font-size`})]}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};