import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-C9trUfPT.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Appearance />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.Appearance`}),` is a provider for theming form fields.`]}),`
`,(0,i.jsxs)(t.p,{children:[`For now, it only provides theming of sizes for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/`,children:`base fields`}),` and all `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`feature fields`}),` that utilize them. See example below.`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can nest `,(0,i.jsx)(t.code,{children:`Form.Appearance`}),` to provide different themes for different parts of the form.`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Form.Appearance size="medium">
    <Field.String />
    <Form.Appearance size="large">
      <Field.String />
    </Form.Appearance>
  </Form.Appearance>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};