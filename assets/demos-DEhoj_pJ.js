import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Inline:()=>u,LabelAndValue:()=>c,Placeholder:()=>s,ValueAndPath:()=>l,WithLabelAndEmpty:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Number label="Label text" showEmpty />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Number placeholder="The number was not filled in" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Number label="Label text" value={12345678} />
`}),l=()=>(0,a.jsx)(n,{children:`<Form.Handler
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
`}),u=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component <Value.Number value={123} inline /> This is
  after the component
</P>
`});function d(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||p(`Examples`,!1),u||p(`Examples.Inline`,!0),c||p(`Examples.LabelAndValue`,!0),s||p(`Examples.Placeholder`,!0),l||p(`Examples.ValueAndPath`,!0),o||p(`Examples.WithLabelAndEmpty`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Value from path`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label only`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};