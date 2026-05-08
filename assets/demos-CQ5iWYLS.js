import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({CompanyName:()=>c,Composition:()=>u,FirstName:()=>o,FormHandler:()=>d,InvalidSyntax:()=>p,LastName:()=>s,Placeholder:()=>l,ValidationRequired:()=>h,WithError:()=>m,WithHelp:()=>f}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.Name.First
  value="Nora"
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.Name.Last
  value="Mørk"
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.Name.Company
  value="DNB"
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.Name.Last
  placeholder="Custom placeholder"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.Composition width="large">
  <Field.Name.First
    value="Nora"
    onChange={(value) => console.log('onChange', value)}
  />
  <Field.Name.Last
    value="Mørk"
    onChange={(value) => console.log('onChange', value)}
  />
</Field.Composition>
`}),d=()=>(0,a.jsx)(n,{children:`<Form.Handler
  defaultData={{
    firstName: 'Nora',
    lastName: 'Mørk',
  }}
  onChange={(value) => console.log('onChange', value)}
>
  <Flex.Stack>
    <Field.Name.First path="/firstName" />
    <Field.Name.Last path="/lastName" />
  </Flex.Stack>
</Form.Handler>
`}),f=()=>(0,a.jsx)(n,{children:`<Field.Name.First
  value="Nora"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.Name.First
  value="Invalid @ syntax"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
/>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.Name.First
  value="Nora"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,a.jsx)(n,{children:`<Field.Name.First
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`});function g(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||v(`Examples`,!1),c||v(`Examples.CompanyName`,!0),u||v(`Examples.Composition`,!0),o||v(`Examples.FirstName`,!0),d||v(`Examples.FormHandler`,!0),p||v(`Examples.InvalidSyntax`,!0),s||v(`Examples.LastName`,!0),l||v(`Examples.Placeholder`,!0),h||v(`Examples.ValidationRequired`,!0),m||v(`Examples.WithError`,!0),f||v(`Examples.WithHelp`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`First name`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Last name`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Company name`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Field composition`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Data Context`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Invalid syntax`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Error message`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};