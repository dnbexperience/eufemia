import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,w as i}from"./forms-CsJzlVUF.js";import{t as a}from"./Card-DP9KYSzC.js";import{B as o}from"./index-DdG6L_K8.js";import{t as s}from"./ComponentBox-q_23Ylzi.js";import{s as c}from"./Examples-C449PiCU.js";var l=e({Disabled:()=>g,Empty:()=>d,InvalidSyntax:()=>_,Label:()=>p,LabelAndValue:()=>m,Placeholder:()=>f,ValidationRequired:()=>y,WithAsyncOnBlurValidator:()=>b,WithError:()=>v,WithHelp:()=>h}),u=t(n()),d=()=>(0,u.jsx)(s,{stableName:`Empty`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email onChange={(value) => console.log('onChange', value)} />
`}),f=()=>(0,u.jsx)(s,{stableName:`Placeholder`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  placeholder="Enter email address..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,u.jsx)(s,{stableName:`Label`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,u.jsx)(s,{stableName:`LabelAndValue`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  label="Label text"
  value="my-m@il.com"
  onChange={(value) => console.log('onChange', value)}
/>
`}),h=()=>(0,u.jsx)(s,{stableName:`WithHelp`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  label="Label text"
  value="my-m@il.com"
  help={{
    title: 'Help is available',
    content:
      'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),g=()=>(0,u.jsx)(s,{stableName:`Disabled`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  value="my-m@il.com"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),_=()=>(0,u.jsx)(s,{stableName:`InvalidSyntax`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  value="Not a mail"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  validateInitially
/>
`}),v=()=>(0,u.jsx)(s,{stableName:`WithError`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  value="foo@bar.com"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),y=()=>(0,u.jsx)(s,{stableName:`ValidationRequired`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Field:r},children:`<Field.Email
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),b=()=>(0,u.jsx)(s,{scope:{createRequest:c},stableName:`WithAsyncOnBlurValidator`,sourceImports:[`import { Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { createRequest } from '../../Form/SubmitIndicator/Examples'`],__buildScope:{Form:i,Card:a,Field:r},noInline:!0,children:`async function mockAsyncValidator(value) {
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
`});function x(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return l||C(`Examples`,!1),g||C(`Examples.Disabled`,!0),d||C(`Examples.Empty`,!0),_||C(`Examples.InvalidSyntax`,!0),p||C(`Examples.Label`,!0),m||C(`Examples.LabelAndValue`,!0),f||C(`Examples.Placeholder`,!0),y||C(`Examples.ValidationRequired`,!0),b||C(`Examples.WithAsyncOnBlurValidator`,!0),v||C(`Examples.WithError`,!0),h||C(`Examples.WithHelp`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Empty`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Label`}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Label and value`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`With help`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Disabled`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`Invalid syntax`}),`
`,(0,u.jsx)(_,{}),`
`,(0,u.jsx)(t.h3,{children:`Error message`}),`
`,(0,u.jsx)(v,{}),`
`,(0,u.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,u.jsx)(y,{}),`
`,(0,u.jsx)(t.h3,{children:`Asynchronous on blur validator`}),`
`,(0,u.jsx)(b,{})]})}function S(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default};