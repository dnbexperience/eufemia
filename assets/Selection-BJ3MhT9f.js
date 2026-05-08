import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-qi3EIgnD.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Selection />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Selection`}),` is a component for selecting between options using a dropdown or similar user experiences.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Before using this component, ensure there is not a more specific `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Uses the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/Option/`,children:`Field.Option`}),` pseudo-component to define options.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Selection`,children:`Value.Selection`}),` component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Selection placeholder="Select something...">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use the `,(0,r.jsx)(n.code,{children:`dataPath`}),` property to provide the data to the component:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    data={{
      myDataPath: [
        { title: 'Foo!', value: 'foo' },
        { title: 'Bar!', value: 'bar' },
      ],
    }}
  >
    <Field.Selection dataPath="/myDataPath" />
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Selection`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Selection`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`About the Autocomplete variant`}),`
`,(0,r.jsxs)(n.p,{children:[`The autocomplete variant (`,(0,r.jsx)(n.code,{children:`variant="autocomplete"`}),`) is a special easy drop-in version – basically as a replacement for the Dropdown variant, but with a search capability.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.a,{href:`/uilib/components/autocomplete/`,children:`Autocomplete`}),` by itself can be customized and used in various ways. If you need more control, you can use the `,(0,r.jsx)(n.code,{children:`autocompleteProps`}),` property to forward any additional properties (camelCase) to the `,(0,r.jsx)(n.a,{href:`/uilib/components/autocomplete/`,children:`Autocomplete`}),` component.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};