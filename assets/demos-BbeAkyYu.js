import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./trash-C5oi59Py.js";import{c as i}from"./ToggleButton-T4E3Coih.js";import{t as a}from"./Form-B9l6EvGx.js";import{t as o}from"./Field-DHicZJEj.js";import{t as s}from"./Iterate-B2rVv1xi.js";import{K as c}from"./index-CsG353ar.js";import{t as l}from"./ComponentBox-Cb1rLw_D.js";var u=e({ObjectItems:()=>p,PrimitiveItems:()=>f}),d=t(n()),f=()=>(0,d.jsx)(l,{scope:{TrashIcon:r},stableName:`PrimitiveItems`,sourceImports:[`import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { trash as TrashIcon } from '@dnb/eufemia/icons'`],__buildScope:{Iterate:s,Flex:i,Field:o},children:`<Iterate.Array
  value={['One', 'Two', 'Three', 'Four', 'Five']}
  onChange={(value) => console.log('onChange', value)}
  animate
>
  <Flex.Horizontal align="center">
    <Field.String itemPath="/" />
    <Iterate.RemoveButton
      icon={TrashIcon}
      onChange={(value) => console.log('onChange', value)}
    />
  </Flex.Horizontal>
</Iterate.Array>
`}),p=()=>(0,d.jsx)(l,{stableName:`ObjectItems`,sourceImports:[`import { Iterate, Field, Form } from '@dnb/eufemia/extensions/forms'`,`import { Flex } from '@dnb/eufemia'`,`import { trash as TrashIcon } from '@dnb/eufemia/icons'`],__buildScope:{Form:a,Iterate:s,Flex:i,Field:o},children:`<Form.Handler
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
    <Flex.Horizontal align="center">
      <Field.Name.Last itemPath="/name" />
      <Iterate.RemoveButton text="Remove avenger" />
    </Flex.Horizontal>
  </Iterate.Array>
</Form.Handler>
`});function m(e){let t={h2:`h2`,h3:`h3`,...c(),...e.components};return u||g(`Examples`,!1),p||g(`Examples.ObjectItems`,!0),f||g(`Examples.PrimitiveItems`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsx)(t.h3,{children:`Object items`}),`
`,(0,d.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};