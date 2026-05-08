import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{Lr as r}from"./index--zEB_f_m.js";var i=e({DifferentLocale:()=>c,Inline:()=>d,Label:()=>l,LabelAndValue:()=>u,Placeholder:()=>o,WithFieldAndValue:()=>f,WithValue:()=>s}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Value.SelectCurrency placeholder="No value given" />
`}),s=()=>(0,a.jsx)(n,{children:`<Value.SelectCurrency value="NOK" />
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler
  locale="en-GB"
  data={{
    myCurrency: 'CHF',
  }}
>
  <Value.SelectCurrency path="/myCurrency" />
</Form.Handler>
`}),l=()=>(0,a.jsx)(n,{children:`<Value.SelectCurrency label="Label text" showEmpty />
`}),u=()=>(0,a.jsx)(n,{children:`<Value.SelectCurrency label="Label text" value="NOK" />
`}),d=()=>(0,a.jsx)(n,{children:`<P>
  This is before the component <Value.SelectCurrency value="NOK" inline />{' '}
  This is after the component
</P>
`}),f=()=>(0,a.jsx)(n,{children:`<Form.Handler
  data={{
    myCurrency: 'NOK',
  }}
>
  <Flex.Stack>
    <Field.SelectCurrency path="/myCurrency" />
    <Value.SelectCurrency path="/myCurrency" />
  </Flex.Stack>
</Form.Handler>
`});function p(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||h(`Examples`,!1),c||h(`Examples.DifferentLocale`,!0),d||h(`Examples.Inline`,!0),l||h(`Examples.Label`,!0),u||h(`Examples.LabelAndValue`,!0),o||h(`Examples.Placeholder`,!0),f||h(`Examples.WithFieldAndValue`,!0),s||h(`Examples.WithValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Interactive`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Value`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Use different locale`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`Label`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsx)(t.h3,{children:`Label and value`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Inline`}),`
`,(0,a.jsx)(d,{})]})}function m(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};