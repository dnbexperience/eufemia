import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({BankAccountTypes:()=>g,Disabled:()=>f,Empty:()=>o,Label:()=>l,LabelAndValue:()=>u,OmitMask:()=>s,Placeholder:()=>c,ValidationExtendValidator:()=>h,ValidationRequired:()=>m,WithError:()=>p,WithHelp:()=>d}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),s=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),c=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  placeholder="Enter 11 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  label="Label text"
  value="20001234567"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  label="Label text"
  value="20001234567"
  help={{
    title: 'Help is available',
    content:
      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  value="20001234567"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),p=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),m=()=>(0,a.jsx)(n,{children:`<Field.BankAccountNumber
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

// Keep the built-in validator and add your own checks.
const myValidator: BankAccountNumberValidator = (
  value,
  { validators }
) => {
  const { bankAccountNumberValidator } = validators ?? {}
  return [bankAccountNumberValidator, firstDigitIs1Validator]
}
render(
  <Field.BankAccountNumber
    required
    value="65845125621"
    onBlurValidator={myValidator}
    validateInitially
  />
)
`}),g=()=>(0,a.jsx)(n,{children:`
<Field.BankAccountNumber
  bankAccountType="swedishBban"
  value="50001234567"
  onChange={(value) => console.log('onChange', value)}
/>
<Field.BankAccountNumber
  bankAccountType="swedishBankgiro"
  value="59140129"
  onChange={(value) => console.log('onChange', value)}
/>
<Field.BankAccountNumber
  bankAccountType="swedishPlusgiro"
  value="1263664"
  onChange={(value) => console.log('onChange', value)}
/>
<Field.BankAccountNumber
  bankAccountType="iban"
  value="NO9386011117947"
  onChange={(value) => console.log('onChange', value)}
/>

`});function _(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||y(`Examples`,!1),g||y(`Examples.BankAccountTypes`,!0),f||y(`Examples.Disabled`,!0),o||y(`Examples.Empty`,!0),l||y(`Examples.Label`,!0),u||y(`Examples.LabelAndValue`,!0),s||y(`Examples.OmitMask`,!0),c||y(`Examples.Placeholder`,!0),h||y(`Examples.ValidationExtendValidator`,!0),m||y(`Examples.ValidationRequired`,!0),p||y(`Examples.WithError`,!0),d||y(`Examples.WithHelp`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,a.jsxs)(t.p,{children:[`You can `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,a.jsx)(t.code,{children:`bankAccountNumberValidator`}),`) with your own validation function.`]}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h3,{children:`Bank account types`}),`
`,(0,a.jsxs)(t.p,{children:[`Use the `,(0,a.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats.`]}),`
`,(0,a.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};