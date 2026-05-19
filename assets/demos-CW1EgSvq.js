import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({DifferentLocale:()=>l,Inline:()=>f,Label:()=>u,LabelAndValue:()=>d,Placeholder:()=>s,WithFieldAndValue:()=>p,WithValue:()=>c}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Placeholder`,children:`<Value.SelectCurrency placeholder="No value given" />
`}),c=()=>(0,o.jsx)(r,{stableName:`WithValue`,children:`<Value.SelectCurrency value="NOK" />
`}),l=()=>(0,o.jsx)(r,{stableName:`DifferentLocale`,children:`<Form.Handler
  locale="en-GB"
  data={{
    myCurrency: 'CHF',
  }}
>
  <Value.SelectCurrency path="/myCurrency" />
</Form.Handler>
`}),u=()=>(0,o.jsx)(r,{stableName:`Label`,children:`<Value.SelectCurrency label="Label text" showEmpty />
`}),d=()=>(0,o.jsx)(r,{stableName:`LabelAndValue`,children:`<Value.SelectCurrency label="Label text" value="NOK" />
`}),f=()=>(0,o.jsx)(r,{stableName:`Inline`,children:`<P>
  This is before the component <Value.SelectCurrency value="NOK" inline />{' '}
  This is after the component
</P>
`}),p=()=>(0,o.jsx)(r,{stableName:`WithFieldAndValue`,children:`<Form.Handler
  data={{
    myCurrency: 'NOK',
  }}
>
  <Flex.Stack>
    <Field.SelectCurrency path="/myCurrency" />
    <Value.SelectCurrency path="/myCurrency" />
  </Flex.Stack>
</Form.Handler>
`});function m(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||g(`Examples`,!1),l||g(`Examples.DifferentLocale`,!0),f||g(`Examples.Inline`,!0),u||g(`Examples.Label`,!0),d||g(`Examples.LabelAndValue`,!0),s||g(`Examples.Placeholder`,!0),p||g(`Examples.WithFieldAndValue`,!0),c||g(`Examples.WithValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Interactive`}),`
`,(0,o.jsx)(p,{}),`
`,(0,o.jsx)(t.h3,{children:`Placeholder`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Value`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Use different locale`}),`
`,(0,o.jsx)(l,{}),`
`,(0,o.jsx)(t.h3,{children:`Label`}),`
`,(0,o.jsx)(u,{}),`
`,(0,o.jsx)(t.h3,{children:`Label and value`}),`
`,(0,o.jsx)(d,{}),`
`,(0,o.jsx)(t.h3,{children:`Inline`}),`
`,(0,o.jsx)(f,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};