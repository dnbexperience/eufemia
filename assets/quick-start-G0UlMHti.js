import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as n}from"./index--zEB_f_m.js";import{a as r,l as i}from"./Examples-B4zbN2Xf.js";var a=e({default:()=>c}),o=t();function s(e){let t={code:`code`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return r||l(`Examples`,!1),i||l(`Examples.QuickStart`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Quick start`}),`
`,(0,o.jsxs)(t.p,{children:[`Here's how you import the components from within scopes, such as `,(0,o.jsx)(t.code,{children:`Form`}),` and `,(0,o.jsx)(t.code,{children:`Field`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Field components can be used directly as they are, for example `,(0,o.jsx)(t.code,{children:`Field.Email`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Email />)
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`NB:`}),` In the above example, only the email field will be a part of your application bundle. Unused code will be tree-shaken away.`]}),`
`,(0,o.jsxs)(t.p,{children:[`And here is how you can use the `,(0,o.jsx)(t.code,{children:`Form`}),` component:`]}),`
`,(0,o.jsx)(i,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{a as n,c as t};