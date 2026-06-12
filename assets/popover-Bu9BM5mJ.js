import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-CeZfcjkD.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Popover } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` For internal use only.`]}),`
`,(0,i.jsx)(t.p,{children:`Popover renders its own floating surface anchored to a trigger element.`}),`
`,(0,i.jsxs)(t.p,{children:[`It is used in the `,(0,i.jsx)(t.a,{href:`/uilib/components/tooltip`,children:`Tooltip`}),` and `,(0,i.jsx)(t.a,{href:`/uilib/components/date-picker`,children:`DatePicker`}),` component, but can also be used directly when you need a more flexible trigger or richer content.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/popover`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/popover`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Focus moves into the popover body once it opens (similar to TermDefinition), and it returns to the trigger when the popover closes.`}),`
`,(0,i.jsx)(t.li,{children:`The Popover does by default change its alignment initially, but not reposition itself during user scroll when opened, as this could be disorienting and confusing for users.`}),`
`,(0,i.jsxs)(t.li,{children:[`When you render a trigger via the provided render props, it receives ARIA attributes such as `,(0,i.jsx)(t.code,{children:`aria-controls`}),`, `,(0,i.jsx)(t.code,{children:`aria-expanded`}),`, and `,(0,i.jsx)(t.code,{children:`aria-describedby`}),` alongside keyboard handlers.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Set `,(0,i.jsx)(t.code,{children:`hideCloseButton`}),` if you want to remove the built-in close button and handle dismissal yourself (use the provided `,(0,i.jsx)(t.code,{children:`close`}),` helper when rendering custom content).`]}),`
`,(0,i.jsx)(t.li,{children:`Focus moves inside the popover content when it opens and returns to the trigger when it closes.`}),`
`,(0,i.jsx)(t.li,{children:`The popover can be dismissed with Escape, by clicking outside, or by using the close button.`}),`
`,(0,i.jsxs)(t.li,{children:[`Custom triggers receive the necessary ARIA attributes (`,(0,i.jsx)(t.code,{children:`aria-controls`}),`, `,(0,i.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,i.jsx)(t.code,{children:`aria-describedby`}),`) and keyboard handlers so long as you spread the provided props.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Root Element (React Portal)`}),`
`,(0,i.jsxs)(t.p,{children:[`The Popover component uses `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its content. See the `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM, and for the `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root/#browsertranslate-helper`,children:`BrowserTranslate helper`}),` when browser translation tools such as Google Translate should not modify content rendered through PortalRoot.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};