import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Disabled:()=>f,Empty:()=>o,Label:()=>l,LabelAndValue:()=>u,OmitMask:()=>s,Placeholder:()=>c,ValidationExtendValidator:()=>h,ValidationRequired:()=>m,WithError:()=>p,WithHelp:()=>d}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  placeholder="Enter 9 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  label="Label text"
  value="987654321"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  label="Label text"
  value="987654321"
  help={{
    title: 'Help is available',
    content:
      'Success has nothing to do with what you gain in life or accomplish for yourself. It’s what you do for others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  value="989898989"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.OrganizationNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),h=()=>(0,a.jsx)(n,{noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
  if (value.substring(0, 1) !== '1') {
    return new Error('First digit is not 1')
  }
}

// Keep the built-in validator while requiring the first digit.
const myValidator: OrganizationNumberValidator = (
  value,
  { validators }
) => {
  const { organizationNumberValidator } = validators
  return [organizationNumberValidator, firstDigitIs1Validator]
}
render(
  <Field.OrganizationNumber
    required
    value="991541209"
    onBlurValidator={myValidator}
    validateInitially
  />
)
`});function g(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||v(`Examples`,!1),f||v(`Examples.Disabled`,!0),o||v(`Examples.Empty`,!0),l||v(`Examples.Label`,!0),u||v(`Examples.LabelAndValue`,!0),s||v(`Examples.OmitMask`,!0),c||v(`Examples.Placeholder`,!0),h||v(`Examples.ValidationExtendValidator`,!0),m||v(`Examples.ValidationRequired`,!0),p||v(`Examples.WithError`,!0),d||v(`Examples.WithHelp`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Omit mask`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`With help`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Disabled`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Error`}),`
`,(0,a.jsx)(p,{}),`
`,(0,a.jsx)(t.h3,{children:`Validation - Required`}),`
`,(0,a.jsx)(m,{}),`
`,(0,a.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,a.jsxs)(t.p,{children:[`You can `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),`(`,(0,a.jsx)(t.code,{children:`organizationNumberValidator`}),`) with your own validation function.`]}),`
`,(0,a.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};