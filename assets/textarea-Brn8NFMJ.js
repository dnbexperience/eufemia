import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r,{n as i,t as a}from"./demos-3iK4Ely2.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return a||l(`Examples`,!1),i||l(`Examples.MaxLength`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Textarea } from '@dnb/eufemia'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsx)(t.p,{children:`The Textarea component is a multi-line text input control with an unlimited number of characters.`}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=40922-2303`,children:`Figma`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/textarea`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/textarea`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h3,{children:`Browser autofill styling`}),`
`,(0,o.jsxs)(t.p,{children:[`When users insert values using autofill in their browser, the browser applies its own background and text colors. However, in contrast to the `,(0,o.jsx)(t.a,{href:`/uilib/components/input/info`,children:`Input`}),` component, Eufemia overwrites the `,(0,o.jsx)(t.code,{children:`:autofill`}),` background color to avoid a visually inconsistent gap around the writing area when autofill is used.`]}),`
`,(0,o.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,o.jsxs)(t.p,{children:[`Please avoid using the `,(0,o.jsx)(t.code,{children:`maxlength`}),` attribute whenever possible, as it is not accessible. Instead, use the `,(0,o.jsx)(t.code,{children:`characterCounter`}),` property.`]}),`
`,(0,o.jsx)(t.p,{children:`This way, the user gets visual feedback on the number of characters entered and the maximum number of characters allowed, and it will not limit the user in their workflow.`}),`
`,(0,o.jsxs)(t.p,{children:[`You can still set the requirement for your desired maximum number of characters by setting the `,(0,o.jsx)(t.code,{children:`maxLength`}),` property in `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Eufemia Forms`}),`.`]}),`
`,(0,o.jsx)(i,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(r,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};