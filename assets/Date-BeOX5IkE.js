import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-7lMrtF5X.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Date />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Date`}),` is a wrapper component for the `,(0,r.jsx)(n.a,{href:`/uilib/components/date-picker/`,children:`DatePicker`}),`, with user experience tailored for date values.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Date`,children:`Value.Date`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Date`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Date`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Validators`}),`
`,(0,r.jsx)(n.h3,{children:`Internal validators exposed`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Date`}),` exposes the `,(0,r.jsx)(n.code,{children:`dateValidator`}),` validator through its `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` property. Take a look at `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/Date/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,r.jsx)(n.code,{children:`dateValidator`}),` validator validates invalid dates and dates against the `,(0,r.jsx)(n.code,{children:`minDate`}),` and `,(0,r.jsx)(n.code,{children:`maxDate`}),` properties.`]}),`
`,(0,r.jsx)(n.h3,{children:`Extending validators`}),`
`,(0,r.jsxs)(n.p,{children:[`You can compose the shared validator with your own checks by returning it along with custom logic. Import `,(0,r.jsx)(n.code,{children:`DateValidator`}),` to type your validator and have `,(0,r.jsx)(n.code,{children:`validators`}),` typed too.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { DateValidator } from '@dnb/eufemia/extensions/forms/Field/Date'

const myValidator: DateValidator = (value, { validators }) => {
  const { dateValidator } = validators ?? {}
  const notToday = (value: string) => {
    if (value === new Date().toISOString().slice(0, 10)) {
      return new Error('Please enter another date than today')
    }
  }

  // Keep the default validation and ban today's date.
  return [dateValidator, notToday]
}

render(<Field.Date onBlurValidator={myValidator} />)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};