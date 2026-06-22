import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{B as r}from"./index-DdG6L_K8.js";import{a as i,l as a}from"./Examples-G9-xavJ_.js";var o=e({default:()=>l}),s=t(n());function c(e){let t={code:`code`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...r(),...e.components};return i||u(`Examples`,!1),a||u(`Examples.QuickStart`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Quick start`}),`
`,(0,s.jsxs)(t.p,{children:[`Here's how you import the components from within scopes, such as `,(0,s.jsx)(t.code,{children:`Form`}),` and `,(0,s.jsx)(t.code,{children:`Field`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Field components can be used directly as they are, for example `,(0,s.jsx)(t.code,{children:`Field.Email`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Email />)
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`NB:`}),` In the above example, only the email field will be a part of your application bundle. Unused code will be tree-shaken away.`]}),`
`,(0,s.jsxs)(t.p,{children:[`And here is how you can use the `,(0,s.jsx)(t.code,{children:`Form`}),` component:`]}),`
`,(0,s.jsx)(a,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{o as n,l as t};