import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Empty:()=>o,Inline:()=>f,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>s,ValueFalse:()=>l,ValueTrue:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.Boolean showEmpty />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.Boolean placeholder="The value was not filled in" />
`}),c=()=>(0,a.jsx)(n,{children:`<Value.Boolean value={true} />
`}),l=()=>(0,a.jsx)(n,{children:`<Value.Boolean value={false} />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.Boolean label="Label text" showEmpty />
`}),d=()=>(0,a.jsx)(n,{children:`<Value.Boolean label="Label text" value={false} />
`}),f=()=>(0,a.jsx)(n,{children:`<P>
  <span
    style={{
      color: 'red',
    }}
  >
    This is before the component
  </span>{' '}
  <Value.Boolean value={true} inline />{' '}
  <span
    style={{
      color: 'red',
    }}
  >
    This is after the component
  </span>
</P>
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||h(`Examples`,!1),o||h(`Examples.Empty`,!0),f||h(`Examples.Inline`,!0),u||h(`Examples.Label`,!0),d||h(`Examples.LabelAndValue`,!0),s||h(`Examples.Placeholder`,!0),l||h(`Examples.ValueFalse`,!0),c||h(`Examples.ValueTrue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Empty`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Value true`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Value false`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(d,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};