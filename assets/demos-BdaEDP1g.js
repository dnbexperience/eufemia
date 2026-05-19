import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Empty:()=>s,Inline:()=>p,InlineAndLabel:()=>m,Label:()=>d,LabelAndValue:()=>f,Placeholder:()=>c,WithSuffix:()=>u,WithValue:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Value.Currency showEmpty />
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.Currency placeholder="The value was not filled in" />
`}),l=()=>(0,o.jsx)(r,{stableName:`WithValue`,children:`<Value.Currency value={150} />
`}),u=()=>(0,o.jsx)(r,{stableName:`WithSuffix`,children:`<Value.Currency value={150} suffix=" - my suffix" />
`}),d=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Value.Currency label="Label text" showEmpty />
`}),f=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.Currency label="Label text" value={60000000} />
`}),p=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component <Value.Currency value={25000} inline /> This
  is after the component
</P>
`}),m=()=>(0,o.jsx)(r,{stableName:`InlineAndLabel`,children:`<P>
  This is before the component{' '}
  <Value.Currency label="Label text" value={25000} inline /> This is after
  the component
</P>
`});function h(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||_(`Examples`,!1),s||_(`Examples.Empty`,!0),p||_(`Examples.Inline`,!0),m||_(`Examples.InlineAndLabel`,!0),d||_(`Examples.Label`,!0),f||_(`Examples.LabelAndValue`,!0),c||_(`Examples.Placeholder`,!0),u||_(`Examples.WithSuffix`,!0),l||_(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Suffix`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(f,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline and label`}),`
`,(0,o.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};