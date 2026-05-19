import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";import{s as a}from"./Examples-CXhguzzY.js";var o=t({Disabled:()=>p,Empty:()=>c,InvalidSyntax:()=>m,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>l,ValidationRequired:()=>g,WithAsyncOnBlurValidator:()=>_,WithError:()=>h,WithHelp:()=>f}),s=e(n()),c=()=>(0,s.jsx)(r,{stableName:`Empty`,children:`<Field.Email onChange={(value) => console.log('onChange', value)} />
`}),l=()=>(0,s.jsx)(r,{stableName:`Placeholder`,children:`<Field.Email
  placeholder="Enter email address..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,s.jsx)(r,{stableName:`Label`,children:`<Field.Email
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.Email
  label="Label text"
  value="my-m@il.com"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,s.jsx)(r,{stableName:`WithHelp`,children:`<Field.Email
  label="Label text"
  value="my-m@il.com"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,s.jsx)(r,{stableName:`Disabled`,children:`<Field.Email
  value="my-m@il.com"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),m=()=>(0,s.jsx)(r,{stableName:`InvalidSyntax`,children:`<Field.Email
  value="Not a mail"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
/>
`}),h=()=>(0,s.jsx)(r,{stableName:`WithError`,children:`<Field.Email
  value="foo@bar.com"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,s.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.Email
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),_=()=>(0,s.jsx)(r,{scope:{createRequest:a},stableName:`WithAsyncOnBlurValidator`,noInline:!0,children:`async function mockAsyncValidator(value) {
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
`});function v(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return o||b(`Examples`,!1),p||b(`Examples.Disabled`,!0),c||b(`Examples.Empty`,!0),m||b(`Examples.InvalidSyntax`,!0),u||b(`Examples.Label`,!0),d||b(`Examples.LabelAndValue`,!0),l||b(`Examples.Placeholder`,!0),g||b(`Examples.ValidationRequired`,!0),_||b(`Examples.WithAsyncOnBlurValidator`,!0),h||b(`Examples.WithError`,!0),f||b(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Invalid syntax`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Error message`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Asynchronous on blur validator`}),`
`,(0,s.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};