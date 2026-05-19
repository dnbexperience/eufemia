import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({ObjectItems:()=>c,PrimitiveItems:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`PrimitiveItems`,children:`<Form.Handler>
  <Flex.Stack>
    <Iterate.Array path="/" animate>
      <Value.String itemPath="/" />
    </Iterate.Array>
    <Iterate.PushButton text="Add another item" path="/" pushValue="new" />
  </Flex.Stack>
</Form.Handler>
`}),c=()=>(0,o.jsx)(r,{stableName:`ObjectItems`,children:`<Form.Handler
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),c||d(`Examples.ObjectItems`,!0),s||d(`Examples.PrimitiveItems`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Object items`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};