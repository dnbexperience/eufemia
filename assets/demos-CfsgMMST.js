import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{c as r}from"./ToggleButton-DoxBGtHF.js";import{g as i,j as a,v as o,w as s}from"./forms-CsJzlVUF.js";import{B as c}from"./index-DdG6L_K8.js";import{t as l}from"./ComponentBox-q_23Ylzi.js";var u=e({ObjectItems:()=>p,PrimitiveItems:()=>f}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`PrimitiveItems`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Iterate, Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Flex:r,Iterate:i,Value:o},children:`<Form.Handler>
  <Flex.Stack>
    <Iterate.Array path="/" animate>
      <Value.String itemPath="/" />
    </Iterate.Array>
    <Iterate.PushButton text="Add another item" path="/" pushValue="new" />
  </Flex.Stack>
</Form.Handler>
`}),p=()=>(0,d.jsx)(l,{stableName:`ObjectItems`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { Iterate, Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:s,Iterate:i,Field:a},children:`<Form.Handler
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