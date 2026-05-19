import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Inline:()=>u,LabelAndValue:()=>l,Range:()=>d,VariantNumeric:()=>c,VariantShort:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`VariantShort`,children:`<Value.Date label="Label text" value="2023-01-16" variant="short" />
`}),c=()=>(0,o.jsx)(r,{stableName:`VariantNumeric`,children:`<Value.Date label="Label text" value="2023-01-16" variant="numeric" />
`}),l=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.Date label="Label text" value="2023-01-16" />
`}),u=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component{' '}
  <Value.Date label="Label text" value="2023-01-16" inline /> This is after
  the component
</P>
`}),d=()=>(0,o.jsx)(r,{stableName:`Range`,children:`<Value.Date label="Label text" value="2023-01-16|2023-04-01" />
`});function f(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||m(`Examples`,!1),u||m(`Examples.Inline`,!0),l||m(`Examples.LabelAndValue`,!0),d||m(`Examples.Range`,!0),c||m(`Examples.VariantNumeric`,!0),s||m(`Examples.VariantShort`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant short`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Variant numeric`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Date range`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(u,{})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};