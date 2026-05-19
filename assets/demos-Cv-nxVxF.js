import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Inline:()=>d,LabelAndValue:()=>l,Placeholder:()=>c,ValueAndPath:()=>u,WithLabelAndEmpty:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`WithLabelAndEmpty`,children:`<Value.Number label="Label text" showEmpty />
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.Number placeholder="The number was not filled in" />
`}),l=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.Number label="Label text" value={12345678} />
`}),u=()=>(0,o.jsx)(r,{stableName:`ValueAndPath`,children:`<Form.Handler
  data={{
    myNumber: 12345678,
  }}
>
  <Value.Number
    label="Label text"
    currency
    currencyDisplay="code"
    currencyPosition="before"
    path="/myNumber"
  />
</Form.Handler>
`}),d=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component <Value.Number value={123} inline /> This is
  after the component
</P>
`});function f(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||m(`Examples`,!1),d||m(`Examples.Inline`,!0),l||m(`Examples.LabelAndValue`,!0),c||m(`Examples.Placeholder`,!0),u||m(`Examples.ValueAndPath`,!0),s||m(`Examples.WithLabelAndEmpty`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Value from path`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label only`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};