import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,w as i}from"./forms-CFi5-4x5.js";import{U as a}from"./index-kfZVC31v.js";import{t as o}from"./ComponentBox-qLaLt9T0.js";var s=e({BasicErrorMessage:()=>l}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`BasicErrorMessage`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:r},children:`<Form.Handler
  errorMessages={{
    // Level 1
    'Field.errorPattern': 'Or on the provider',
    '/myKey': {
      // Level 2
      'Field.errorPattern': 'Or on the provider for just one field',
    },
  }}
>
  <Field.String
    errorMessages={{
      // Level 3
      'Field.errorPattern': 'Or on a single Field itself',
    }}
    path="/myKey"
    value="abc"
    pattern="^[0-9]+$"
    validateInitially
  />
</Form.Handler>
`});function u(e){let t={h2:`h2`,...a(),...e.components};return s||f(`Examples`,!1),l||f(`Examples.BasicErrorMessage`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};