import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({Default:()=>o}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Iterate.Array value={['foo', 'bar']}>
  <Form.SubHeading>
    <Iterate.ItemNo>{'Item no. {itemNo}'}</Iterate.ItemNo>
  </Form.SubHeading>
</Iterate.Array>
`});function s(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||l(`Examples`,!1),o||l(`Examples.Default`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Default`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};