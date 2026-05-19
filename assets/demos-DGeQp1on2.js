import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({BankAccountTypes:()=>p,Empty:()=>s,Inline:()=>f,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>c,WithValue:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Value.BankAccountNumber showEmpty />
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.BankAccountNumber placeholder="The value was not filled in" />
`}),l=()=>(0,o.jsx)(r,{stableName:`WithValue`,children:`<Value.BankAccountNumber value="20001234567" />
`}),u=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Value.BankAccountNumber label="Label text" showEmpty />
`}),d=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.BankAccountNumber label="Label text" value="20001234567" />
`}),f=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component{' '}
  <Value.BankAccountNumber value="20001234567" inline /> This is after the
  component
</P>
`}),p=()=>(0,o.jsx)(r,{stableName:`BankAccountTypes`,children:`
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

`});function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||g(`Examples`,!1),p||g(`Examples.BankAccountTypes`,!0),s||g(`Examples.Empty`,!0),f||g(`Examples.Inline`,!0),u||g(`Examples.Label`,!0),d||g(`Examples.LabelAndValue`,!0),c||g(`Examples.Placeholder`,!0),l||g(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Bank account types`}),`
`,(0,o.jsxs)(t.p,{children:[`Use the `,(0,o.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats.`]}),`
`,(0,o.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};