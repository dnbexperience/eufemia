import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({BankAccountTypes:()=>f,Empty:()=>o,Inline:()=>d,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>s,WithValue:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.BankAccountNumber showEmpty />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.BankAccountNumber placeholder="The value was not filled in" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.BankAccountNumber value="20001234567" />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.BankAccountNumber label="Label text" showEmpty />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.BankAccountNumber label="Label text" value="20001234567" />
`}),d=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.BankAccountNumber value="20001234567" inline /> This is after the
  component
</P>
`}),f=()=>(0,a.jsx)(n,{children:`
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

`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||h(`Examples`,!1),f||h(`Examples.BankAccountTypes`,!0),o||h(`Examples.Empty`,!0),d||h(`Examples.Inline`,!0),l||h(`Examples.Label`,!0),u||h(`Examples.LabelAndValue`,!0),s||h(`Examples.Placeholder`,!0),c||h(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Value`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Bank account types`}),`
`,(0,a.jsxs)(t.p,{children:[`Use the `,(0,a.jsx)(t.code,{children:`bankAccountType`}),` prop to switch between formats.`]}),`
`,(0,a.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};