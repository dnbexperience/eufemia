import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>p,EmptyPostal:()=>s,EmptyStreet:()=>c,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>l,ValidationRequired:()=>h,WithError:()=>m,WithHelp:()=>f}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`EmptyPostal`,children:`<Field.Address.Postal
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`EmptyStreet`,children:`<Field.Address.Street
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.Address.Postal
  placeholder="Enter address..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.Address.Postal
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.Address.Postal
  label="Label text"
  value="Dronning Eufemias gate 30"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.Address.Postal
  label="Label text"
  value="Dronning Eufemias gate 30"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.Address.Postal
  value="Dronning Eufemias gate 30"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.Address.Postal
  value="Dronning Eufemias gate X"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Address.Postal
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`});function g(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||v(`Examples`,!1),p||v(`Examples.Disabled`,!0),s||v(`Examples.EmptyPostal`,!0),c||v(`Examples.EmptyStreet`,!0),u||v(`Examples.Label`,!0),d||v(`Examples.LabelAndValue`,!0),l||v(`Examples.Placeholder`,!0),h||v(`Examples.ValidationRequired`,!0),m||v(`Examples.WithError`,!0),f||v(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Postal address`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Street address`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Error message`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};