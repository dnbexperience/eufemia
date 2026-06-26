import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{P as r,j as i}from"./forms-CFi5-4x5.js";import{U as a}from"./index-kfZVC31v.js";import{t as o}from"./ComponentBox-qLaLt9T0.js";var s=e({Disabled:()=>h,Empty:()=>l,Label:()=>f,LabelAndValue:()=>p,OmitMask:()=>u,Placeholder:()=>d,ValidationDnr:()=>y,ValidationExtendValidator:()=>x,ValidationExtendValidatorAdult:()=>S,ValidationFnr:()=>v,ValidationFnrAdult:()=>C,ValidationFunction:()=>b,ValidationRequired:()=>_,WithError:()=>g,WithHelp:()=>m}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Empty`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,c.jsx)(o,{stableName:`OmitMask`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),d=()=>(0,c.jsx)(o,{stableName:`Placeholder`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  placeholder="Enter 11 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,c.jsx)(o,{stableName:`Label`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  label="Label text"
  value="01017501234"
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,c.jsx)(o,{stableName:`WithHelp`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  label="Label text"
  value="01017501234"
  help={{
    title: 'Help is available',
    content: 'The more I help others to succeed, the more I succeed.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),h=()=>(0,c.jsx)(o,{stableName:`Disabled`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  value="01010101010"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),g=()=>(0,c.jsx)(o,{stableName:`WithError`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),_=()=>(0,c.jsx)(o,{stableName:`ValidationRequired`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),v=()=>(0,c.jsx)(o,{stableName:`ValidationFnr`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber value="29020112345" validateInitially />
`}),y=()=>(0,c.jsx)(o,{stableName:`ValidationDnr`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},children:`<Field.NationalIdentityNumber value="69020112345" validateInitially />
`}),b=()=>(0,c.jsx)(o,{stableName:`ValidationFunction`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},noInline:!0,children:`const fnr = (value: string) =>
  value.length >= 11
    ? {
        status: 'valid',
      }
    : {
        status: 'invalid',
      }
render(
  <Field.NationalIdentityNumber
    required
    value="123"
    onBlurValidator={(value) => {
      const result = fnr(value)
      return result.status === 'invalid'
        ? new FormError('Field.errorPattern')
        : undefined
    }}
    validateInitially
  />
)
`}),x=()=>(0,c.jsx)(o,{stableName:`ValidationExtendValidator`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},noInline:!0,children:`const bornInAprilValidator = (value: string) => {
  if (value.substring(2, 4) !== '04') {
    return new Error('Not born in April')
  }
}
// Keep the default validator while ensuring birth month is April.
const myValidator: NationalIdentityNumberValidator = (
  value,
  { validators }
) => {
  const { dnrAndFnrValidator } = validators ?? {}
  return [dnrAndFnrValidator, bornInAprilValidator]
}
render(
  <Field.NationalIdentityNumber
    required
    value="53050129159"
    onBlurValidator={myValidator}
    validateInitially
  />
)
`}),S=()=>(0,c.jsx)(o,{scope:{createMinimumAgeValidator:r},stableName:`ValidationExtendValidatorAdult`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},noInline:!0,children:`const adultValidator = createMinimumAgeValidator(18)
// Keep the default validator while adding an age check.
const myAdultValidator: NationalIdentityNumberValidator = (
  value,
  { validators }
) => {
  const { dnrAndFnrValidator } = validators ?? {}
  return [dnrAndFnrValidator, adultValidator]
}
render(
  <Field.NationalIdentityNumber
    required
    value="56052459244"
    onBlurValidator={myAdultValidator}
    validateInitially
  />
)
`}),C=()=>(0,c.jsx)(o,{scope:{createMinimumAgeValidator:r},stableName:`ValidationFnrAdult`,sourceImports:[`import { createMinimumAgeValidator, NationalIdentityNumberValidator } from '@dnb/eufemia/extensions/forms/Field/NationalIdentityNumber'`,`import { Field, FormError } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:i},noInline:!0,children:`const adultValidator = createMinimumAgeValidator(18)
// Keep the default validator while ensuring an FNR-based age check.
const myFnrAdultValidator: NationalIdentityNumberValidator = (
  value,
  { validators }
) => {
  const { fnrValidator } = validators ?? {}
  return [fnrValidator, adultValidator]
}
render(
  <Field.NationalIdentityNumber
    required
    value="49100651997"
    onBlurValidator={myFnrAdultValidator}
    validateInitially
  />
)
`});function w(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return s||E(`Examples`,!1),h||E(`Examples.Disabled`,!0),l||E(`Examples.Empty`,!0),f||E(`Examples.Label`,!0),p||E(`Examples.LabelAndValue`,!0),u||E(`Examples.OmitMask`,!0),d||E(`Examples.Placeholder`,!0),y||E(`Examples.ValidationDnr`,!0),x||E(`Examples.ValidationExtendValidator`,!0),S||E(`Examples.ValidationExtendValidatorAdult`,!0),v||E(`Examples.ValidationFnr`,!0),C||E(`Examples.ValidationFnrAdult`,!0),b||E(`Examples.ValidationFunction`,!0),_||E(`Examples.ValidationRequired`,!0),g||E(`Examples.WithError`,!0),m||E(`Examples.WithHelp`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Empty`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Omit mask`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Label`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`With help`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Disabled`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Error`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(t.h3,{children:`Validation - Norwegian national identity numbers`}),`
`,(0,c.jsxs)(t.p,{children:[`It validates `,(0,c.jsx)(t.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers(fnr)`}),` using the `,(0,c.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.`]}),`
`,(0,c.jsx)(t.p,{children:`Below is an example of the error message displayed when there's an invalid Norwegian national identity number(fnr):`}),`
`,(0,c.jsx)(v,{}),`
`,(0,c.jsx)(t.h3,{children:`Validation - D numbers`}),`
`,(0,c.jsxs)(t.p,{children:[`It validates `,(0,c.jsx)(t.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),` using the `,(0,c.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.`]}),`
`,(0,c.jsx)(t.p,{children:`Below is an example of the error message displayed when there's an invalid D number(a D number has its first number in the identification number increased by 4):`}),`
`,(0,c.jsx)(y,{}),`
`,(0,c.jsx)(t.h3,{children:`Validation function`}),`
`,(0,c.jsxs)(t.p,{children:[`You can provide your own validation function, either to `,(0,c.jsx)(t.code,{children:`onChangeValidator`}),` or `,(0,c.jsx)(t.code,{children:`onBlurValidator`}),`.`]}),`
`,(0,c.jsx)(b,{}),`
`,(0,c.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,c.jsxs)(t.p,{children:[`You can `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validations`}),`(`,(0,c.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,c.jsx)(t.code,{children:`fnrValidator`}),`, `,(0,c.jsx)(t.code,{children:`dnrAndFnrValidator`}),`, and make your own age validator by using the `,(0,c.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function) with your own validation function.`]}),`
`,(0,c.jsx)(x,{}),`
`,(0,c.jsx)(t.h3,{children:`Extend validation with adult validator`}),`
`,(0,c.jsxs)(t.p,{children:[`You can `,(0,c.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validations`}),`(`,(0,c.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,c.jsx)(t.code,{children:`fnrValidator`}),`, and `,(0,c.jsx)(t.code,{children:`dnrAndFnrValidator`}),`) with your own age validator, by using the `,(0,c.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function.`]}),`
`,(0,c.jsx)(S,{}),`
`,(0,c.jsx)(t.h3,{children:`Validate only national identity numbers(fnr) above 18 years old`}),`
`,(0,c.jsx)(C,{})]})}function T(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(w,{...e})}):w(e)}function E(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{T as default};