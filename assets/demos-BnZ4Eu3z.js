import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Inline:()=>l,LabelAndValue:()=>c,Range:()=>u,VariantNumeric:()=>s,VariantShort:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Date label="Label text" value="2023-01-16" variant="short" />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Date label="Label text" value="2023-01-16" variant="numeric" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Date label="Label text" value="2023-01-16" />
`}),l=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.Date label="Label text" value="2023-01-16" inline /> This is after
  the component
</P>
`}),u=()=>(0,a.jsx)(n,{children:`<Value.Date label="Label text" value="2023-01-16|2023-04-01" />
`});function d(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||p(`Examples`,!1),l||p(`Examples.Inline`,!0),c||p(`Examples.LabelAndValue`,!0),u||p(`Examples.Range`,!0),s||p(`Examples.VariantNumeric`,!0),o||p(`Examples.VariantShort`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant short`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Variant numeric`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Date range`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(l,{})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};