import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({BankAccountTypes:()=>_,Disabled:()=>p,Empty:()=>s,Label:()=>u,LabelAndValue:()=>d,OmitMask:()=>c,Placeholder:()=>l,ValidationExtendValidator:()=>g,ValidationRequired:()=>h,WithError:()=>m,WithHelp:()=>f}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Field.BankAccountNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),c=()=>(0,o.jsx)(r,{stableName:`OmitMask`,children:`<Field.BankAccountNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),l=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Field.BankAccountNumber
  placeholder="Enter 11 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),u=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Field.BankAccountNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Field.BankAccountNumber
  label="Label text"
  value="20001234567"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,o.jsx)(r,{stableName:`WithHelp`,children:`<Field.BankAccountNumber
  label="Label text"
  value="20001234567"
  help={{
    title: 'Help is available',
    content:
      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,o.jsx)(r,{stableName:`Disabled`,children:`<Field.BankAccountNumber
  value="20001234567"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),m=()=>(0,o.jsx)(r,{stableName:`WithError`,children:`<Field.BankAccountNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),h=()=>(0,o.jsx)(r,{stableName:`ValidationRequired`,children:`<Field.BankAccountNumber
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
`}),_=()=>(0,o.jsx)(r,{stableName:`BankAccountTypes`,children:`
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

`});function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||b(`Examples`,!1),_||b(`Examples.BankAccountTypes`,!0),p||b(`Examples.Disabled`,!0),s||b(`Examples.Empty`,!0),u||b(`Examples.Label`,!0),d||b(`Examples.LabelAndValue`,!0),c||b(`Examples.OmitMask`,!0),l||b(`Examples.Placeholder`,!0),g||b(`Examples.ValidationExtendValidator`,!0),h||b(`Examples.ValidationRequired`,!0),m||b(`Examples.WithError`,!0),f||b(`Examples.WithHelp`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,o.jsxs)(t.p,{children:[`You can `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,o.jsx)(t.code,{children:`bankAccountNumberValidator`}),`) with your own validation function.`]}),`
`,(0,o.jsx)(g,{}),`
`,(0,o.jsx)(t.h3,{children:`Bank account types`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats.`]}),`
`,(0,o.jsx)(_,{})]})}function y(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};