import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-AxyBdh2D.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Composition />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Composition`}),` is a component for when you create a field block that contains of several existing fields. It uses `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` under the hood.`]}),`
`,(0,r.jsx)(n.p,{children:`The composition field serves the purpose of managing layout and status messages, with a strong focus on accessibility. More on that topic down below.`}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Composition`,children:`Value.Composition`}),` component that can be used for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/`,children:`value`}),` components.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Composition>
    <Field.String label="Field A" />
    <Field.String Label="Field B" />
  </Field.Composition>
)
`})}),`
`,(0,r.jsx)(n.p,{children:`When each field inside your composition is horizontally aligned for larger screens, they will wrap to a vertical layout for smaller screens.`}),`
`,(0,r.jsx)(n.p,{children:`If each of the fields have a label, the labels should ideally be top aligned. But when one of the labels contain more text than fits into one line, the fields will be bottom aligned.`}),`
`,(0,r.jsxs)(n.p,{children:[`In the demo section you find an `,(0,r.jsx)(n.a,{href:`#composition-field-with-error`,children:`example`}),` on how to handle form states.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Composition`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Composition`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Messages`}),`
`,(0,r.jsx)(n.p,{children:`Messages that appears to be the same, will be grouped together and announced as one message.`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also show an `,(0,r.jsx)(n.code,{children:`error`}),`, `,(0,r.jsx)(n.code,{children:`warning`}),` or `,(0,r.jsx)(n.code,{children:`info`}),` message at the same time.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Composition error="Shared error at the bottom">
    <Field.String />
    <Field.String />
  </Field.Composition>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`When using the `,(0,r.jsx)(n.code,{children:`error`}),`, `,(0,r.jsx)(n.code,{children:`warning`}),` or `,(0,r.jsx)(n.code,{children:`info`}),` property, the displayed `,(0,r.jsx)(n.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` components will be placed in the DOM before the content of the form elements itself.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Furthermore, the status messages are linked to the corresponding form elements using `,(0,r.jsx)(n.code,{children:`aria-describedby`}),` when `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/create-component/useFieldProps`,children:`useFieldProps`}),` is used in conjunction.`]}),`
`,(0,r.jsx)(n.p,{children:`This will allow screen readers to find and announce the error message properly.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};