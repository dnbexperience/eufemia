import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({AsyncSubmit:()=>c,SubmitOutsideForm:()=>s});t();var o=n();function s(){return(0,o.jsx)(r,{noInline:!0,children:`const formId = 'my-form'
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
`})}function c(){return(0,o.jsx)(r,{noInline:!0,children:`const formId = 'my-form-async'
const ExternalSubmitButton = () => {
  const { submit } = Form.useSubmit(formId)
  const [loading, setLoading] = React.useState(false)
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
`})}function l(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||d(`Examples`,!1),c||d(`Examples.AsyncSubmit`,!0),s||d(`Examples.SubmitOutsideForm`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Submit button outside the form`}),`
`,(0,o.jsxs)(t.p,{children:[`The submit button is rendered outside `,(0,o.jsx)(t.code,{children:`Form.Handler`}),` and uses `,(0,o.jsx)(t.code,{children:`Form.useSubmit()`}),` to trigger submit. Validation and `,(0,o.jsx)(t.code,{children:`onSubmit`}),` run as when using `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` inside the form.`]}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Async submit`}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`submit()`}),` function returns a Promise. You can await it to show loading state or react to the result or errors:`]}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};