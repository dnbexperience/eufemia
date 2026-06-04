import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-Cg0bG-ub.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,p:`p`,pre:`pre`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Provider />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Provider`}),` is a provider for forwarding fields properties, such as `,(0,i.jsx)(t.code,{children:`required`}),` or `,(0,i.jsx)(t.code,{children:`disabled`}),` to all nested field components.`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'
render(
  <Field.Provider required disabled>
    <Field.String />
  </Field.Provider>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`Keep in mind, you can also set `,(0,i.jsx)(t.code,{children:`required`}),` or `,(0,i.jsx)(t.code,{children:`disabled`}),` on the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`. And invert the logic via the `,(0,i.jsx)(t.code,{children:`Field.Provider`}),` by using `,(0,i.jsx)(t.code,{children:`required={false}`}),` or `,(0,i.jsx)(t.code,{children:`disabled={false}`}),`.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};