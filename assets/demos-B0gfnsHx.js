import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({Empty:()=>o,Inline:()=>d,InternationalSuffix:()=>f,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>s,WithValue:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.PhoneNumber showEmpty />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.PhoneNumber placeholder="The value was not filled in" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.PhoneNumber value="+4798712345" />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.PhoneNumber label="Label text" showEmpty />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.PhoneNumber label="Label text" value="+4798712345" />
`}),d=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.PhoneNumber value="98712345" inline /> This is after the component
</P>
`}),f=()=>(0,a.jsx)(n,{children:`<Flex.Stack>
  <Value.PhoneNumber label="Label text" value="+4798712345" />
  <Value.PhoneNumber label="Label text" value="+8860998472751" />
  <Value.PhoneNumber label="Label text" value="+18686758288" />
</Flex.Stack>
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||h(`Examples`,!1),o||h(`Examples.Empty`,!0),d||h(`Examples.Inline`,!0),f||h(`Examples.InternationalSuffix`,!0),l||h(`Examples.Label`,!0),u||h(`Examples.LabelAndValue`,!0),s||h(`Examples.Placeholder`,!0),c||h(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,a.jsx)(t.h3,{children:`International Suffix`}),`
`,(0,a.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};