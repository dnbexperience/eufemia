import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-DGIj6EUr.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.NationalIdentityNumber />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.NationalIdentityNumber`}),` is a wrapper component for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for national identity number values.`]}),`
`,(0,r.jsxs)(n.p,{children:[`This field is meant for `,(0,r.jsx)(n.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers (fnr)`}),` and `,(0,r.jsx)(n.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),`, and therefore takes an 11-digit string as a value. A Norwegian national identity number can have a leading zero, which is why it's a string and not a number.
More info can be found at `,(0,r.jsx)(n.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/#:~:text=A%20national%20identity%20number%20consists,national%20identity%20number%20are%20220676`,children:`Skatteetaten`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It validates input for `,(0,r.jsx)(n.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers (fnr)`}),` and `,(0,r.jsx)(n.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),` using the `,(0,r.jsx)(n.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.
The validation happens on blur, internally using the `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/properties/#field-specific-properties`,children:`property`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/NationalIdentityNumber`,children:`Value.NationalIdentityNumber`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/NationalIdentityNumber`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/NationalIdentityNumber`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Support for different countries`}),`
`,(0,r.jsx)(n.p,{children:`When it comes to supporting different countries, Eufemia Forms may prefer to introduce a new component for each country, simply because the nature of such a component can differ significantly from the original component which was made for Norway in mind.`}),`
`,(0,r.jsx)(n.h2,{children:`Validators`}),`
`,(0,r.jsx)(n.h3,{children:`Internal validators exposed`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.NationalIdentityNumber`}),` exposes the following validators through its `,(0,r.jsx)(n.code,{children:`onChangeValidator`}),` and `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` properties:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`dnrValidator`}),`: validates a D number.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`fnrValidator`}),`: validates a national identity number (fødselsnummer).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`dnrAndFnrValidator`}),`:`,`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`validates the identification number as a D number when first digit is 4 or greater (because a D number has its first number increased by 4).`}),`
`,(0,r.jsx)(n.li,{children:`validates the identification number as a national identity number (fødselsnummer) when first digit is 3 or less.`}),`
`]}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Extending validators`}),`
`,(0,r.jsxs)(n.p,{children:[`Keep the built-in validators while adding custom rules by returning them together with your own logic. Import `,(0,r.jsx)(n.code,{children:`NationalIdentityNumberValidator`}),` so TypeScript tracks each exported validator.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

const myValidator: NationalIdentityNumberValidator = (
  value,
  { validators }
) => {
  const { dnrAndFnrValidator } = validators ?? {}
  const mustIncludeSeven = (value: string) => {
    if (value && !value.includes('7')) {
      return new Error('Identifier must contain the digit 7')
    }
  }

  // Compose the default validator with a custom digit check.
  return [dnrAndFnrValidator, mustIncludeSeven]
}

render(<Field.NationalIdentityNumber onBlurValidator={myValidator} />)
`})}),`
`,(0,r.jsx)(n.h3,{children:`createMinimumAgeValidator`}),`
`,(0,r.jsxs)(n.p,{children:[`You can create your own age validator by using the `,(0,r.jsx)(n.code,{children:`createMinimumAgeValidator`}),` function. It takes an age as a parameter and returns a validator function. The validator function takes a value and returns an error message if the value is not above the given age.
It validates whether the identification number has a date of birth that is 18 years or older. It uses only the first 7 digits of the identification number to validate. The first 6 digits represent the date of birth, and the next digit represents the century.
Since it only uses the first 7 digits, it does not validate the identification number itself. Therefore, it's common to use this validator together with one of the validators above (`,(0,r.jsx)(n.code,{children:`dnrValidator`}),`, `,(0,r.jsx)(n.code,{children:`fnrValidator`}),`, or `,(0,r.jsx)(n.code,{children:`dnrAndFnrValidator`}),`) to validate the identification number as well.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You need to import the `,(0,r.jsx)(n.code,{children:`createMinimumAgeValidator`}),` function from the `,(0,r.jsx)(n.code,{children:`Field.NationalIdentityNumber`}),` component:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { createMinimumAgeValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

// Create a validator that validates if the identification number is above 18 years old
const above18YearsValidator = createMinimumAgeValidator(18)

render(
  <Field.NationalIdentityNumber onBlurValidator={above18YearsValidator} />
)
`})}),`
`,(0,r.jsxs)(n.p,{children:[`See the following `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/#extend-validation-with-custom-validation-function`,children:`example`}),` on how to extend validation using the exposed validators.`]}),`
`,(0,r.jsx)(n.h3,{children:`createMinimumAgeVerifier`}),`
`,(0,r.jsxs)(n.p,{children:[`To use the `,(0,r.jsx)(n.code,{children:`createMinimumAgeValidator`}),` functionality without a field, you can use `,(0,r.jsx)(n.code,{children:`createMinimumAgeVerifier`}),`, which returns a boolean.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { createMinimumAgeVerifier } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

const isAdult = createMinimumAgeVerifier(18)

isAdult('123') // false
isAdult('10072476609') // false
isAdult('09100654021') // true
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};