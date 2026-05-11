import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Empty:()=>o,Inline:()=>d,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>s,WithValue:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.OrganizationNumber showEmpty />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.OrganizationNumber placeholder="The value was not filled in" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.OrganizationNumber value="123456789" />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.OrganizationNumber label="Label text" showEmpty />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.OrganizationNumber label="Label text" value="123456789" />
`}),d=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.OrganizationNumber value="123456789" inline /> This is after the
  component
</P>
`});function f(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||m(`Examples`,!1),o||m(`Examples.Empty`,!0),d||m(`Examples.Inline`,!0),l||m(`Examples.Label`,!0),u||m(`Examples.LabelAndValue`,!0),s||m(`Examples.Placeholder`,!0),c||m(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,a.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};