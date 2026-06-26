import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{t as r}from"./when-to-use-forms-DU7N38_J.js";import i,{n as a,t as o}from"./demos-dXrTMWie.js";var s=e(t());function c(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components},{RelatedComponents:i}=t;return o||u(`Examples`,!1),a||u(`Examples.MaxLength`,!0),i||u(`RelatedComponents`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Import`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Textarea } from '@dnb/eufemia'
`})}),`
`,(0,s.jsx)(t.h2,{children:`Description`}),`
`,(0,s.jsx)(t.p,{children:`The Textarea component is a multi-line text input control with an unlimited number of characters.`}),`
`,(0,s.jsx)(t.h2,{children:`When to use Textarea vs Eufemia Forms`}),`
`,(0,s.jsx)(r,{}),`
`,(0,s.jsxs)(t.p,{children:[`The Eufemia Forms equivalent of `,(0,s.jsx)(t.code,{children:`Textarea`}),` is `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Field.String`}),` with the `,(0,s.jsx)(t.code,{children:`multiline`}),` property.`]}),`
`,(0,s.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=40922-2303`,children:`Figma`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/textarea`,children:`Source code`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/textarea`,children:`Docs code`})}),`
`]}),`
`,(0,s.jsx)(t.h3,{children:`Browser autofill styling`}),`
`,(0,s.jsxs)(t.p,{children:[`When users insert values using autofill in their browser, the browser applies its own background and text colors. However, in contrast to the `,(0,s.jsx)(t.a,{href:`/uilib/components/input/info`,children:`Input`}),` component, Eufemia overwrites the `,(0,s.jsx)(t.code,{children:`:autofill`}),` background color to avoid a visually inconsistent gap around the writing area when autofill is used.`]}),`
`,(0,s.jsx)(t.h3,{children:`Accessibility`}),`
`,(0,s.jsxs)(t.p,{children:[`Please avoid using the `,(0,s.jsx)(t.code,{children:`maxlength`}),` attribute whenever possible, as it is not accessible. Instead, use the `,(0,s.jsx)(t.code,{children:`characterCounter`}),` property.`]}),`
`,(0,s.jsx)(t.p,{children:`This way, the user gets visual feedback on the number of characters entered and the maximum number of characters allowed, and it will not limit the user in their workflow.`}),`
`,(0,s.jsxs)(t.p,{children:[`You can still set the requirement for your desired maximum number of characters by setting the `,(0,s.jsx)(t.code,{children:`maxLength`}),` property in `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/`,children:`Eufemia Forms`}),`.`]}),`
`,(0,s.jsx)(a,{}),`
`,(0,s.jsx)(i,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function d(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{}),`
`,(0,s.jsx)(i,{})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}export{f as default};