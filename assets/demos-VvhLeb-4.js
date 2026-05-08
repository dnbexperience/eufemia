import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Empty:()=>o,Inline:()=>f,InlineAndLabel:()=>p,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>s,WithSuffix:()=>l,WithValue:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Currency showEmpty />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Currency placeholder="The value was not filled in" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Currency value={150} />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.Currency value={150} suffix=" - my suffix" />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.Currency label="Label text" showEmpty />
`}),d=()=>(0,a.jsx)(n,{children:`<Value.Currency label="Label text" value={60000000} />
`}),f=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component <Value.Currency value={25000} inline /> This
  is after the component
</P>
`}),p=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.Currency label="Label text" value={25000} inline /> This is after
  the component
</P>
`});function m(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||g(`Examples`,!1),o||g(`Examples.Empty`,!0),f||g(`Examples.Inline`,!0),p||g(`Examples.InlineAndLabel`,!0),u||g(`Examples.Label`,!0),d||g(`Examples.LabelAndValue`,!0),s||g(`Examples.Placeholder`,!0),l||g(`Examples.WithSuffix`,!0),c||g(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Value`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Suffix`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline and label`}),`
`,(0,a.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};