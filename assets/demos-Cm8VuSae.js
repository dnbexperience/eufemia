import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,p as i}from"./index-CMgyXmp3.js";var a=e({Empty:()=>s,Inline:()=>f,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>c,WithValue:()=>l}),o=t(),s=()=>(0,o.jsx)(n,{children:`<Value.DateOfBirth showEmpty />
`}),c=()=>(0,o.jsx)(n,{children:`<Value.DateOfBirth placeholder="The value was not filled in" />
`}),l=()=>(0,o.jsx)(n,{children:`<Value.DateOfBirth value="2023-01-16" />
`}),u=()=>(0,o.jsx)(n,{children:`<Value.DateOfBirth label="Label text" showEmpty />
`}),d=()=>(0,o.jsx)(n,{children:`<Value.DateOfBirth label="Label text" value="2023-01-16" />
`}),f=()=>(0,o.jsx)(n,{children:`<P>
  This is before the component{' '}
  <Value.DateOfBirth value="2023-01-16" inline /> This is after the
  component
</P>
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return a||h(`Examples`,!1),s||h(`Examples.Empty`,!0),f||h(`Examples.Inline`,!0),u||h(`Examples.Label`,!0),d||h(`Examples.LabelAndValue`,!0),c||h(`Examples.Placeholder`,!0),l||h(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(i,{bottom:!0,label:`Locale used in the demos:`,listUSLocale:!0}),`
`,(0,o.jsx)(t.h3,{children:`Empty`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Value`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};