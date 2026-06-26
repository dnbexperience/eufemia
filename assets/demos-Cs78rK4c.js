import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r}from"./forms-CFi5-4x5.js";import{U as i}from"./index-kfZVC31v.js";import{t as a}from"./ComponentBox-qLaLt9T0.js";var o=e({BankAccountTypes:()=>v,Disabled:()=>m,Empty:()=>c,Label:()=>d,LabelAndValue:()=>f,OmitMask:()=>l,Placeholder:()=>u,ValidationExtendValidator:()=>_,ValidationRequired:()=>g,WithError:()=>h,WithHelp:()=>p}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`Empty`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  onChange={(value) => console.log('onChange', value)}
/>
`}),l=()=>(0,s.jsx)(a,{stableName:`OmitMask`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  onChange={(value) => console.log('onChange', value)}
  omitMask
/>
`}),u=()=>(0,s.jsx)(a,{stableName:`Placeholder`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  placeholder="Enter 11 digits..."
  onChange={(value) => console.log('onChange', value)}
/>
`}),d=()=>(0,s.jsx)(a,{stableName:`Label`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
/>
`}),f=()=>(0,s.jsx)(a,{stableName:`LabelAndValue`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  label="Label text"
  value="20001234567"
  onChange={(value) => console.log('onChange', value)}
/>
`}),p=()=>(0,s.jsx)(a,{stableName:`WithHelp`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  label="Label text"
  value="20001234567"
  help={{
    title: 'Help is available',
    content:
      'The real point is that we all need help somewhere along life’s path whether we think we will or not. And, if you are the one giving and helping, just remember this: no matter what happens later, you will always be secure in the fact knowing that you have remained strong and true to assist those that need your help.',
  }}
  onChange={(value) => console.log('onChange', value)}
/>
`}),m=()=>(0,s.jsx)(a,{stableName:`Disabled`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  value="20001234567"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  disabled
/>
`}),h=()=>(0,s.jsx)(a,{stableName:`WithError`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  value="007"
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  error={new Error('This is what is wrong...')}
/>
`}),g=()=>(0,s.jsx)(a,{stableName:`ValidationRequired`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`<Field.BankAccountNumber
  label="Label text"
  onChange={(value) => console.log('onChange', value)}
  required
  validateInitially
/>
`}),_=()=>(0,s.jsx)(a,{stableName:`ValidationExtendValidator`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},noInline:!0,children:`const firstDigitIs1Validator = (value: string) => {
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
`}),v=()=>(0,s.jsx)(a,{stableName:`BankAccountTypes`,sourceImports:[`import { Field } from '@dnb/eufemia/extensions/forms'`,`import { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'`],__buildScope:{Field:r},children:`
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

`});function y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return o||x(`Examples`,!1),v||x(`Examples.BankAccountTypes`,!0),m||x(`Examples.Disabled`,!0),c||x(`Examples.Empty`,!0),d||x(`Examples.Label`,!0),f||x(`Examples.LabelAndValue`,!0),l||x(`Examples.OmitMask`,!0),u||x(`Examples.Placeholder`,!0),_||x(`Examples.ValidationExtendValidator`,!0),g||x(`Examples.ValidationRequired`,!0),h||x(`Examples.WithError`,!0),p||x(`Examples.WithHelp`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,s.jsx)(t.h3,{children:`Extend validation with custom validation function`}),`
`,(0,s.jsxs)(t.p,{children:[`You can `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/info/#validators`,children:`extend the existing validation`}),` (`,(0,s.jsx)(t.code,{children:`bankAccountNumberValidator`}),`) with your own validation function.`]}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`Bank account types`}),`
`,(0,s.jsxs)(t.p,{children:[`Use the `,(0,s.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats.`]}),`
`,(0,s.jsx)(v,{})]})}function b(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};