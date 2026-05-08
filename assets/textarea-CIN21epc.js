import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n,{n as r,t as i}from"./demos-DAfisonL.js";var a=e();function o(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return i||c(`Examples`,!1),r||c(`Examples.MaxLength`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h2,{children:`Import`}),`
`,(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:`language-tsx`,children:`import { Textarea } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(n.h2,{children:`Description`}),`
`,(0,a.jsx)(n.p,{children:`The Textarea component is a multi-line text input control with an unlimited number of characters.`}),`
`,(0,a.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(n.ul,{children:[`
`,(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=40922-2303`,children:`Figma`})}),`
`,(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/textarea`,children:`Source code`})}),`
`,(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/textarea`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(n.h3,{children:`Browser autofill styling`}),`
`,(0,a.jsxs)(n.p,{children:[`When users insert values using autofill in their browser, the browser applies its own background and text colors. However, in contrast to the `,(0,a.jsx)(n.a,{href:`/uilib/components/input/info`,children:`Input`}),` component, Eufemia overwrites the `,(0,a.jsx)(n.code,{children:`:autofill`}),` background color to avoid a visually inconsistent gap around the writing area when autofill is used.`]}),`
`,(0,a.jsx)(n.h3,{children:`Accessibility`}),`
`,(0,a.jsxs)(n.p,{children:[`Please avoid using the `,(0,a.jsx)(n.code,{children:`maxlength`}),` attribute whenever possible, as it is not accessible. Instead, use the `,(0,a.jsx)(n.code,{children:`characterCounter`}),` property.`]}),`
`,(0,a.jsx)(n.p,{children:`This way, the user gets visual feedback on the number of characters entered and the maximum number of characters allowed, and it will not limit the user in their workflow.`}),`
`,(0,a.jsxs)(n.p,{children:[`You can still set the requirement for your desired maximum number of characters by setting the `,(0,a.jsx)(n.code,{children:`maxLength`}),` property in `,(0,a.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Eufemia Forms`}),`.`]}),`
`,(0,a.jsx)(r,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function l(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(n,{})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}export{u as default};