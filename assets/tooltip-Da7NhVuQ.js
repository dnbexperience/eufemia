import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-C63FEZRT.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Tooltip } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The Tooltip component is primarily meant to enhance the UX for various and additional information.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=44531-1111`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/tooltip`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/tooltip`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Tooltip accessibility problems`}),`
`,(0,r.jsx)(n.p,{children:`Because tooltips are often triggered by hover actions, developers and UX designers need to find alternative ways to support access to that information.`}),`
`,(0,r.jsxs)(n.p,{children:[`The Tooltip component is integrated into components like `,(0,r.jsx)(n.a,{href:`/uilib/components/button`,children:`Button`}),`, which allows us to make tooltip information accessible to screen readers.`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`All content inside the Tooltip can be selected when it is open`}),`
`,(0,r.jsx)(n.li,{children:`When the mouse moves over the Tooltip content, the Tooltip remains open`}),`
`,(0,r.jsxs)(n.li,{children:[`Custom triggers receive the necessary ARIA attributes (`,(0,r.jsx)(n.code,{children:`aria-describedby`}),`) so assistive technologies can announce the tooltip content without hovering`]}),`
`]}),`
`,(0,r.jsx)(n.h4,{children:`Touch devices and keyboard support`}),`
`,(0,r.jsxs)(n.p,{children:[`To enhance accessibility for touch devices, we add `,(0,r.jsx)(n.code,{children:`tabindex="0"`}),` and a `,(0,r.jsx)(n.code,{children:`touchstart`}),` event handler.`]}),`
`,(0,r.jsx)(n.h2,{children:`Links (anchor) with target blank`}),`
`,(0,r.jsxs)(n.p,{children:[`The Eufemia `,(0,r.jsx)(n.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` and `,(0,r.jsx)(n.a,{href:`/uilib/components/button`,children:`Button`}),` components display a Tooltip when the URL target is set to `,(0,r.jsx)(n.code,{children:`_blank`}),` to improve accessibility by informing users that a new window will open (out of context).`]}),`
`,(0,r.jsx)(n.h2,{children:`Controlled open`}),`
`,(0,r.jsxs)(n.p,{children:[`When you pass the `,(0,r.jsx)(n.code,{children:`open`}),` property, the Tooltip becomes controlled:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`open={true}`}),`: The Tooltip stays visible and ignores DOM events (hover, focus, touch). It will not auto-hide on `,(0,r.jsx)(n.code,{children:`mouseleave`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`open={false}`}),`: The Tooltip stays hidden and ignores DOM events. It will not auto-show on `,(0,r.jsx)(n.code,{children:`mouseenter`}),` or focus.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`To use the built-in hover/focus/touch behavior, omit the `,(0,r.jsx)(n.code,{children:`open`}),` property and let the component manage visibility internally.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};