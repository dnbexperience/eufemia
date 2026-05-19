import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({BasicErrorMessage:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`BasicErrorMessage`,children:`<Form.Handler
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
`});function c(e){let t={h2:`h2`,...i(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.BasicErrorMessage`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};