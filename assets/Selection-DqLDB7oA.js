import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-CLt2e41v2.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Selection />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Selection`}),` is a component for selecting between options using a dropdown or similar user experiences.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Before using this component, ensure there is not a more specific `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Uses the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Option/`,children:`Field.Option`}),` pseudo-component to define options.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Selection`,children:`Value.Selection`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Selection placeholder="Select something...">
    <Field.Option value="foo" title="Foo!" />
    <Field.Option value="bar" title="Baar!" />
  </Field.Selection>
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
    <Field.Selection dataPath="/myDataPath" />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Selection`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Selection`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`About the Autocomplete variant`}),`
`,(0,i.jsxs)(t.p,{children:[`The autocomplete variant (`,(0,i.jsx)(t.code,{children:`variant="autocomplete"`}),`) is a special easy drop-in version – basically as a replacement for the Dropdown variant, but with a search capability.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.a,{href:`/uilib/components/autocomplete/`,children:`Autocomplete`}),` by itself can be customized and used in various ways. If you need more control, you can use the `,(0,i.jsx)(t.code,{children:`autocompleteProps`}),` property to forward any additional properties (camelCase) to the `,(0,i.jsx)(t.a,{href:`/uilib/components/autocomplete/`,children:`Autocomplete`}),` component.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};