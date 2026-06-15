import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-_NsXxiTa.js";import{t as i}from"./Form-JTiJXf2d.js";import{t as a}from"./Field-DqRpWyNm.js";import{t as o}from"./Value-OsZalonW.js";import{t as s}from"./Iterate-D_asUGot.js";import{K as c}from"./index-ppRu2ktv.js";import{t as l}from"./ComponentBox-R2c6Bo76.js";var u=e({ObjectItems:()=>p,PrimitiveItems:()=>f}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`PrimitiveItems`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Iterate, Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Flex:r,Iterate:s,Value:o},children:`<Form.Handler>
  <Flex.Stack>
    <Iterate.Array path="/" animate>
      <Value.String itemPath="/" />
    </Iterate.Array>
    <Iterate.PushButton text="Add another item" path="/" pushValue="new" />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,d.jsx)(l,{stableName:`ObjectItems`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Iterate, Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Iterate:s,Field:a},children:`<Form.Handler
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
`});function m(e){let t={h2:`h2`,h3:`h3`,...c(),...e.components};return u||g(`Examples`,!1),p||g(`Examples.ObjectItems`,!0),f||g(`Examples.PrimitiveItems`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Object items`}),`
`,(0,d.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};