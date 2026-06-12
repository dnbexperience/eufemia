import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-C_VS9AMX.js";import i from"./components-CGK3i1Vv.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`Form`}),` provides the main forms-helpers including data provider and event handling.`]}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

const existingData = {
  email: 'name@email.no',
}

function MyForm() {
  return (
    <Form.Handler
      defaultData={existingData}
      onSubmit={async (data) => {
        await makeRequest(data)
      }}
    >
      <Form.MainHeading>Heading</Form.MainHeading>
      <Form.Card>
        <Field.Email path="/email" />
      </Form.Card>

      <Form.ButtonRow>
        <Form.SubmitButton />
      </Form.ButtonRow>
    </Form.Handler>
  )
}
`})}),`
`,(0,a.jsxs)(t.p,{children:[(0,a.jsx)(t.code,{children:`defaultData`}),` is only used if no other data source is provided and will not update internal data if it changes after mount. Initializing fields with an empty value is optional; if you do, prefer the field's `,(0,a.jsx)(t.code,{children:`emptyValue`}),` (often `,(0,a.jsx)(t.code,{children:`undefined`}),`).`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form`,children:`Docs code`})}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsx)(i,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}export{l as default};