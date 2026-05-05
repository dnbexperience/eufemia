import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{t as r}from"./TestElement-7TlpAKwo.js";import{Rr as i}from"./index-CMgyXmp3.js";import{c as a,s as o}from"./Examples-oXTN84qZ.js";var s=e({AdvancedSizeExample:()=>p,BasicSize:()=>u,BasicSizeExample:()=>f,Default:()=>l,ResponsiveSize:()=>d}),c=t(),l=()=>(0,c.jsx)(n,{scope:{TestElement:r},children:`<Flex.Container>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),u=()=>(0,c.jsx)(n,{children:`<Flex.Container>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
</Flex.Container>
`}),d=()=>(0,c.jsx)(n,{hidePreview:!0,children:`<Flex.Container>
  <Flex.Item
    span={{
      small: 12,
      large: 6,
    }}
  >
    uses 50% or 100% based on the screen size
  </Flex.Item>
  <Flex.Item
    span={{
      small: 12,
      large: 6,
    }}
  >
    uses 50% or 100% based on the screen size
  </Flex.Item>
</Flex.Container>
`}),f=o,p=a;function m(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return s||g(`Examples`,!1),p||g(`Examples.AdvancedSizeExample`,!0),f||g(`Examples.BasicSizeExample`,!0),l||g(`Examples.Default`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsxs)(t.h3,{children:[`Basic `,(0,c.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,c.jsxs)(t.p,{children:[`With the default `,(0,c.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsxs)(t.h3,{children:[`Advanced `,(0,c.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,c.jsxs)(t.p,{children:[`The following example has a customized amount of 4 parts (`,(0,c.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,c.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default,s as n,d as r,u as t};