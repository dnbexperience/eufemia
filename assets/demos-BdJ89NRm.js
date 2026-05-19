import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Empty:()=>s,Inline:()=>f,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>c,WithValue:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Empty`,children:`<Value.NationalIdentityNumber showEmpty />
`}),c=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.NationalIdentityNumber placeholder="The value was not filled in" />
`}),l=()=>(0,o.jsx)(r,{stableName:`WithValue`,children:`<Value.NationalIdentityNumber value="25017598765" />
`}),u=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Value.NationalIdentityNumber label="Label text" showEmpty />
`}),d=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.NationalIdentityNumber label="Label text" value="25017598765" />
`}),f=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component{' '}
  <Value.NationalIdentityNumber value="25017598765" inline /> This is after
  the component
</P>
`});function p(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||h(`Examples`,!1),s||h(`Examples.Empty`,!0),f||h(`Examples.Inline`,!0),u||h(`Examples.Label`,!0),d||h(`Examples.LabelAndValue`,!0),c||h(`Examples.Placeholder`,!0),l||h(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,o.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};