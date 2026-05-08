import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({AsyncSubmit:()=>s,SubmitOutsideForm:()=>o}),a=t();function o(){return(0,a.jsx)(n,{noInline:!0,children:`const formId = 'my-form'
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
`})}function s(){return(0,a.jsx)(n,{noInline:!0,children:`const formId = 'my-form-async'
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
`})}function c(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||u(`Examples`,!1),s||u(`Examples.AsyncSubmit`,!0),o||u(`Examples.SubmitOutsideForm`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Submit button outside the form`}),`
`,(0,a.jsxs)(t.p,{children:[`The submit button is rendered outside `,(0,a.jsx)(t.code,{children:`Form.Handler`}),` and uses `,(0,a.jsx)(t.code,{children:`Form.useSubmit()`}),` to trigger submit. Validation and `,(0,a.jsx)(t.code,{children:`onSubmit`}),` run as when using `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` inside the form.`]}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Async submit`}),`
`,(0,a.jsxs)(t.p,{children:[`The `,(0,a.jsx)(t.code,{children:`submit()`}),` function returns a Promise. You can await it to show loading state or react to the result or errors:`]}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};