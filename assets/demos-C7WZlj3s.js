import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r}from"./forms-D54jfDKN.js";import{U as i}from"./index-BsJ3GLEw.js";import{t as a}from"./ComponentBox-sLMgHvLi.js";var o=e({Disabled:()=>m,EmptyPostal:()=>c,EmptyStreet:()=>l,Label:()=>d,LabelAndValue:()=>f,Placeholder:()=>u,ValidationRequired:()=>g,WithError:()=>h,WithHelp:()=>p}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`EmptyPostal`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,s.jsx)(a,{stableName:`EmptyStreet`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Street
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,s.jsx)(a,{stableName:`Placeholder`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  placeholder="Enter address..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(a,{stableName:`Label`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,s.jsx)(a,{stableName:`LabelAndValue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  label="Label text"
  value="Dronning Eufemias gate 30"
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,s.jsx)(a,{stableName:`WithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  label="Label text"
  value="Dronning Eufemias gate 30"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,s.jsx)(a,{stableName:`Disabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  value="Dronning Eufemias gate 30"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),h=()=>(0,s.jsx)(a,{stableName:`WithError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  value="Dronning Eufemias gate X"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,s.jsx)(a,{stableName:`ValidationRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Address.Postal
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`});function _(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return o||y(`Examples`,!1),m||y(`Examples.Disabled`,!0),c||y(`Examples.EmptyPostal`,!0),l||y(`Examples.EmptyStreet`,!0),d||y(`Examples.Label`,!0),f||y(`Examples.LabelAndValue`,!0),u||y(`Examples.Placeholder`,!0),g||y(`Examples.ValidationRequired`,!0),h||y(`Examples.WithError`,!0),p||y(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Postal address`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Street address`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Error message`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};