import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-BVomBA302.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Name />)
render(<Field.Name.First />)
render(<Field.Name.Last />)
render(<Field.Name.Company />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Name`}),` is a wrapper component for the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`input of strings`}),`, with user experience tailored for first name, last name and company names.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Name`,children:`Value.Name`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Field, Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Name`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Name`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Sources`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://lovdata.no/dokument/NL/lov/2002-06-07-19`,children:`Lov om personnavn (navneloven)`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://lovdata.no/lov/1985-06-21-79/%C2%A72-1`,children:`Krav til foretaksnavn`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Characteristics`}),`
`,(0,i.jsx)(t.h3,{children:`Allowed characters`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsxs)(t.strong,{children:[(0,i.jsx)(t.code,{children:`Field.Name.First`}),` and `,(0,i.jsx)(t.code,{children:`Field.Name.Last`})]}),`: Only letters, hyphens, and spaces are allowed.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`Field.Name.Company`})}),`: Letters, numbers, punctuation marks, spaces, and dots are allowed.`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Behavior`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Trailing spaces are automatically removed.`}),`
`,(0,i.jsxs)(t.li,{children:[`The HTML `,(0,i.jsx)(t.code,{children:`autocomplete`}),` attribute is automatically set:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`name`}),` for `,(0,i.jsx)(t.code,{children:`Field.Name`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`given-name`}),` for `,(0,i.jsx)(t.code,{children:`Field.Name.First`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`family-name`}),` for `,(0,i.jsx)(t.code,{children:`Field.Name.Last`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`organization`}),` for `,(0,i.jsx)(t.code,{children:`Field.Name.Company`})]}),`
`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validation rules`}),`
`,(0,i.jsx)(t.p,{children:`All name fields have the following validation rules:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Minimum length`}),`:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`For `,(0,i.jsx)(t.code,{children:`Field.Name.First`}),` and `,(0,i.jsx)(t.code,{children:`Field.Name.Last`}),`: Names must be at least 1 character long.`]}),`
`,(0,i.jsxs)(t.li,{children:[`For `,(0,i.jsx)(t.code,{children:`Field.Name.Company`}),`: Company names must be at least 3 characters long.`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Pattern validation`}),`:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`For `,(0,i.jsx)(t.code,{children:`Field.Name.First`}),` and `,(0,i.jsx)(t.code,{children:`Field.Name.Last`}),`: Names must start and end with a letter, and cannot contain consecutive hyphens or spaces. Only letters, spaces, and hyphens are allowed.`]}),`
`,(0,i.jsxs)(t.li,{children:[`For `,(0,i.jsx)(t.code,{children:`Field.Name.Company`}),`: Must start and end with a letter or number, and cannot contain consecutive hyphens, spaces, or dots. Letters, numbers, punctuation marks, spaces, and dots are allowed in between.`]}),`
`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`The validation happens on blur, internally using the `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Name/properties/#general-properties`,children:`property`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Note`}),`: The validation patterns are tailored to Norwegian name and company name requirements. If you need support for additional characters or different validation rules, you can extend the validation using the `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property. See the `,(0,i.jsx)(t.a,{href:`#validators`,children:`Validators`}),` section below for more information.`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Name`}),` and `,(0,i.jsx)(t.code,{children:`Field.Name.Company`}),` expose validators through their `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`nameValidator`})}),`: Validates names for `,(0,i.jsx)(t.code,{children:`Field.Name`}),`, `,(0,i.jsx)(t.code,{children:`Field.Name.First`}),`, and `,(0,i.jsx)(t.code,{children:`Field.Name.Last`}),`. It checks that the name:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Is at least 1 character long.`}),`
`,(0,i.jsx)(t.li,{children:`Matches the name pattern (starts and ends with a letter, no consecutive hyphens or spaces).`}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.li,{children:[`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:(0,i.jsx)(t.code,{children:`companyValidator`})}),`: Validates company names for `,(0,i.jsx)(t.code,{children:`Field.Name.Company`}),`. It checks that the company name:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Is at least 3 characters long (default, can be customized via `,(0,i.jsx)(t.code,{children:`minLength`}),` property).`]}),`
`,(0,i.jsx)(t.li,{children:`Matches the company pattern (starts and ends with a letter or number, no consecutive hyphens, spaces, or dots).`}),`
`]}),`
`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can extend the validation by providing your own `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` function. Access the internal validator through the `,(0,i.jsx)(t.code,{children:`validators`}),` parameter and combine it with your custom validation. This allows you to add additional validation rules while keeping the default validation intact.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field, Validator } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};