import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BT9T6B6S.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.BankAccountNumber />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.BankAccountNumber`}),` is a wrapper component for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for bank account values.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Use the `,(0,r.jsx)(n.code,{children:`bankAccountType`}),` prop to switch between formats:`]}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`norwegianBban`}),` (default): 11-digit Norwegian account number with mod-11 checksum validation.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`swedishBban`}),`: 4-digit clearing number + account number (up to 14 digits).`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`swedishBankgiro`}),`: 7–8 digits.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`swedishPlusgiro`}),`: 2–8 digits.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`iban`}),`: Up to 34 alphanumeric characters, grouped in blocks of four.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`Only `,(0,r.jsx)(n.code,{children:`norwegianBban`}),` includes built-in validation. Use `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` for custom validation of other types.`]}),`
`,(0,r.jsx)(n.p,{children:`The value is always a string since account numbers can have leading zeros.`}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/BankAccountNumber`,children:`Value.BankAccountNumber`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/BankAccountNumber`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/BankAccountNumber`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Validators`}),`
`,(0,r.jsx)(n.h3,{children:`Internal validators exposed`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.BankAccountNumber`}),` exposes the `,(0,r.jsx)(n.code,{children:`bankAccountNumberValidator`}),` validator through its `,(0,r.jsx)(n.code,{children:`onChangeValidator`}),` and `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` properties. Take a look at `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/BankAccountNumber/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,r.jsx)(n.code,{children:`bankAccountNumberValidator`}),` validator validates whether the bank account number provided is a `,(0,r.jsx)(n.a,{href:`https://no.wikipedia.org/wiki/Kontonummer`,children:`Norwegian bank account number`}),` or not.`]}),`
`,(0,r.jsx)(n.h3,{children:`Extending validators`}),`
`,(0,r.jsxs)(n.p,{children:[`Use the `,(0,r.jsx)(n.code,{children:`validators`}),` parameter to keep the default checks and add your own custom rule. Import `,(0,r.jsx)(n.code,{children:`BankAccountNumberValidator`}),` to type your `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` and get the typed `,(0,r.jsx)(n.code,{children:`validators`}),` object.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};