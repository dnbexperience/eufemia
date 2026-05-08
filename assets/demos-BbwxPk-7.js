import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";import{s as i}from"./Examples-GWYUMrzR.js";var a=e({Disabled:()=>f,Empty:()=>s,InvalidSyntax:()=>p,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>c,ValidationRequired:()=>h,WithAsyncOnBlurValidator:()=>g,WithError:()=>m,WithHelp:()=>d}),o=t(),s=()=>(0,o.jsx)(n,{children:`<Field.Email onChange={(value) => console.log('onChange', value)} />
`}),c=()=>(0,o.jsx)(n,{children:`<Field.Email
  placeholder="Enter email address..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,o.jsx)(n,{children:`<Field.Email
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(n,{children:`<Field.Email
  label="Label text"
  value="my-m@il.com"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(n,{children:`<Field.Email
  label="Label text"
  value="my-m@il.com"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,o.jsx)(n,{children:`<Field.Email
  value="my-m@il.com"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),p=()=>(0,o.jsx)(n,{children:`<Field.Email
  value="Not a mail"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
/>
`}),m=()=>(0,o.jsx)(n,{children:`<Field.Email
  value="foo@bar.com"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,o.jsx)(n,{children:`<Field.Email
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),g=()=>(0,o.jsx)(n,{scope:{createRequest:i},noInline:!0,children:`async function mockAsyncValidator(value) {
  const request = createRequest()
  console.log('making API request to validate:', value)
  await request(3000) // Simulate a request
  console.log('API request finished')

  // Randomly validates or invalidates
  const validation = Math.random() < 0.5
  console.log('API request finished and validated to:', validation)
  if (validation) {
    return Error('This email is not valid!')
  }
}
render(
  <Form.Handler>
    <Form.Card>
      <Field.Email
        value="foo@bar.com"
        onBlurValidator={mockAsyncValidator}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
`});function _(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return a||y(`Examples`,!1),f||y(`Examples.Disabled`,!0),s||y(`Examples.Empty`,!0),p||y(`Examples.InvalidSyntax`,!0),l||y(`Examples.Label`,!0),u||y(`Examples.LabelAndValue`,!0),c||y(`Examples.Placeholder`,!0),h||y(`Examples.ValidationRequired`,!0),g||y(`Examples.WithAsyncOnBlurValidator`,!0),m||y(`Examples.WithError`,!0),d||y(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Invalid syntax`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Error message`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Asynchronous on blur validator`}),`
`,(0,o.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};