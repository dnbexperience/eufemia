import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Inline:()=>u,Placeholder:()=>l,PostalAddress:()=>s,StreetAddress:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`PostalAddress`,children:`<Value.Address.Postal value="Postboks 55 Falkum 3705 Skien" />
`}),c=()=>(0,o.jsx)(r,{stableName:`StreetAddress`,children:`<Value.Address.Street value="Dronning Eufemias gate 30" />
`}),l=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.Address.Street placeholder="Custom placeholder" />
`}),u=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<Form.Handler
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
`});function d(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||p(`Examples`,!1),u||p(`Examples.Inline`,!0),l||p(`Examples.Placeholder`,!0),s||p(`Examples.PostalAddress`,!0),c||p(`Examples.StreetAddress`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Postal address`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Street address`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};