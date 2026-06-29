import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r,{n as i,t as a}from"./demos-Dz44H8gy.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||l(`RelatedComponents`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { SkipContent } from '@dnb/eufemia'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`SkipContent`}),` gives users – using their keyboard for navigation – the option to skip over content that contains a large amount of interactive elements.`]}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4314-726`,children:`Figma`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/skip-content`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/skip-content`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`When is it desired?`})}),`
`,(0,o.jsx)(t.p,{children:`Typical when an action button, such as a save button, is placed below the content.`}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`What are interactive elements?`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Text links/anchors`}),`
`,(0,o.jsx)(t.li,{children:`Buttons`}),`
`,(0,o.jsx)(t.li,{children:`Inputs and other form elements`}),`
`,(0,o.jsx)(t.li,{children:`Basically, every focusable element`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`What is considered large content?`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Tables with interactive elements`}),`
`,(0,o.jsx)(t.li,{children:`Lists with interactive elements`}),`
`,(0,o.jsx)(t.li,{children:`Articles with interactive elements`}),`
`,(0,o.jsx)(t.li,{children:`Parts of a form`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`How does it work?`})}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[`An initially hidden button will reveal when the `,(0,o.jsx)(t.code,{children:`tab`}),` key is used.`]}),`
`,(0,o.jsx)(t.li,{children:`The user can then press this button or continue tabbing when desired.`}),`
`,(0,o.jsxs)(t.li,{children:[`When the user decides to continue using the `,(0,o.jsx)(t.code,{children:`tab`}),` key, the button will disappear again.`]}),`
`,(0,o.jsx)(t.li,{children:`When the button is pressed, the focus will be set to another defined HTML class selector and the browser will scroll to the element.`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Good description`})}),`
`,(0,o.jsx)(t.p,{children:`The revealing button needs a clear message to let the user easily understand the intention.`}),`
`,(0,o.jsx)(t.h3,{children:`Placement`}),`
`,(0,o.jsxs)(t.p,{children:[`Ensure you put a header or a section before the `,(0,o.jsx)(t.code,{children:`SkipContent`}),` component. It should describe the content, so the user understands the context.`]}),`
`,(0,o.jsxs)(t.h4,{children:[`Example with a section landmark (section) and header + `,(0,o.jsx)(t.code,{children:`SkipContent.Return`}),`:`]}),`
`,(0,o.jsx)(a,{}),`
`,(0,o.jsx)(t.h4,{children:`Example using a section landmark (section) and table caption:`}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsx)(t.h3,{children:`Return button`}),`
`,(0,o.jsxs)(t.p,{children:[`Optionally, you should consider including the `,(0,o.jsx)(t.code,{children:`SkipContent.Return`}),` utility as well. It lets the user jump back to where they came from (before the large content). This button is only focusable when the enter action via the skip button was performed.`]}),`
`,(0,o.jsx)(t.h3,{children:`Screen readers and landmarks`}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`SkipContent`}),` helper component is mainly dedicated to keyboard navigation.`]}),`
`,(0,o.jsxs)(t.p,{children:[`In order to let screen readers skip large parts of content, you need to ensure your HTML has `,(0,o.jsx)(t.a,{href:`/uilib/usage/accessibility/checklist/#landmark--and-semantics-example`,children:`logical landmarks and regions`}),`.`]}),`
`,(0,o.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(r,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};