import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-BMi2PwcS.js";import{t as i}from"./Form-C8lTzZqR.js";import{t as a}from"./Field-neGd0eKd.js";import{t as o}from"./Tools-B6PN-yHu.js";import{K as s}from"./index-Bx3ttow-.js";import{t as c}from"./ComponentBox-CG7uqrFy.js";var l=e({HasErrors:()=>d,SetFieldStatus:()=>f}),u=t(n());function d(){return(0,u.jsx)(c,{stableName:`HasErrors`,sourceImports:[`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:i,Flex:r,Tools:o,Field:a},noInline:!0,children:`const Component = () => {
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
`})}function f(){return(0,u.jsx)(c,{stableName:`SetFieldStatus`,sourceImports:[`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`],__buildScope:{Form:i,Flex:r,Field:a},noInline:!0,children:`const MyForm = () => {
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
`})}function p(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return l||h(`Examples`,!1),d||h(`Examples.HasErrors`,!0),f||h(`Examples.SetFieldStatus`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Set field status`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Check for errors with hasErrors`}),`
`,(0,u.jsx)(d,{})]})}function m(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};