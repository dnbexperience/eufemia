import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-CQ5iWYLS.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Name />)
render(<Field.Name.First />)
render(<Field.Name.Last />)
render(<Field.Name.Company />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Name`}),` is a wrapper component for the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`input of strings`}),`, with user experience tailored for first name, last name and company names.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/Name`,children:`Value.Name`}),` component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Field, Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler>
      <Field.Name />
      <Field.Name.First value="Nora" />
      <Field.Name.Last value="Mørk" />
      <Field.Name.Company value="DNB" />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Name`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Name`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Sources`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://lovdata.no/dokument/NL/lov/2002-06-07-19`,children:`Lov om personnavn (navneloven)`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://lovdata.no/lov/1985-06-21-79/%C2%A72-1`,children:`Krav til foretaksnavn`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Characteristics`}),`
`,(0,r.jsx)(n.h3,{children:`Allowed characters`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsxs)(n.strong,{children:[(0,r.jsx)(n.code,{children:`Field.Name.First`}),` and `,(0,r.jsx)(n.code,{children:`Field.Name.Last`})]}),`: Only letters, hyphens, and spaces are allowed.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`Field.Name.Company`})}),`: Letters, numbers, punctuation marks, spaces, and dots are allowed.`]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Behavior`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Trailing spaces are automatically removed.`}),`
`,(0,r.jsxs)(n.li,{children:[`The HTML `,(0,r.jsx)(n.code,{children:`autocomplete`}),` attribute is automatically set:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`name`}),` for `,(0,r.jsx)(n.code,{children:`Field.Name`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`given-name`}),` for `,(0,r.jsx)(n.code,{children:`Field.Name.First`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`family-name`}),` for `,(0,r.jsx)(n.code,{children:`Field.Name.Last`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`organization`}),` for `,(0,r.jsx)(n.code,{children:`Field.Name.Company`})]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Validation rules`}),`
`,(0,r.jsx)(n.p,{children:`All name fields have the following validation rules:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Minimum length`}),`:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`For `,(0,r.jsx)(n.code,{children:`Field.Name.First`}),` and `,(0,r.jsx)(n.code,{children:`Field.Name.Last`}),`: Names must be at least 1 character long.`]}),`
`,(0,r.jsxs)(n.li,{children:[`For `,(0,r.jsx)(n.code,{children:`Field.Name.Company`}),`: Company names must be at least 3 characters long.`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.strong,{children:`Pattern validation`}),`:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`For `,(0,r.jsx)(n.code,{children:`Field.Name.First`}),` and `,(0,r.jsx)(n.code,{children:`Field.Name.Last`}),`: Names must start and end with a letter, and cannot contain consecutive hyphens or spaces. Only letters, spaces, and hyphens are allowed.`]}),`
`,(0,r.jsxs)(n.li,{children:[`For `,(0,r.jsx)(n.code,{children:`Field.Name.Company`}),`: Must start and end with a letter or number, and cannot contain consecutive hyphens, spaces, or dots. Letters, numbers, punctuation marks, spaces, and dots are allowed in between.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`The validation happens on blur, internally using the `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/Name/properties/#general-properties`,children:`property`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Note`}),`: The validation patterns are tailored to Norwegian name and company name requirements. If you need support for additional characters or different validation rules, you can extend the validation using the `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` property. See the `,(0,r.jsx)(n.a,{href:`#validators`,children:`Validators`}),` section below for more information.`]}),`
`,(0,r.jsx)(n.h2,{children:`Validators`}),`
`,(0,r.jsx)(n.h3,{children:`Internal validators exposed`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Name`}),` and `,(0,r.jsx)(n.code,{children:`Field.Name.Company`}),` expose validators through their `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` property:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`nameValidator`})}),`: Validates names for `,(0,r.jsx)(n.code,{children:`Field.Name`}),`, `,(0,r.jsx)(n.code,{children:`Field.Name.First`}),`, and `,(0,r.jsx)(n.code,{children:`Field.Name.Last`}),`. It checks that the name:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Is at least 1 character long.`}),`
`,(0,r.jsx)(n.li,{children:`Matches the name pattern (starts and ends with a letter, no consecutive hyphens or spaces).`}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.li,{children:[`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:(0,r.jsx)(n.code,{children:`companyValidator`})}),`: Validates company names for `,(0,r.jsx)(n.code,{children:`Field.Name.Company`}),`. It checks that the company name:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Is at least 3 characters long (default, can be customized via `,(0,r.jsx)(n.code,{children:`minLength`}),` property).`]}),`
`,(0,r.jsx)(n.li,{children:`Matches the company pattern (starts and ends with a letter or number, no consecutive hyphens, spaces, or dots).`}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can extend the validation by providing your own `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` function. Access the internal validator through the `,(0,r.jsx)(n.code,{children:`validators`}),` parameter and combine it with your custom validation. This allows you to add additional validation rules while keeping the default validation intact.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field, Validator } from '@dnb/eufemia/extensions/forms'
import type { CompanyNameValidator } from '@dnb/eufemia/extensions/forms/Field/Name'

// Extend validation to require company names to contain "Corp"
const myValidator: CompanyNameValidator = (value, { validators }) => {
  const { companyValidator } = validators

  const customValidator: Validator<string> = (value) => {
    if (value && !value.includes('Corp')) {
      return new Error('Company name must contain "Corp"')
    }
  }

  // Keep the built-in company validation along with the custom rule.
  return [companyValidator, customValidator]
}

render(<Field.Name.Company onBlurValidator={myValidator} />)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};