import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Form-CCz-rEVh.js";import{t as i}from"./Field-B1tS3XXm.js";import{Rr as a}from"./index-mmuoVhax.js";import{t as o}from"./ComponentBox-XDAvsf_r.js";var s=t({BasicErrorMessage:()=>l}),c=e(n()),l=()=>(0,c.jsx)(o,{stableName:`BasicErrorMessage`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Field:i},children:`<Form.Handler
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