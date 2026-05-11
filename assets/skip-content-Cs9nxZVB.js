import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n,{n as r,t as i}from"./demos-m6qS6RZ82.js";var a=e();function o(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:`Import`}),`
`,(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:`language-tsx`,children:`import { SkipContent } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(n.h2,{children:`Description`}),`
`,(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:`SkipContent`}),` gives users – using their keyboard for navigation – the option to skip over content that contains a large amount of interactive elements.`]}),`
`,(0,a.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-726`,children:`Figma`})}),`
`,(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/skip-content`,children:`Source code`})}),`
`,(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/skip-content`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:`When is it desired?`})}),`
`,(0,a.jsx)(n.p,{children:`Typical when an action button, such as a save button, is placed below the content.`}),`
`,(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:`What are interactive elements?`})}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsx)(n.li,{children:`Text links/anchors`}),`
`,(0,a.jsx)(n.li,{children:`Buttons`}),`
`,(0,a.jsx)(n.li,{children:`Inputs and other form elements`}),`
`,(0,a.jsx)(n.li,{children:`Basically, every focusable element`}),`
`]}),`
`,(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:`What is considered large content?`})}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsx)(n.li,{children:`Tables with interactive elements`}),`
`,(0,a.jsx)(n.li,{children:`Lists with interactive elements`}),`
`,(0,a.jsx)(n.li,{children:`Articles with interactive elements`}),`
`,(0,a.jsx)(n.li,{children:`Parts of a form`}),`
`]}),`
`,(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:`How does it work?`})}),`
`,(0,a.jsxs)(n.ol,{children:[`
`,(0,a.jsxs)(n.li,{children:[`An initially hidden button will reveal when the `,(0,a.jsx)(n.code,{children:`tab`}),` key is used.`]}),`
`,(0,a.jsx)(n.li,{children:`The user can then press this button or continue tabbing when desired.`}),`
`,(0,a.jsxs)(n.li,{children:[`When the user decides to continue using the `,(0,a.jsx)(n.code,{children:`tab`}),` key, the button will disappear again.`]}),`
`,(0,a.jsx)(n.li,{children:`When the button is pressed, the focus will be set to another defined HTML class selector and the browser will scroll to the element.`}),`
`]}),`
`,(0,a.jsx)(n.p,{children:(0,a.jsx)(n.strong,{children:`Good description`})}),`
`,(0,a.jsx)(n.p,{children:`The revealing button needs a clear message to let the user easily understand the intention.`}),`
`,(0,a.jsx)(n.h3,{children:`Placement`}),`
`,(0,a.jsxs)(n.p,{children:[`Ensure you put a header or a section before the `,(0,a.jsx)(n.code,{children:`SkipContent`}),` component. It should describe the content, so the user understands the context.`]}),`
`,(0,a.jsxs)(n.h4,{children:[`Example with a section landmark (section) and header + `,(0,a.jsx)(n.code,{children:`SkipContent.Return`}),`:`]}),`
`,(0,a.jsx)(i,{}),`
`,(0,a.jsx)(n.h4,{children:`Example using a section landmark (section) and table caption:`}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(n.h3,{children:`Return button`}),`
`,(0,a.jsxs)(n.p,{children:[`Optionally, you should consider including the `,(0,a.jsx)(n.code,{children:`SkipContent.Return`}),` utility as well. It lets the user jump back to where they came from (before the large content). This button is only focusable when the enter action via the skip button was performed.`]}),`
`,(0,a.jsx)(n.h3,{children:`Screen readers and landmarks`}),`
`,(0,a.jsxs)(n.p,{children:[`The `,(0,a.jsx)(n.code,{children:`SkipContent`}),` helper component is mainly dedicated to keyboard navigation.`]}),`
`,(0,a.jsxs)(n.p,{children:[`In order to let screen readers skip large parts of content, you need to ensure your HTML has `,(0,a.jsx)(n.a,{href:`/uilib/usage/accessibility/checklist/#landmark--and-semantics-example`,children:`logical landmarks and regions`}),`.`]})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(n,{})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};