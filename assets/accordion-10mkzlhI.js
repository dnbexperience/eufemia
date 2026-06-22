import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-MhemsDdY.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Accordion } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The Accordion component is a combination of an accessible button (header area) and a content container.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-722`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/accordion`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/accordion`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`The Accordion follows the `,(0,i.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/accordion/`,children:`WAI-ARIA Accordion Pattern`}),`. The header uses a semantic button with `,(0,i.jsx)(t.code,{children:`aria-expanded`}),` to communicate the expanded/collapsed state. The content panel is associated with its header using `,(0,i.jsx)(t.code,{children:`aria-controls`}),` and `,(0,i.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`The component is designed to let you compose different parts according to your technical needs.`}),`
`,(0,i.jsxs)(t.p,{children:[`By default, the Accordion component animates user events, resulting in a final height of `,(0,i.jsx)(t.code,{children:`auto`}),`. This keeps the content responsive after the animation ends.`]}),`
`,(0,i.jsx)(t.h3,{children:`Accordion provider`}),`
`,(0,i.jsxs)(t.p,{children:[`Use the `,(0,i.jsx)(t.code,{children:`Accordion.Provider`}),` to pass accordion properties to all nested accordions.`]}),`
`,(0,i.jsx)(t.h3,{children:`Accordion groups`}),`
`,(0,i.jsxs)(t.p,{children:[`Both `,(0,i.jsx)(t.code,{children:`Accordion.Provider`}),` and `,(0,i.jsx)(t.code,{children:`Accordion.Group`}),` are available. They're technically the same, except that `,(0,i.jsx)(t.code,{children:`Accordion.Group`}),` automatically provides a unique `,(0,i.jsx)(t.code,{children:`group`}),` id, making all nested accordions work together and close each other when one opens.`]}),`
`,(0,i.jsx)(t.h4,{children:`Unexpected behavior`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Note:`}),` Please avoid using a group when possible, as it creates unexpected behavior from an accessibility perspective. When a user interacts with one accordion, it triggers an action elsewhere, outside the current context—something users may not expect. It's an automated, out-of-context UI execution.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};