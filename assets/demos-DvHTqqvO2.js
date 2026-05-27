import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-M3YCnXL2.js";import{t as i}from"./Form-CCz-rEVh.js";import{t as a}from"./Field-B1tS3XXm.js";import{Rr as o,un as s,wr as c}from"./index-mmuoVhax.js";import{t as l}from"./ComponentBox-XDAvsf_r.js";var u=t({AsyncSubmit:()=>p,SubmitOutsideForm:()=>f}),d=e(n());function f(){return(0,d.jsx)(l,{stableName:`SubmitOutsideForm`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Button:c,Flex:s,Card:r,Field:a},noInline:!0,children:`const formId = 'my-form'
const ExternalSubmitButton = () => {
  const { submit } = Form.useSubmit(formId)
  return (
    <Button onClick={() => submit()}>Submit (outside Form.Handler)</Button>
  )
}
render(
  <Flex.Stack>
    <Form.Handler
      id={formId}
      onSubmit={(data) => {
        console.log('Submitted:', data)
      }}
    >
      <Form.Card>
        <Field.Name.First path="/name" value="John" />
      </Form.Card>
    </Form.Handler>

    <ExternalSubmitButton />
  </Flex.Stack>
)
`})}function p(){return(0,d.jsx)(l,{stableName:`AsyncSubmit`,sourceImports:[`import { useState } from 'react'`,`import { Button, Flex } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Button:c,Flex:s,Card:r,Field:a},noInline:!0,children:`const formId = 'my-form-async'
const ExternalSubmitButton = () => {
  const { submit } = Form.useSubmit(formId)
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    try {
      const result = await submit()
      console.log('Submit result:', result)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading ? 'Submitting…' : 'Submit'}
    </Button>
  )
}
render(
  <Flex.Stack>
    <Form.Handler
      id={formId}
      onSubmit={async (data) => {
        await new Promise((r) => setTimeout(r, 1000))
        console.log('Submitted:', data)
      }}
    >
      <Form.Card>
        <Field.Name.First path="/name" value="John" />
      </Form.Card>
    </Form.Handler>
    <ExternalSubmitButton />
  </Flex.Stack>
)
`})}function m(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return u||g(`Examples`,!1),p||g(`Examples.AsyncSubmit`,!0),f||g(`Examples.SubmitOutsideForm`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Submit button outside the form`}),`
`,(0,d.jsxs)(t.p,{children:[`The submit button is rendered outside `,(0,d.jsx)(t.code,{children:`Form.Handler`}),` and uses `,(0,d.jsx)(t.code,{children:`Form.useSubmit()`}),` to trigger submit. Validation and `,(0,d.jsx)(t.code,{children:`onSubmit`}),` run as when using `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` inside the form.`]}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Async submit`}),`
`,(0,d.jsxs)(t.p,{children:[`The `,(0,d.jsx)(t.code,{children:`submit()`}),` function returns a Promise. You can await it to show loading state or react to the result or errors:`]}),`
`,(0,d.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};