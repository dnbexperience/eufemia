import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Disabled:()=>f,EmptyPostal:()=>o,EmptyStreet:()=>s,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>c,ValidationRequired:()=>m,WithError:()=>p,WithHelp:()=>d}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.Address.Street
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  placeholder="Enter address..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  label="Label text"
  value="Dronning Eufemias gate 30"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  label="Label text"
  value="Dronning Eufemias gate 30"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  value="Dronning Eufemias gate 30"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  value="Dronning Eufemias gate X"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.Address.Postal
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`});function h(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||_(`Examples`,!1),f||_(`Examples.Disabled`,!0),o||_(`Examples.EmptyPostal`,!0),s||_(`Examples.EmptyStreet`,!0),l||_(`Examples.Label`,!0),u||_(`Examples.LabelAndValue`,!0),c||_(`Examples.Placeholder`,!0),m||_(`Examples.ValidationRequired`,!0),p||_(`Examples.WithError`,!0),d||_(`Examples.WithHelp`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Postal address`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Street address`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Error message`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};