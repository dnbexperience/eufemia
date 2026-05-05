import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{r as n}from"./view_medium-BL-mItV2.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({ObjectItems:()=>c,PrimitiveItems:()=>s}),o=t(),s=()=>(0,o.jsx)(r,{scope:{TrashIcon:n},children:`<Iterate.Array
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
`}),c=()=>(0,o.jsx)(r,{children:`<Form.Handler
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),c||d(`Examples.ObjectItems`,!0),s||d(`Examples.PrimitiveItems`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Primitive items`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Object items`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};