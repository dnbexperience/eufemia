import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r,w as i}from"./ComponentBox-a4aOn231.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({Disabled:()=>m,Empty:()=>c,Label:()=>d,LabelAndValue:()=>f,OmitMask:()=>l,Placeholder:()=>u,ValidationDnr:()=>v,ValidationExtendValidator:()=>b,ValidationExtendValidatorAdult:()=>x,ValidationFnr:()=>_,ValidationFnrAdult:()=>S,ValidationFunction:()=>y,ValidationRequired:()=>g,WithError:()=>h,WithHelp:()=>p}),s=e(n()),c=()=>(0,s.jsx)(r,{stableName:`Empty`,children:`<Field.NationalIdentityNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,s.jsx)(r,{stableName:`OmitMask`,children:`<Field.NationalIdentityNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),u=()=>(0,s.jsx)(r,{stableName:`Placeholder`,children:`<Field.NationalIdentityNumber
  placeholder="Enter 11 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(r,{stableName:`Label`,children:`<Field.NationalIdentityNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,s.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.NationalIdentityNumber
  label="Label text"
  value="01017501234"
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,s.jsx)(r,{stableName:`WithHelp`,children:`<Field.NationalIdentityNumber
  label="Label text"
  value="01017501234"
  help={{
    title: 'Help is available',
    content: 'The more I help others to succeed, the more I succeed.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,s.jsx)(r,{stableName:`Disabled`,children:`<Field.NationalIdentityNumber
  value="01010101010"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),h=()=>(0,s.jsx)(r,{stableName:`WithError`,children:`<Field.NationalIdentityNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,s.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.NationalIdentityNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),_=()=>(0,s.jsx)(r,{stableName:`ValidationFnr`,children:`<Field.NationalIdentityNumber value="29020112345" validateInitially />
`}),v=()=>(0,s.jsx)(r,{stableName:`ValidationDnr`,children:`<Field.NationalIdentityNumber value="69020112345" validateInitially />
`}),y=()=>(0,s.jsx)(r,{stableName:`ValidationFunction`,noInline:!0,children:`const fnr = (value: string) =>
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
`}),b=()=>(0,s.jsx)(r,{stableName:`ValidationExtendValidator`,noInline:!0,children:`const bornInAprilValidator = (value: string) => {
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
`}),x=()=>(0,s.jsx)(r,{scope:{createMinimumAgeValidator:i},stableName:`ValidationExtendValidatorAdult`,noInline:!0,children:`const adultValidator = createMinimumAgeValidator(18)
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
`}),S=()=>(0,s.jsx)(r,{scope:{createMinimumAgeValidator:i},stableName:`ValidationFnrAdult`,noInline:!0,children:`const adultValidator = createMinimumAgeValidator(18)
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
`});function C(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return o||T(`Examples`,!1),m||T(`Examples.Disabled`,!0),c||T(`Examples.Empty`,!0),d||T(`Examples.Label`,!0),f||T(`Examples.LabelAndValue`,!0),l||T(`Examples.OmitMask`,!0),u||T(`Examples.Placeholder`,!0),v||T(`Examples.ValidationDnr`,!0),b||T(`Examples.ValidationExtendValidator`,!0),x||T(`Examples.ValidationExtendValidatorAdult`,!0),_||T(`Examples.ValidationFnr`,!0),S||T(`Examples.ValidationFnrAdult`,!0),y||T(`Examples.ValidationFunction`,!0),g||T(`Examples.ValidationRequired`,!0),h||T(`Examples.WithError`,!0),p||T(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Omit mask`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`With help`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`Disabled`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Error`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - Norwegian national identity numbers`}),`
`,(0,s.jsxs)(t.p,{children:[`It validates `,(0,s.jsx)(t.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers(fnr)`}),` using the `,(0,s.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.`]}),`
`,(0,s.jsx)(t.p,{children:`Below is an example of the error message displayed when there's an invalid Norwegian national identity number(fnr):`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation - D numbers`}),`
`,(0,s.jsxs)(t.p,{children:[`It validates `,(0,s.jsx)(t.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),` using the `,(0,s.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.`]}),`
`,(0,s.jsx)(t.p,{children:`Below is an example of the error message displayed when there's an invalid D number(a D number has its first number in the identification number increased by 4):`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`Validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can provide your own validation function, either to `,(0,s.jsx)(t.code,{children:`onChangeValidator`}),` or `,(0,s.jsx)(t.code,{children:`onBlurValidator`}),`.`]}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validations`}),`(`,(0,s.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,s.jsx)(t.code,{children:`fnrValidator`}),`, `,(0,s.jsx)(t.code,{children:`dnrAndFnrValidator`}),`, and make your own age validator by using the `,(0,s.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function) with your own validation function.`]}),`
`,(0,s.jsx)(b,{}),`
`,(0,s.jsx)(t.h3,{children:`Extend validation with adult validator`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validations`}),`(`,(0,s.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,s.jsx)(t.code,{children:`fnrValidator`}),`, and `,(0,s.jsx)(t.code,{children:`dnrAndFnrValidator`}),`) with your own age validator, by using the `,(0,s.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function.`]}),`
`,(0,s.jsx)(x,{}),`
`,(0,s.jsx)(t.h3,{children:`Validate only national identity numbers(fnr) above 18 years old`}),`
`,(0,s.jsx)(S,{})]})}function w(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(C,{...e})}):C(e)}function T(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{w as default};