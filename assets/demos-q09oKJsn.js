import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({BasicErrorMessage:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`});function s(e){let t={h2:`h2`,...r(),...e.components};return i||l(`Examples`,!1),o||l(`Examples.BasicErrorMessage`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};