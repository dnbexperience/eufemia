import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>d,Label:()=>c,LabelAndValue:()=>l,Pattern:()=>m,Placeholder:()=>s,ValidationRequired:()=>p,WithError:()=>f,WithHelp:()=>u}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.Password
  placeholder="Please enter your password"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.Password
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.Password
  label="Label text"
  value="password123"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.Password
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.Password
  value="password123"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  disabled
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.Password
  value="your-birthday"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  error={new Error('This is what is wrong...')}
/>
`}),p=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Password
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  required
  validateInitially
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`Pattern`,children:`<Field.Password
  value="password123"
  pattern="\\w{8}[0-9]{2}"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  required
/>
`});function h(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||_(`Examples`,!1),d||_(`Examples.Disabled`,!0),c||_(`Examples.Label`,!0),l||_(`Examples.LabelAndValue`,!0),m||_(`Examples.Pattern`,!0),s||_(`Examples.Placeholder`,!0),p||_(`Examples.ValidationRequired`,!0),f||_(`Examples.WithError`,!0),u||_(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Pattern`}),`
`,(0,o.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};