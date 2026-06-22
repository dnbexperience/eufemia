import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-BXMY0O5C.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Tooltip } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The Tooltip component is primarily meant to enhance the UX for various and additional information.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=44531-1111`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/tooltip`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/tooltip`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Tooltip accessibility problems`}),`
`,(0,i.jsx)(t.p,{children:`Because tooltips are often triggered by hover actions, developers and UX designers need to find alternative ways to support access to that information.`}),`
`,(0,i.jsxs)(t.p,{children:[`The Tooltip component is integrated into components like `,(0,i.jsx)(t.a,{href:`/uilib/components/button`,children:`Button`}),`, which allows us to make tooltip information accessible to screen readers.`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`All content inside the Tooltip can be selected when it is open`}),`
`,(0,i.jsx)(t.li,{children:`When the mouse moves over the Tooltip content, the Tooltip remains open`}),`
`,(0,i.jsxs)(t.li,{children:[`Custom triggers receive the necessary ARIA attributes (`,(0,i.jsx)(t.code,{children:`aria-describedby`}),`) so assistive technologies can announce the tooltip content without hovering`]}),`
`]}),`
`,(0,i.jsx)(t.h4,{children:`Touch devices and keyboard support`}),`
`,(0,i.jsxs)(t.p,{children:[`To enhance accessibility for touch devices, we add `,(0,i.jsx)(t.code,{children:`tabindex="0"`}),` and a `,(0,i.jsx)(t.code,{children:`touchstart`}),` event handler.`]}),`
`,(0,i.jsx)(t.h2,{children:`Links (anchor) with target blank`}),`
`,(0,i.jsxs)(t.p,{children:[`The Eufemia `,(0,i.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` and `,(0,i.jsx)(t.a,{href:`/uilib/components/button`,children:`Button`}),` components display a Tooltip when the URL target is set to `,(0,i.jsx)(t.code,{children:`_blank`}),` to improve accessibility by informing users that a new window will open (out of context).`]}),`
`,(0,i.jsx)(t.h2,{children:`Controlled open`}),`
`,(0,i.jsxs)(t.p,{children:[`When you pass the `,(0,i.jsx)(t.code,{children:`open`}),` property, the Tooltip becomes controlled:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`open={true}`}),`: The Tooltip stays visible and ignores DOM events (hover, focus, touch). It will not auto-hide on `,(0,i.jsx)(t.code,{children:`mouseleave`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`open={false}`}),`: The Tooltip stays hidden and ignores DOM events. It will not auto-show on `,(0,i.jsx)(t.code,{children:`mouseenter`}),` or focus.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`To use the built-in hover/focus/touch behavior, omit the `,(0,i.jsx)(t.code,{children:`open`}),` property and let the component manage visibility internally.`]}),`
`,(0,i.jsx)(t.h2,{children:`Root Element (React Portal)`}),`
`,(0,i.jsxs)(t.p,{children:[`The Tooltip component uses `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally through Popover to render its content. See the `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM, and for the `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root/#browsertranslate-helper-google-translate`,children:`BrowserTranslate helper`}),` when browser translation tools such as Google Translate should not modify content rendered through PortalRoot.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};