import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BRtcAMzn2.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
// Use Form.useSubmit
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Form.useSubmit`}),` hook lets you trigger form submit from a component that is `,(0,r.jsx)(n.strong,{children:`outside`}),` `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. Give `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` an `,(0,r.jsx)(n.code,{children:`id`}),` and pass the same `,(0,r.jsx)(n.code,{children:`id`}),` to `,(0,r.jsx)(n.code,{children:`Form.useSubmit(id)`}),`. This is useful when the submit button is placed in a modal footer, drawer, toolbar, or another part of the layout.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The hook returns an object with a `,(0,r.jsx)(n.code,{children:`submit`}),` function. Calling `,(0,r.jsx)(n.code,{children:`submit()`}),` runs validation and, if valid, calls the form's `,(0,r.jsx)(n.code,{children:`onSubmit`}),` handler – the same flow as when using `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` inside the form.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Note:`}),` The hook must be used either inside a `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` or called with an `,(0,r.jsx)(n.code,{children:`id`}),` that matches a Form.Handler on the page. It throws if no handler with that `,(0,r.jsx)(n.code,{children:`id`}),` is found.`]}),`
`,(0,r.jsx)(n.h2,{children:`API`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`submit(): Promise<EventStateObject | undefined>`}),` – Triggers form submit (validation + `,(0,r.jsx)(n.code,{children:`onSubmit`}),`). Returns a Promise that resolves with the `,(0,r.jsx)(n.code,{children:`onSubmit`}),` result, or `,(0,r.jsx)(n.code,{children:`undefined`}),` if validation fails or `,(0,r.jsx)(n.code,{children:`onSubmit`}),` returns nothing.`]}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};