import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-CQxteavq.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.DateOfBirth />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.DateOfBirth`}),` is a wrapper component for the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`input of strings`}),`, with user experience tailored for date of birth values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/DateOfBirth`,children:`Value.DateOfBirth`}),` component.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It supports the HTML `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute, and by default set it to `,(0,i.jsx)(t.code,{children:`bday-day`}),` for the day field, `,(0,i.jsx)(t.code,{children:`bday-month`}),` for the month field, and to `,(0,i.jsx)(t.code,{children:`bday-year`}),` for the year field.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/DateOfBirth`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/DateOfBirth`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.DateOfBirth`}),` expose the `,(0,i.jsx)(t.code,{children:`dateOfBirthValidator`}),` validator through its `,(0,i.jsx)(t.code,{children:`onChangeValidator`}),` and `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property, take a look at `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/DateOfBirth/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,i.jsx)(t.code,{children:`dateOfBirthValidator`}),` validator, validates if the date provided is a valid date or not.`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`When you return the built-in validator together with custom validation logic you can introduce additional rules without losing the default checks. Import `,(0,i.jsx)(t.code,{children:`DateOfBirthValidator`}),` to type your validator and the `,(0,i.jsx)(t.code,{children:`validators`}),` object.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};