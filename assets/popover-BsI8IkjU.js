import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-xrT4wSNJ.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Popover } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` For internal use only.`]}),`
`,(0,r.jsx)(n.p,{children:`Popover renders its own floating surface anchored to a trigger element.`}),`
`,(0,r.jsxs)(n.p,{children:[`It is used in the `,(0,r.jsx)(n.a,{href:`/uilib/components/tooltip`,children:`Tooltip`}),` and `,(0,r.jsx)(n.a,{href:`/uilib/components/date-picker`,children:`DatePicker`}),` component, but can also be used directly when you need a more flexible trigger or richer content.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/popover`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/popover`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Focus moves into the popover body once it opens (similar to TermDefinition), and it returns to the trigger when the popover closes.`}),`
`,(0,r.jsx)(n.li,{children:`The Popover does by default change its alignment initially, but not reposition itself during user scroll when opened, as this could be disorienting and confusing for users.`}),`
`,(0,r.jsxs)(n.li,{children:[`When you render a trigger via the provided render props, it receives ARIA attributes such as `,(0,r.jsx)(n.code,{children:`aria-controls`}),`, `,(0,r.jsx)(n.code,{children:`aria-expanded`}),`, and `,(0,r.jsx)(n.code,{children:`aria-describedby`}),` alongside keyboard handlers.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Set `,(0,r.jsx)(n.code,{children:`hideCloseButton`}),` if you want to remove the built-in close button and handle dismissal yourself (use the provided `,(0,r.jsx)(n.code,{children:`close`}),` helper when rendering custom content).`]}),`
`,(0,r.jsx)(n.li,{children:`Focus moves inside the popover content when it opens and returns to the trigger when it closes.`}),`
`,(0,r.jsx)(n.li,{children:`The popover can be dismissed with Escape, by clicking outside, or by using the close button.`}),`
`,(0,r.jsxs)(n.li,{children:[`Custom triggers receive the necessary ARIA attributes (`,(0,r.jsx)(n.code,{children:`aria-controls`}),`, `,(0,r.jsx)(n.code,{children:`aria-expanded`}),`, `,(0,r.jsx)(n.code,{children:`aria-describedby`}),`) and keyboard handlers so long as you spread the provided props.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Root Element (React Portal)`}),`
`,(0,r.jsxs)(n.p,{children:[`The Popover component uses `,(0,r.jsx)(n.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its content. See the `,(0,r.jsx)(n.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};