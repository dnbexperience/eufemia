import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-DRoVKfkH.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useValidation
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Form.useValidation`}),` lets you monitor and modify field status or your form errors outside of the context.`]}),`
`,(0,r.jsx)(n.h2,{children:`APIs`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`hasErrors(): boolean`}),` - True if any error is present.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`hasFieldError(path: Path): boolean`}),` - True if the field has an error.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`setFormError(error: Error | FormError | undefined)`}),` - Report a form error.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`setFieldStatus(path: Path, status: EventStateObject)`}),` - Show a field error.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`EventStateObject`}),` is an object that can hold any of the following properties:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`type EventStateObject = {
  error?: Error | FormError | undefined
  warning?: React.ReactNode | undefined
  info?: React.ReactNode | undefined
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use it in several ways. Like within the context of `,(0,r.jsx)(n.code,{children:`Form.Handler`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      ...
      <Component />
      ...
    </Form.Handler>
  )
}

function Component() {
  const { hasErrors, hasFieldError, setFormError, setFieldStatus } =
    Form.useValidation()

  // True if any error is present
  hasErrors()

  // True if the field has an error
  hasFieldError('/path/to/field')

  // Report a form error
  setFormError(new Error('This is a global form error'))

  // Clear the form error with a undefined value
  setFormError(undefined)

  // Show a field error
  setFieldStatus('/path/to/field', {
    error: new Error('This is a field error'),
    warning: 'This is a field warning',
    info: 'This is a field info',
  })
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`Or by linking the hook together with the form by using the `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference) property:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  return (
    <>
      <Form.Handler id={myFormId}>...</Form.Handler>
      <Component />
    </>
  )
}

function Component() {
  const { hasErrors, hasFieldError } = Form.useValidation(myFormId)
}
`})}),`
`,(0,r.jsx)(n.p,{children:`Or by using it in the form component itself:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const { hasErrors } = Form.useValidation(myFormId)

  return <Form.Handler id={myFormId}>...</Form.Handler>
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Report a form error`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also report a form error that gets displayed on the bottom of the form by using the `,(0,r.jsx)(n.code,{children:`Form.useValidation`}),` hook:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function MyForm() {
  const { setFormError } = Form.useValidation(myFormId)

  useEffect(() => {
    setFormError('This is a global form error')
  }, [])

  return <Form.Handler id={myFormId}>...</Form.Handler>
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Field status`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use the `,(0,r.jsx)(n.code,{children:`setFieldStatus`}),` method to report field status. This will update the field with the status and show it in the form.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

const myFormId = 'unique-id' // or a function, object or React Context reference

function Component() {
  const { setFieldStatus } = Form.useValidation(myFormId)

  return (
    <Form.Handler
      id={myFormId}
      onSubmit={async () => {
        // Report a field status
        setFieldStatus('/path/to/field', {
          error: new Error('This is a field error'),
          warning: 'This is a field warning',
          info: 'This is a field info',
        })
      }}
    >
      <Field.String path="/path/to/field" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`To remove the field status, you can use `,(0,r.jsx)(n.code,{children:`setFieldStatus('/path/to/field', { error: undefined })`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The form error is connected with the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` itself via `,(0,r.jsx)(n.code,{children:`aria-labelledby`}),` for screen reader support.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};