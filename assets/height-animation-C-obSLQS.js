import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BZxUH4Qw.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { HeightAnimation } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The HeightAnimation component calculates the height, and animates from `,(0,r.jsx)(n.code,{children:`auto`}),` to `,(0,r.jsx)(n.code,{children:`auto`}),` – or from `,(0,r.jsx)(n.code,{children:`0`}),` to `,(0,r.jsx)(n.code,{children:`auto`}),` in height – powered by CSS transition. It calculates the height on the fly.`]}),`
`,(0,r.jsxs)(n.p,{children:[`When the animation is done, it sets the element's height to `,(0,r.jsx)(n.code,{children:`auto`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`The component can be used as an opt-in replacement instead of vanilla HTML Elements.`}),`
`,(0,r.jsxs)(n.p,{children:[`The element animation is done with a CSS transition with `,(0,r.jsx)(n.code,{children:`400ms`}),` in duration.`]}),`
`,(0,r.jsx)(n.p,{children:`It also re-calculates and changes the height, when the given content changes.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/height-animation`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/height-animation`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Server-side rendering (SSR)`}),`
`,(0,r.jsxs)(n.p,{children:[`HeightAnimation is SSR-compatible. When `,(0,r.jsx)(n.code,{children:`open`}),` is `,(0,r.jsx)(n.code,{children:`true`}),` (the default), the component renders its content with the `,(0,r.jsx)(n.code,{children:`--is-visible`}),` class during server-side rendering so the initial HTML is correct without waiting for JavaScript.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Custom `,(0,r.jsx)(n.code,{children:`duration`}),` and `,(0,r.jsx)(n.code,{children:`delay`}),` props are applied after hydration via a DOM effect to avoid hydration mismatches caused by differences in how React serializes CSS custom properties on the server versus the client.`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsx)(n.p,{children:`It is important to never animate from 0 to e.g. 64px – because:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`The content may differ based on the viewport width (screen size)`}),`
`,(0,r.jsx)(n.li,{children:`The content itself may change`}),`
`,(0,r.jsxs)(n.li,{children:[`The user may have a larger `,(0,r.jsx)(n.code,{children:`font-size`})]}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};