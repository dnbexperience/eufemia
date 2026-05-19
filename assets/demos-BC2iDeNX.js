import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Disabled:()=>p,Empty:()=>s,Label:()=>u,LabelAndValue:()=>d,OmitMask:()=>c,Placeholder:()=>l,ValidationExtendValidator:()=>g,ValidationRequired:()=>h,WithError:()=>m,WithHelp:()=>f}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Field.OrganizationNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`OmitMask`,children:`<Field.OrganizationNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.OrganizationNumber
  placeholder="Enter 9 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.OrganizationNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.OrganizationNumber
  label="Label text"
  value="987654321"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.OrganizationNumber
  label="Label text"
  value="987654321"
  help={{
    title: 'Help is available',
    content:
      'Success has nothing to do with what you gain in life or accomplish for yourself. It’s what you do for others.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.OrganizationNumber
  value="989898989"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.OrganizationNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.OrganizationNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),g=()=>(0,o.jsx)(r,{stableName:`ValidationExtendValidator`,noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
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
`});function _(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||y(`Examples`,!1),p||y(`Examples.Disabled`,!0),s||y(`Examples.Empty`,!0),u||y(`Examples.Label`,!0),d||y(`Examples.LabelAndValue`,!0),c||y(`Examples.OmitMask`,!0),l||y(`Examples.Placeholder`,!0),g||y(`Examples.ValidationExtendValidator`,!0),h||y(`Examples.ValidationRequired`,!0),m||y(`Examples.WithError`,!0),f||y(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,o.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),`(`,(0,o.jsx)(t.code,{children:`organizationNumberValidator`}),`) with your own validation function.`]}),`
`,(0,o.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};