import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r}from"./forms-CFi5-4x5.js";import{U as i}from"./index-kfZVC31v.js";import{t as a}from"./ComponentBox-qLaLt9T0.js";var o=e({Disabled:()=>f,Label:()=>l,LabelAndValue:()=>u,Pattern:()=>h,Placeholder:()=>c,ValidationRequired:()=>m,WithError:()=>p,WithHelp:()=>d}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`Placeholder`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  placeholder="Please enter your password"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),l=()=>(0,s.jsx)(a,{stableName:`Label`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),u=()=>(0,s.jsx)(a,{stableName:`LabelAndValue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  label="Label text"
  value="password123"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),d=()=>(0,s.jsx)(a,{stableName:`WithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
/>
`}),f=()=>(0,s.jsx)(a,{stableName:`Disabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  value="password123"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  disabled
/>
`}),p=()=>(0,s.jsx)(a,{stableName:`WithError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  value="your-birthday"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,s.jsx)(a,{stableName:`ValidationRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  required
  validateInitially
/>
`}),h=()=>(0,s.jsx)(a,{stableName:`Pattern`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:r},children:`<Field.Password
  value="password123"
  pattern="\\w{8}[0-9]{2}"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  required
/>
`});function g(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return o||v(`Examples`,!1),f||v(`Examples.Disabled`,!0),l||v(`Examples.Label`,!0),u||v(`Examples.LabelAndValue`,!0),h||v(`Examples.Pattern`,!0),c||v(`Examples.Placeholder`,!0),m||v(`Examples.ValidationRequired`,!0),p||v(`Examples.WithError`,!0),d||v(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Error`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Pattern`}),`
`,(0,s.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};