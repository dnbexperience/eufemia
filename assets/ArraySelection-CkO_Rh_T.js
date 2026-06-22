import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-G-r6IEau.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.ArraySelection />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.ArraySelection`}),` is a component for selecting between a fixed set of options using checkboxes or similar, that will produce a value in the form of an array containing the values of selected options.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Before using this component, ensure there is not a more specific `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Uses the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Option/`,children:`Field.Option`}),` pseudo-component to define options.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/ArraySelection`,children:`Value.ArraySelection`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.ArraySelection>
    <Field.Option />
    <Field.Option />
  </Field.ArraySelection>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use the `,(0,i.jsx)(t.code,{children:`dataPath`}),` property to provide the data to the component:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myDataPath: [
        { title: 'Foo!', value: 'foo' },
        { title: 'Bar!', value: 'bar' },
      ],
    }}
  >
    <Field.ArraySelection dataPath="/myDataPath" />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/ArraySelection`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/ArraySelection`,children:`Docs code`})}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};