import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-DN1SNCj-.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.DateOfBirth />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.DateOfBirth`}),` is a wrapper component for the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`input of strings`}),`, with user experience tailored for date of birth values.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/DateOfBirth`,children:`Value.DateOfBirth`}),` component.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It supports the HTML `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute, and by default set it to `,(0,r.jsx)(n.code,{children:`bday-day`}),` for the day field, `,(0,r.jsx)(n.code,{children:`bday-month`}),` for the month field, and to `,(0,r.jsx)(n.code,{children:`bday-year`}),` for the year field.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/DateOfBirth`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/DateOfBirth`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Validators`}),`
`,(0,r.jsx)(n.h3,{children:`Internal validators exposed`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.DateOfBirth`}),` expose the `,(0,r.jsx)(n.code,{children:`dateOfBirthValidator`}),` validator through its `,(0,r.jsx)(n.code,{children:`onChangeValidator`}),` and `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` property, take a look at `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/DateOfBirth/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,r.jsx)(n.code,{children:`dateOfBirthValidator`}),` validator, validates if the date provided is a valid date or not.`]}),`
`,(0,r.jsx)(n.h3,{children:`Extending validators`}),`
`,(0,r.jsxs)(n.p,{children:[`When you return the built-in validator together with custom validation logic you can introduce additional rules without losing the default checks. Import `,(0,r.jsx)(n.code,{children:`DateOfBirthValidator`}),` to type your validator and the `,(0,r.jsx)(n.code,{children:`validators`}),` object.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { DateOfBirthValidator } from '@dnb/eufemia/extensions/forms/Field/DateOfBirth'

const myValidator: DateOfBirthValidator = (value, { validators }) => {
  const { dateOfBirthValidator } = validators ?? {}
  const modernBirthYear = (value: string) => {
    if (value && value.slice(0, 4) < '1900') {
      return new Error('Birth year must be 1900 or later')
    }
  }

  // Keep the default validator and add a minimum year requirement.
  return [dateOfBirthValidator, modernBirthYear]
}

render(<Field.DateOfBirth onBlurValidator={myValidator} />)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};