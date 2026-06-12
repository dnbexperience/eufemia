import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BPsYBwH2.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Date />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Date`}),` is a wrapper component for the `,(0,i.jsx)(t.a,{href:`/uilib/components/date-picker/`,children:`DatePicker`}),`, with user experience tailored for date values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Date`,children:`Value.Date`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Date`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Date`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Date`}),` exposes the `,(0,i.jsx)(t.code,{children:`dateValidator`}),` validator through its `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property. Take a look at `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Date/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,i.jsx)(t.code,{children:`dateValidator`}),` validator validates invalid dates and dates against the `,(0,i.jsx)(t.code,{children:`minDate`}),` and `,(0,i.jsx)(t.code,{children:`maxDate`}),` properties.`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`You can compose the shared validator with your own checks by returning it along with custom logic. Import `,(0,i.jsx)(t.code,{children:`DateValidator`}),` to type your validator and have `,(0,i.jsx)(t.code,{children:`validators`}),` typed too.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};