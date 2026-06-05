import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-Bx3ttow-.js";import r from"./demos-DzTy23T7.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Boolean />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Boolean`}),` is the base component for receiving user input where the target data is of type `,(0,i.jsx)(t.code,{children:`boolean`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Before using this component, ensure there is not a more specific `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Boolean`,children:`Value.Boolean`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Boolean path="/myState" />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Boolean`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Boolean`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Indeterminate checkbox`}),`
`,(0,i.jsxs)(t.p,{children:[`Here is an indeterminate state (partially checked) `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate/`,children:`working example`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Schema validation`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use a schema to validate the value with either `,(0,i.jsx)(t.code,{children:`const`}),` or `,(0,i.jsx)(t.code,{children:`enum`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod schemas`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myField: z.literal(true), // or z.enum([true])
})

render(
  <Form.Handler schema={schema} data={{ myField: false }}>
    <Field.Boolean path="/myField" />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    myField: {
      type: 'boolean',
      const: true, // or enum: [true]
    },
  },
}

render(
  <Form.Handler
    schema={schema}
    ajvInstance={ajv}
    data={{ myField: false }}
  >
    <Field.Boolean path="/myField" />
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};