import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n,w as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({Disabled:()=>p,Empty:()=>s,Label:()=>u,LabelAndValue:()=>d,OmitMask:()=>c,Placeholder:()=>l,ValidationDnr:()=>_,ValidationExtendValidator:()=>y,ValidationExtendValidatorAdult:()=>b,ValidationFnr:()=>g,ValidationFnrAdult:()=>x,ValidationFunction:()=>v,ValidationRequired:()=>h,WithError:()=>m,WithHelp:()=>f}),o=t(),s=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),l=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  placeholder="Enter 11 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  label="Label text"
  value="01017501234"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  label="Label text"
  value="01017501234"
  help={{
    title: 'Help is available',
    content: 'The more I help others to succeed, the more I succeed.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  value="01010101010"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),m=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),g=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber value="29020112345" validateInitially />
`}),_=()=>(0,o.jsx)(n,{children:`<Field.NationalIdentityNumber value="69020112345" validateInitially />
`}),v=()=>(0,o.jsx)(n,{noInline:!0,children:`const fnr = (value: string) =>
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
`}),y=()=>(0,o.jsx)(n,{noInline:!0,children:`const bornInAprilValidator = (value: string) => {
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
`}),b=()=>(0,o.jsx)(n,{scope:{createMinimumAgeValidator:r},noInline:!0,children:`const adultValidator = createMinimumAgeValidator(18)
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
`}),x=()=>(0,o.jsx)(n,{scope:{createMinimumAgeValidator:r},noInline:!0,children:`const adultValidator = createMinimumAgeValidator(18)
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
`});function S(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||w(`Examples`,!1),p||w(`Examples.Disabled`,!0),s||w(`Examples.Empty`,!0),u||w(`Examples.Label`,!0),d||w(`Examples.LabelAndValue`,!0),c||w(`Examples.OmitMask`,!0),l||w(`Examples.Placeholder`,!0),_||w(`Examples.ValidationDnr`,!0),y||w(`Examples.ValidationExtendValidator`,!0),b||w(`Examples.ValidationExtendValidatorAdult`,!0),g||w(`Examples.ValidationFnr`,!0),x||w(`Examples.ValidationFnrAdult`,!0),v||w(`Examples.ValidationFunction`,!0),h||w(`Examples.ValidationRequired`,!0),m||w(`Examples.WithError`,!0),f||w(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Omit mask`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`With help`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Disabled`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Error`}),`
`,(0,o.jsx)(m,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,o.jsx)(h,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - Norwegian national identity numbers`}),`
`,(0,o.jsxs)(t.p,{children:[`It validates `,(0,o.jsx)(t.a,{href:`https://www.skatteetaten.no/person/folkeregister/identitetsnummer-og-elektronisk-id/fodselsnummer/`,children:`Norwegian national identity numbers(fnr)`}),` using the `,(0,o.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:`Below is an example of the error message displayed when there's an invalid Norwegian national identity number(fnr):`}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation - D numbers`}),`
`,(0,o.jsxs)(t.p,{children:[`It validates `,(0,o.jsx)(t.a,{href:`https://www.skatteetaten.no/en/person/national-registry/identitetsnummer/d-nummer/`,children:`D numbers`}),` using the `,(0,o.jsx)(t.a,{href:`https://github.com/navikt/fnrvalidator`,children:`fnrvalidator`}),`.`]}),`
`,(0,o.jsx)(t.p,{children:`Below is an example of the error message displayed when there's an invalid D number(a D number has its first number in the identification number increased by 4):`}),`
`,(0,o.jsx)(_,{}),`
`,(0,o.jsx)(t.h3,{children:`Validation function`}),`
`,(0,o.jsxs)(t.p,{children:[`You can provide your own validation function, either to `,(0,o.jsx)(t.code,{children:`onChangeValidator`}),` or `,(0,o.jsx)(t.code,{children:`onBlurValidator`}),`.`]}),`
`,(0,o.jsx)(v,{}),`
`,(0,o.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validations`}),`(`,(0,o.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,o.jsx)(t.code,{children:`fnrValidator`}),`, `,(0,o.jsx)(t.code,{children:`dnrAndFnrValidator`}),`, and make your own age validator by using the `,(0,o.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function) with your own validation function.`]}),`
`,(0,o.jsx)(y,{}),`
`,(0,o.jsx)(t.h3,{children:`Extend validation with adult validator`}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validations`}),`(`,(0,o.jsx)(t.code,{children:`dnrValidator`}),`, `,(0,o.jsx)(t.code,{children:`fnrValidator`}),`, and `,(0,o.jsx)(t.code,{children:`dnrAndFnrValidator`}),`) with your own age validator, by using the `,(0,o.jsx)(t.code,{children:`createMinimumAgeValidator`}),` function.`]}),`
`,(0,o.jsx)(b,{}),`
`,(0,o.jsx)(t.h3,{children:`Validate only national identity numbers(fnr) above 18 years old`}),`
`,(0,o.jsx)(x,{})]})}function C(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};