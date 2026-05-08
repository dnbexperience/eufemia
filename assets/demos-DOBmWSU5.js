import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({HasErrors:()=>o,SetFieldStatus:()=>s}),a=t();function o(){return(0,a.jsx)(n,{noInline:!0,children:`const Component = () => {
  const { data } = Form.useData('default-id', {
    showError: true,
    isVisible: true,
  })
  const { hasErrors, hasFieldError } = Form.useValidation('default-id')
  return (
    <Form.Handler id="default-id">
      <Flex.Stack>
        <Tools.Log
          data={hasErrors()}
          label="hasErrors:"
          breakout={false}
        />
        <Tools.Log
          data={hasFieldError('/foo')}
          label="hasFieldError:"
          breakout={false}
        />

        <Field.Boolean label="Error" variant="button" path="/showError" />

        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
        />

        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.String
            path="/foo"
            label="Label"
            value={data.showError ? 'error' : 'valid'}
            pattern="^valid$"
            validateInitially
          />
        </Form.Visibility>
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<Component />)
`})}function s(){return(0,a.jsx)(n,{noInline:!0,children:`const MyForm = () => {
  const { setFieldStatus } = Form.useValidation('form-status')
  return (
    <Form.Handler
      id="form-status"
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setFieldStatus('/myField', {
          error: new Error('This is a field error'),
          warning: 'This is a field warning',
          info: 'This is a field info',
        })
        await new Promise((resolve) => setTimeout(resolve, 5000))
        setFieldStatus('/myField', {
          error: null,
          warning: null,
          info: null,
        })
      }}
    >
      <Flex.Stack>
        <Field.String label="My field" path="/myField" />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
render(<MyForm />)
`})}function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.HasErrors`,!0),s||u(`Examples.SetFieldStatus`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Set field status`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Check for errors with hasErrors`}),`
`,(0,a.jsx)(o,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};