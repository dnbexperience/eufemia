import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-DAm6eE5w.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Appearance />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.Appearance`}),` is a provider for theming form fields.`]}),`
`,(0,r.jsxs)(n.p,{children:[`For now, it only provides theming of sizes for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/`,children:`base fields`}),` and all `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`feature fields`}),` that utilize them. See example below.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can nest `,(0,r.jsx)(n.code,{children:`Form.Appearance`}),` to provide different themes for different parts of the form.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`BETA:`}),` The sizes are not 100% finalised and may change to be officially approved by UX through an RFC.`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Appearance size="medium">
    <Field.String />
    <Form.Appearance size="large">
      <Field.String />
    </Form.Appearance>
  </Form.Appearance>
)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};