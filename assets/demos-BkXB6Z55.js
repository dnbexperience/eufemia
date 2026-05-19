import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{o as i,zr as a}from"./index-DqqByKA2.js";var o=t({Empty:()=>c,Inline:()=>p,Label:()=>d,LabelAndValue:()=>f,Placeholder:()=>l,WithValue:()=>u}),s=e(n()),c=()=>(0,s.jsx)(r,{stableName:`Empty`,children:`<Value.DateOfBirth showEmpty />
`}),l=()=>(0,s.jsx)(r,{stableName:`Placeholder`,children:`<Value.DateOfBirth placeholder="The value was not filled in" />
`}),u=()=>(0,s.jsx)(r,{stableName:`WithValue`,children:`<Value.DateOfBirth value="2023-01-16" />
`}),d=()=>(0,s.jsx)(r,{stableName:`Label`,children:`<Value.DateOfBirth label="Label text" showEmpty />
`}),f=()=>(0,s.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.DateOfBirth label="Label text" value="2023-01-16" />
`}),p=()=>(0,s.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component{' '}
  <Value.DateOfBirth value="2023-01-16" inline /> This is after the
  component
</P>
`});function m(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return o||g(`Examples`,!1),c||g(`Examples.Empty`,!0),p||g(`Examples.Inline`,!0),d||g(`Examples.Label`,!0),f||g(`Examples.LabelAndValue`,!0),l||g(`Examples.Placeholder`,!0),u||g(`Examples.WithValue`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,s.jsx)(t.h3,{children:`Empty`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Value`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Label`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Label and value`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Inline`}),`
`,(0,s.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};