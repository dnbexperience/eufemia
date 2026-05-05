import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-BsaZdshJ.js";import r from"./components-AyhgtXVy.js";var i=e();function a(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{children:`Import`}),`
`,(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,i.jsx)(n.h2,{children:`Description`}),`
`,(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:`Form`}),` provides the main forms-helpers including data provider and event handling.`]}),`
`,(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:`defaultData`}),` is only used if no other data source is provided and will not update internal data if it changes after mount. Initializing fields with an empty value is optional; if you do, prefer the field's `,(0,i.jsx)(n.code,{children:`emptyValue`}),` (often `,(0,i.jsx)(n.code,{children:`undefined`}),`).`]}),`
`,(0,i.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(n.ul,{children:[`
`,(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form`,children:`Source code`})}),`
`,(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form`,children:`Docs code`})}),`
`]})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(n,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};