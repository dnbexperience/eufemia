import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-CBt1GSu6.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { TermDefinition } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`TermDefinition renders a compact, inline explanation for a word or phrase with an anchor-style trigger button.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/term-definition`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/term-definition`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsx)(t.p,{children:`To ensure that the TermDefinition component is accessible, it uses semantic HTML elements and appropriate ARIA attributes.`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`All content inside the TermDefinition can be selected when it is open.`}),`
`,(0,i.jsx)(t.li,{children:`Clicking anywhere outside the TermDefinition, or pressing Escape, closes it.`}),`
`,(0,i.jsxs)(t.li,{children:[`The trigger looks like an `,(0,i.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` but is actually a semantic button.`]}),`
`,(0,i.jsx)(t.li,{children:`It is fully focusable and works with keyboard navigation.`}),`
`,(0,i.jsx)(t.li,{children:`The trigger is aligned to the left side of the word for better readability (not centered).`}),`
`,(0,i.jsx)(t.li,{children:`Screen readers read the word (its children) first and then announce that the trigger can be activated to show more information.`}),`
`,(0,i.jsx)(t.li,{children:`When the TermDefinition opens, it receives focus and the screen reader announces its content.`}),`
`,(0,i.jsx)(t.li,{children:`When it closes, focus returns to the trigger so keyboard users keep their place in the document.`}),`
`,(0,i.jsx)(t.li,{children:`The close button is placed last in the tab order, making it easy for keyboard users to reach after reading the content.`}),`
`,(0,i.jsx)(t.li,{children:`It also closes automatically when focus moves outside the TermDefinition or when the Escape key is pressed.`}),`
`,(0,i.jsxs)(t.li,{children:[`The trigger shows the hover style of an `,(0,i.jsx)(t.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` when open.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Root Element (React Portal)`}),`
`,(0,i.jsxs)(t.p,{children:[`The TermDefinition component uses `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its explanation content. See the `,(0,i.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};