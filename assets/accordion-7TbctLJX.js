import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-Cs37Ds05.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Accordion } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The Accordion component is a combination of an accessible button (header area) and a content container.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-722`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/accordion`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/accordion`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The Accordion follows the `,(0,r.jsx)(n.a,{href:`https://www.w3.org/WAI/ARIA/apg/patterns/accordion/`,children:`WAI-ARIA Accordion Pattern`}),`. The header uses a semantic button with `,(0,r.jsx)(n.code,{children:`aria-expanded`}),` to communicate the expanded/collapsed state. The content panel is associated with its header using `,(0,r.jsx)(n.code,{children:`aria-controls`}),` and `,(0,r.jsx)(n.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`The component is designed to let you compose different parts according to your technical needs.`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, the Accordion component animates user events, resulting in a final height of `,(0,r.jsx)(n.code,{children:`auto`}),`. This keeps the content responsive after the animation ends.`]}),`
`,(0,r.jsx)(n.h3,{children:`Accordion provider`}),`
`,(0,r.jsxs)(n.p,{children:[`Use the `,(0,r.jsx)(n.code,{children:`Accordion.Provider`}),` to pass accordion properties to all nested accordions.`]}),`
`,(0,r.jsx)(n.h3,{children:`Accordion groups`}),`
`,(0,r.jsxs)(n.p,{children:[`Both `,(0,r.jsx)(n.code,{children:`Accordion.Provider`}),` and `,(0,r.jsx)(n.code,{children:`Accordion.Group`}),` are available. They're technically the same, except that `,(0,r.jsx)(n.code,{children:`Accordion.Group`}),` automatically provides a unique `,(0,r.jsx)(n.code,{children:`group`}),` id, making all nested accordions work together and close each other when one opens.`]}),`
`,(0,r.jsx)(n.h4,{children:`Unexpected behavior`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Note:`}),` Please avoid using a group when possible, as it creates unexpected behavior from an accessibility perspective. When a user interacts with one accordion, it triggers an action elsewhere, outside the current context—something users may not expect. It's an automated, out-of-context UI execution.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};