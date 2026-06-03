import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-a0-tCzyl2.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.NationalIdentityNumber />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.NationalIdentityNumber`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for national identity number values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`This field is meant for `,(0,i.jsx)(t.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers (fnr)`}),` and `,(0,i.jsx)(t.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),`, and therefore takes an 11-digit string as a value. A Norwegian national identity number can have a leading zero, which is why it's a string and not a number.
More info can be found at `,(0,i.jsx)(t.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/#:~:text=A%20national%20identity%20number%20consists,national%20identity%20number%20are%20220676`,children:`Skatteetaten`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It validates input for `,(0,i.jsx)(t.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers (fnr)`}),` and `,(0,i.jsx)(t.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),` using the `,(0,i.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.
The validation happens on blur, internally using the `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/properties/#field-specific-properties`,children:`property`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/NationalIdentityNumber`,children:`Value.NationalIdentityNumber`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/NationalIdentityNumber`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/NationalIdentityNumber`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Support for different countries`}),`
`,(0,i.jsx)(t.p,{children:`When it comes to supporting different countries, Eufemia Forms may prefer to introduce a new component for each country, simply because the nature of such a component can differ significantly from the original component which was made for Norway in mind.`}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.NationalIdentityNumber`}),` exposes the following validators through its `,(0,i.jsx)(t.code,{children:`onChangeValidator`}),` and `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` properties:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`dnrValidator`}),`: validates a D number.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`fnrValidator`}),`: validates a national identity number (fødselsnummer).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`dnrAndFnrValidator`}),`:`,`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`validates the identification number as a D number when first digit is 4 or greater (because a D number has its first number increased by 4).`}),`
`,(0,i.jsx)(t.li,{children:`validates the identification number as a national identity number (fødselsnummer) when first digit is 3 or less.`}),`
`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`Keep the built-in validators while adding custom rules by returning them together with your own logic. Import `,(0,i.jsx)(t.code,{children:`NationalIdentityNumberValidator`}),` so TypeScript tracks each exported validator.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
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
`,(0,i.jsx)(t.h3,{children:`createMinimumAgeValidator`}),`
`,(0,i.jsxs)(t.p,{children:[`You can create your own age validator by using the `,(0,i.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function. It takes an age as a parameter and returns a validator function. The validator function takes a value and returns an error message if the value is not above the given age.
It validates whether the identification number has a date of birth that is 18 years or older. It uses only the first 7 digits of the identification number to validate. The first 6 digits represent the date of birth, and the next digit represents the century.
Since it only uses the first 7 digits, it does not validate the identification number itself. Therefore, it's common to use this validator together with one of the validators above (`,(0,i.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,i.jsx)(t.code,{children:`fnrValidator`}),`, or `,(0,i.jsx)(t.code,{children:`dnrAndFnrValidator`}),`) to validate the identification number as well.`]}),`
`,(0,i.jsxs)(t.p,{children:[`You need to import the `,(0,i.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function from the `,(0,i.jsx)(t.code,{children:`Field.NationalIdentityNumber`}),` component:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { createMinimumAgeValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

// Create a validator that validates if the identification number is above 18 years old
const above18YearsValidator = createMinimumAgeValidator(18)

render(
  <Field.NationalIdentityNumber onBlurValidator={above18YearsValidator} />
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`See the following `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/NationalIdentityNumber/#extend-validation-with-custom-validation-function`,children:`example`}),` on how to extend validation using the exposed validators.`]}),`
`,(0,i.jsx)(t.h3,{children:`createMinimumAgeVerifier`}),`
`,(0,i.jsxs)(t.p,{children:[`To use the `,(0,i.jsx)(t.code,{children:`createMinimumAgeValidator`}),` functionality without a field, you can use `,(0,i.jsx)(t.code,{children:`createMinimumAgeVerifier`}),`, which returns a boolean.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { createMinimumAgeVerifier } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'

const isAdult = createMinimumAgeVerifier(18)

isAdult('123') // false
isAdult('10072476609') // false
isAdult('09100654021') // true
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};