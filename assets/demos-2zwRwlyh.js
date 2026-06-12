import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-D0SeNBSG.js";import{t as i}from"./Value-whMgauSk.js";import{K as a}from"./index-CsG353ar.js";import{t as o}from"./ComponentBox-Cb1rLw_D.js";var s=e({BankAccountTypes:()=>h,Empty:()=>l,Inline:()=>m,Label:()=>f,LabelAndValue:()=>p,Placeholder:()=>u,WithValue:()=>d}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`Empty`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.BankAccountNumber showEmpty />
`}),u=()=>(0,c.jsx)(o,{stableName:`Placeholder`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.BankAccountNumber placeholder="The value was not filled in" />
`}),d=()=>(0,c.jsx)(o,{stableName:`WithValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.BankAccountNumber value="20001234567" />
`}),f=()=>(0,c.jsx)(o,{stableName:`Label`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.BankAccountNumber label="Label text" showEmpty />
`}),p=()=>(0,c.jsx)(o,{stableName:`LabelAndValue`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`<Value.BankAccountNumber label="Label text" value="20001234567" />
`}),m=()=>(0,c.jsx)(o,{stableName:`Inline`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{P:r,Value:i},children:`<P>
  This is before the component{' '}
  <Value.BankAccountNumber value="20001234567" inline /> This is after the
  component
</P>
`}),h=()=>(0,c.jsx)(o,{stableName:`BankAccountTypes`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Value:i},children:`
<Value.BankAccountNumber
  bankAccountType="swedishBban"
  value="50001234567"
/>
<Value.BankAccountNumber
  bankAccountType="swedishBankgiro"
  value="59140129"
/>
<Value.BankAccountNumber
  bankAccountType="swedishPlusgiro"
  value="1263664"
/>
<Value.BankAccountNumber
  bankAccountType="iban"
  value="NO9386011117947"
/>

`});function g(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return s||v(`Examples`,!1),h||v(`Examples.BankAccountTypes`,!0),l||v(`Examples.Empty`,!0),m||v(`Examples.Inline`,!0),f||v(`Examples.Label`,!0),p||v(`Examples.LabelAndValue`,!0),u||v(`Examples.Placeholder`,!0),d||v(`Examples.WithValue`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Empty`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Value`}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Label`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Label and value`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Inline`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`Bank account types`}),`
`,(0,c.jsxs)(t.p,{children:[`Use the `,(0,c.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats.`]}),`
`,(0,c.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};