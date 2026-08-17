import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-CGxQ8PRe.js";import r from"./demos-DsXDYdzU.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
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
`,(0,i.jsxs)(t.p,{children:[`Connect the control and animated content with `,(0,i.jsx)(t.code,{children:`aria-controls`}),`, and expose the current state with `,(0,i.jsx)(t.code,{children:`aria-expanded`}),`. HeightAnimation does not manage focus. Avoid closing content while focus is inside it, or move focus to a logical visible control first.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When `,(0,i.jsx)(t.code,{children:`keepInDOM`}),` or `,(0,i.jsx)(t.code,{children:`openOnFind`}),` keeps closed content in the DOM, HeightAnimation applies `,(0,i.jsx)(t.code,{children:`aria-hidden="true"`}),`. The collapsed content is therefore unavailable to assistive technologies until it opens.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`openOnFind`}),` uses the native `,(0,i.jsx)(t.code,{children:`hidden="until-found"`}),` behavior, making collapsed text available to browser find-in-page. HeightAnimation opens matching content internally, so `,(0,i.jsx)(t.code,{children:`onBeforeMatch`}),` is optional. When an external control owns the `,(0,i.jsx)(t.code,{children:`open`}),` state, handle `,(0,i.jsx)(t.code,{children:`onBeforeMatch`}),` by updating the same state passed to `,(0,i.jsx)(t.code,{children:`open`}),`. This keeps the control's `,(0,i.jsx)(t.code,{children:`aria-expanded`}),` value synchronized when the browser reveals a match.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`openOnFind`}),` depends on native browser support for `,(0,i.jsx)(t.code,{children:`hidden="until-found"`}),` (Chromium 102+, Firefox 148+, with partial support in Safari 26.2+). In browsers without support, the collapsed content is `,(0,i.jsx)(t.strong,{children:`not reliably hidden`}),` and can remain visible, because the collapse relies on the browser applying `,(0,i.jsx)(t.code,{children:`content-visibility`}),` for `,(0,i.jsx)(t.code,{children:`hidden="until-found"`}),`. For content that must stay hidden in those browsers, use `,(0,i.jsx)(t.code,{children:`keepInDOM`}),` (or leave `,(0,i.jsx)(t.code,{children:`openOnFind`}),` off) instead.`]}),`
`,(0,i.jsx)(t.p,{children:`Users who prefer reduced motion receive an effectively immediate transition. It is important to never animate to a fixed height such as 64px, because:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`The content may differ based on the viewport width (screen size)`}),`
`,(0,i.jsx)(t.li,{children:`The content itself may change`}),`
`,(0,i.jsxs)(t.li,{children:[`The user may have a larger `,(0,i.jsx)(t.code,{children:`font-size`})]}),`
`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};