import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({Disabled:()=>u,Label:()=>s,LabelAndValue:()=>c,Pattern:()=>p,Placeholder:()=>o,ValidationRequired:()=>f,WithError:()=>d,WithHelp:()=>l}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.Password
  placeholder="Please enter your password"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.Password
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.Password
  label="Label text"
  value="password123"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.Password
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  help={{
    title: 'Help is available',
    content:
      'Helping others, encouraging others, are often acts of being kind that have more meaning that you may realize.',
  }}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.Password
  value="password123"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  disabled
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.Password
  value="your-birthday"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  error={new Error('This is what is wrong...')}
/>
`}),f=()=>(0,a.jsx)(n,{children:`<Field.Password
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  required
  validateInitially
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.Password
  value="password123"
  pattern="\\w{8}[0-9]{2}"
  onChange={(value) => console.log('onChange', value)}
  onHidePassword={(event) => console.log('onHidePassword', event)}
  onShowPassword={(event) => console.log('onShowPassword', event)}
  required
/>
`});function m(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||g(`Examples`,!1),u||g(`Examples.Disabled`,!0),s||g(`Examples.Label`,!0),c||g(`Examples.LabelAndValue`,!0),p||g(`Examples.Pattern`,!0),o||g(`Examples.Placeholder`,!0),f||g(`Examples.ValidationRequired`,!0),d||g(`Examples.WithError`,!0),l||g(`Examples.WithHelp`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Pattern`}),`
`,(0,a.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};