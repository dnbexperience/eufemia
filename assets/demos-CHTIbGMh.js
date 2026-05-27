import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Form-KS-x6we6.js";import{t as i}from"./Field-bFo7XjQz.js";import{t as a}from"./Value-Cn-VyKaI.js";import{t as o}from"./Iterate-B9FXI9Zb.js";import{Rr as s,un as c}from"./index-Da-r8F54.js";import{t as l}from"./ComponentBox-DXeEXSK2.js";var u=t({ObjectItems:()=>p,PrimitiveItems:()=>f}),d=e(n()),f=()=>(0,d.jsx)(l,{stableName:`PrimitiveItems`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Iterate, Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Flex:c,Iterate:o,Value:a},children:`<Form.Handler>
  <Flex.Stack>
    <Iterate.Array path="/" animate>
      <Value.String itemPath="/" />
    </Iterate.Array>
    <Iterate.PushButton text="Add another item" path="/" pushValue="new" />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,d.jsx)(l,{stableName:`ObjectItems`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Iterate, Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Iterate:o,Field:i},children:`<Form.Handler
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
`});function m(e){let t={h2:`h2`,h3:`h3`,...s(),...e.components};return u||g(`Examples`,!1),p||g(`Examples.ObjectItems`,!0),f||g(`Examples.PrimitiveItems`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Object items`}),`
`,(0,d.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};