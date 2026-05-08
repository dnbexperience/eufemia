import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-C-_bLyqO.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Boolean />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Boolean`}),` is the base component for receiving user input where the target data is of type `,(0,r.jsx)(n.code,{children:`boolean`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Before using this component, ensure there is not a more specific `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Boolean`,children:`Value.Boolean`}),` component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Boolean path="/myState" />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Boolean`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Boolean`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Indeterminate checkbox`}),`
`,(0,r.jsxs)(n.p,{children:[`Here is an indeterminate state (partially checked) `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/Indeterminate/`,children:`working example`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Schema validation`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use a schema to validate the value with either `,(0,r.jsx)(n.code,{children:`const`}),` or `,(0,r.jsx)(n.code,{children:`enum`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using Zod schemas`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myField: z.literal(true), // or z.enum([true])
})

render(
  <Form.Handler schema={schema} data={{ myField: false }}>
    <Field.Boolean path="/myField" />
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import {
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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};