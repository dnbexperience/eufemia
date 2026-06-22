import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-COVBA4wX.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Composition />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Composition`}),` is a component for when you create a field block that contains of several existing fields. It uses `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock/`,children:`FieldBlock`}),` under the hood.`]}),`
`,(0,i.jsx)(t.p,{children:`The composition field serves the purpose of managing layout and status messages, with a strong focus on accessibility. More on that topic down below.`}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Composition`,children:`Value.Composition`}),` component that can be used for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/`,children:`value`}),` components.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Composition>
    <Field.String label="Field A" />
    <Field.String Label="Field B" />
  </Field.Composition>
)
`})}),`
`,(0,i.jsx)(t.p,{children:`When each field inside your composition is horizontally aligned for larger screens, they will wrap to a vertical layout for smaller screens.`}),`
`,(0,i.jsx)(t.p,{children:`If each of the fields have a label, the labels should ideally be top aligned. But when one of the labels contain more text than fits into one line, the fields will be bottom aligned.`}),`
`,(0,i.jsxs)(t.p,{children:[`In the demo section you find an `,(0,i.jsx)(t.a,{href:`#composition-field-with-error`,children:`example`}),` on how to handle form states.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Composition`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Composition`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Messages`}),`
`,(0,i.jsx)(t.p,{children:`Messages that appears to be the same, will be grouped together and announced as one message.`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also show an `,(0,i.jsx)(t.code,{children:`error`}),`, `,(0,i.jsx)(t.code,{children:`warning`}),` or `,(0,i.jsx)(t.code,{children:`info`}),` message at the same time.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(
  <Field.Composition error="Shared error at the bottom">
    <Field.String />
    <Field.String />
  </Field.Composition>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`When using the `,(0,i.jsx)(t.code,{children:`error`}),`, `,(0,i.jsx)(t.code,{children:`warning`}),` or `,(0,i.jsx)(t.code,{children:`info`}),` property, the displayed `,(0,i.jsx)(t.a,{href:`/uilib/components/form-status`,children:`FormStatus`}),` components will be placed in the DOM before the content of the form elements itself.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Furthermore, the status messages are linked to the corresponding form elements using `,(0,i.jsx)(t.code,{children:`aria-describedby`}),` when `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps`,children:`useFieldProps`}),` is used in conjunction.`]}),`
`,(0,i.jsx)(t.p,{children:`This will allow screen readers to find and announce the error message properly.`})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};