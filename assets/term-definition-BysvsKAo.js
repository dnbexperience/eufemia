import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-Oa9hVOnq.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { TermDefinition } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`TermDefinition renders a compact, inline explanation for a word or phrase with an anchor-style trigger button.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/term-definition`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/term-definition`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsx)(n.p,{children:`To ensure that the TermDefinition component is accessible, it uses semantic HTML elements and appropriate ARIA attributes.`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`All content inside the TermDefinition can be selected when it is open.`}),`
`,(0,r.jsx)(n.li,{children:`Clicking anywhere outside the TermDefinition, or pressing Escape, closes it.`}),`
`,(0,r.jsxs)(n.li,{children:[`The trigger looks like an `,(0,r.jsx)(n.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` but is actually a semantic button.`]}),`
`,(0,r.jsx)(n.li,{children:`It is fully focusable and works with keyboard navigation.`}),`
`,(0,r.jsx)(n.li,{children:`The trigger is aligned to the left side of the word for better readability (not centered).`}),`
`,(0,r.jsx)(n.li,{children:`Screen readers read the word (its children) first and then announce that the trigger can be activated to show more information.`}),`
`,(0,r.jsx)(n.li,{children:`When the TermDefinition opens, it receives focus and the screen reader announces its content.`}),`
`,(0,r.jsx)(n.li,{children:`When it closes, focus returns to the trigger so keyboard users keep their place in the document.`}),`
`,(0,r.jsx)(n.li,{children:`The close button is placed last in the tab order, making it easy for keyboard users to reach after reading the content.`}),`
`,(0,r.jsx)(n.li,{children:`It also closes automatically when focus moves outside the TermDefinition or when the Escape key is pressed.`}),`
`,(0,r.jsxs)(n.li,{children:[`The trigger shows the hover style of an `,(0,r.jsx)(n.a,{href:`/uilib/components/anchor`,children:`Anchor`}),` when open.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Root Element (React Portal)`}),`
`,(0,r.jsxs)(n.p,{children:[`The TermDefinition component uses `,(0,r.jsx)(n.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its explanation content. See the `,(0,r.jsx)(n.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};