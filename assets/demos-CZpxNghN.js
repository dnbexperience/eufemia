import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({Inline:()=>l,Placeholder:()=>c,PostalAddress:()=>o,StreetAddress:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Address.Postal value="Postboks 55 Falkum 3705 Skien" />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Address.Street value="Dronning Eufemias gate 30" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Address.Street placeholder="Custom placeholder" />
`}),l=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    streetAddress: 'Dronning Eufemias gate 30',
    postalAddress: 'Postboks 55 Falkum 3705 Skien',
  }}
>
  <P>
    This is before the component{' '}
    <Value.Address.Street path="/streetAddress" inline />{' '}
    <Value.Address.Postal path="/postalAddress" inline /> This is after the
    component
  </P>
</Form.Handler>
`});function u(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||f(`Examples`,!1),l||f(`Examples.Inline`,!0),c||f(`Examples.Placeholder`,!0),o||f(`Examples.PostalAddress`,!0),s||f(`Examples.StreetAddress`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Postal address`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Street address`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};