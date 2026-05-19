import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({HasErrors:()=>s,SetFieldStatus:()=>c}),o=e(n());function s(){return(0,o.jsx)(r,{stableName:`HasErrors`,noInline:!0,children:`const Component = () => {
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
`})}function c(){return(0,o.jsx)(r,{stableName:`SetFieldStatus`,noInline:!0,children:`const MyForm = () => {
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
`})}function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.HasErrors`,!0),c||d(`Examples.SetFieldStatus`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Set field status`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Check for errors with hasErrors`}),`
`,(0,o.jsx)(s,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};