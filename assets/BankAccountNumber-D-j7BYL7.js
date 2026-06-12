import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-pqtHn30C.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.BankAccountNumber />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.BankAccountNumber`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for bank account values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Use the `,(0,i.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`norwegianBban`}),` (default): 11-digit Norwegian account number with mod-11 checksum validation.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`swedishBban`}),`: 4-digit clearing number + account number (up to 14 digits).`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`swedishBankgiro`}),`: 7–8 digits.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`swedishPlusgiro`}),`: 2–8 digits.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`iban`}),`: Up to 34 alphanumeric characters, grouped in blocks of four.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`Only `,(0,i.jsx)(t.code,{children:`norwegianBban`}),` includes built-in validation. Use `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` for custom validation of other types.`]}),`
`,(0,i.jsx)(t.p,{children:`The value is always a string since account numbers can have leading zeros.`}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/BankAccountNumber`,children:`Value.BankAccountNumber`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/BankAccountNumber`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/BankAccountNumber`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.BankAccountNumber`}),` exposes the `,(0,i.jsx)(t.code,{children:`bankAccountNumberValidator`}),` validator through its `,(0,i.jsx)(t.code,{children:`onChangeValidator`}),` and `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` properties. Take a look at `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/BankAccountNumber/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,i.jsx)(t.code,{children:`bankAccountNumberValidator`}),` validator validates whether the bank account number provided is a `,(0,i.jsx)(t.a,{href:`https://no.wikipedia.org/wiki/Kontonummer`,children:`Norwegian bank account number`}),` or not.`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`Use the `,(0,i.jsx)(t.code,{children:`validators`}),` parameter to keep the default checks and add your own custom rule. Import `,(0,i.jsx)(t.code,{children:`BankAccountNumberValidator`}),` to type your `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` and get the typed `,(0,i.jsx)(t.code,{children:`validators`}),` object.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { BankAccountNumberValidator } from '@dnb/eufemia/extensions/forms/Field/BankAccountNumber'

const myValidator: BankAccountNumberValidator = (
  value,
  { validators }
) => {
  const { bankAccountNumberValidator } = validators ?? {}
  const prefixChecker = (value: string) => {
    if (value && value[0] !== '1') {
      return new Error('Account number must start with 1')
    }
  }

  // Keep the built-in validator and add a custom prefix rule.
  return [bankAccountNumberValidator, prefixChecker]
}

render(<Field.BankAccountNumber onBlurValidator={myValidator} />)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};