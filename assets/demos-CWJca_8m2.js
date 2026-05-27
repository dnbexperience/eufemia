import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Form-PES0Uozy.js";import{t as i}from"./Field-DrUGn0oz.js";import{t as a}from"./Tools-p1RXalAh.js";import{Rr as o,un as s}from"./index-BIrFyEEc.js";import{t as c}from"./ComponentBox-DFVIRw0w.js";var l=t({HasErrors:()=>d,SetFieldStatus:()=>f}),u=e(n());function d(){return(0,u.jsx)(c,{stableName:`HasErrors`,sourceImports:[`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:r,Flex:s,Tools:a,Field:i},noInline:!0,children:`const Component = () => {
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
`})}function f(){return(0,u.jsx)(c,{stableName:`SetFieldStatus`,sourceImports:[`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:r,Flex:s,Field:i},noInline:!0,children:`const MyForm = () => {
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
`})}function p(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return l||h(`Examples`,!1),d||h(`Examples.HasErrors`,!0),f||h(`Examples.SetFieldStatus`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Set field status`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Check for errors with hasErrors`}),`
`,(0,u.jsx)(d,{})]})}function m(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};