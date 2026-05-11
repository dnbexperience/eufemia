import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-xW2kV1s2.js";import{Lr as r}from"./index-DVm0MbGb.js";var i=e({ObjectItems:()=>s,PrimitiveItems:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler>
  <Flex.Stack>
    <Iterate.Array path="/" animate>
      <Value.String itemPath="/" />
    </Iterate.Array>
    <Iterate.PushButton text="Add another item" path="/" pushValue="new" />
  </Flex.Stack>
</Form.Handler>
`}),s=()=>(0,a.jsx)(n,{children:`<Form.Handler
  data={[
    {
      name: 'Iron Man',
    },
    {
      name: 'Captain America',
    },
    {
      name: 'Thor',
    },
  ]}
  onChange={(value) => console.log('onChange', value)}
>
  <Iterate.Array path="/" animate>
    <Field.Name.Last itemPath="/name" />
  </Iterate.Array>

  <Iterate.PushButton
    top="small"
    text="Add another item"
    path="/"
    pushValue={{}}
  />
</Form.Handler>
`});function c(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||u(`Examples`,!1),s||u(`Examples.ObjectItems`,!0),o||u(`Examples.PrimitiveItems`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Object items`}),`
`,(0,a.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};