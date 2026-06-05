import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-CTQ0hgiI.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useSubmit
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`Form.useSubmit`}),` hook lets you trigger form submit from a component that is `,(0,i.jsx)(t.strong,{children:`outside`}),` `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. Give `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` an `,(0,i.jsx)(t.code,{children:`id`}),` and pass the same `,(0,i.jsx)(t.code,{children:`id`}),` to `,(0,i.jsx)(t.code,{children:`Form.useSubmit(id)`}),`. This is useful when the submit button is placed in a modal footer, drawer, toolbar, or another part of the layout.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The hook returns an object with a `,(0,i.jsx)(t.code,{children:`submit`}),` function. Calling `,(0,i.jsx)(t.code,{children:`submit()`}),` runs validation and, if valid, calls the form's `,(0,i.jsx)(t.code,{children:`onSubmit`}),` handler – the same flow as when using `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` inside the form.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

const formId = 'my-form'

function ExternalSubmitButton() {
  const { submit } = Form.useSubmit(formId)
  return (
    <button type="button" onClick={() => submit()}>
      Submit
    </button>
  )
}

function MyForm() {
  return (
    <>
      <Form.Handler id={formId} onSubmit={handleSubmit}>
        <Field.Name.First path="/name" />
      </Form.Handler>
      <ExternalSubmitButton />
    </>
  )
}
`})}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Note:`}),` The hook must be used either inside a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` or called with an `,(0,i.jsx)(t.code,{children:`id`}),` that matches a Form.Handler on the page. It throws if no handler with that `,(0,i.jsx)(t.code,{children:`id`}),` is found.`]}),`
`,(0,i.jsx)(t.h2,{children:`API`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`submit(): Promise<EventStateObject | undefined>`}),` – Triggers form submit (validation + `,(0,i.jsx)(t.code,{children:`onSubmit`}),`). Returns a Promise that resolves with the `,(0,i.jsx)(t.code,{children:`onSubmit`}),` result, or `,(0,i.jsx)(t.code,{children:`undefined`}),` if validation fails or `,(0,i.jsx)(t.code,{children:`onSubmit`}),` returns nothing.`]}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};