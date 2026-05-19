import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{r}from"./view_medium-BGCKigyJ.js";import{t as i}from"./ComponentBox-a4aOn231.js";import{zr as a}from"./index-DqqByKA2.js";var o=t({ObjectItems:()=>l,PrimitiveItems:()=>c}),s=e(n()),c=()=>(0,s.jsx)(i,{scope:{TrashIcon:r},stableName:`PrimitiveItems`,children:`<Iterate.Array
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
`}),l=()=>(0,s.jsx)(i,{stableName:`ObjectItems`,children:`<Form.Handler
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
`});function u(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return o||f(`Examples`,!1),l||f(`Examples.ObjectItems`,!0),c||f(`Examples.PrimitiveItems`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Object items`}),`
`,(0,s.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};