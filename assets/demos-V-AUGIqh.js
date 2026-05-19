import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{t as i}from"./TestElement-CGrmu8xx.js";import{zr as a}from"./index-DqqByKA2.js";import{c as o,s}from"./Examples-XMNda3dQ.js";var c=t({AdvancedSizeExample:()=>m,BasicSize:()=>d,BasicSizeExample:()=>p,Default:()=>u,ResponsiveSize:()=>f}),l=e(n()),u=()=>(0,l.jsx)(r,{scope:{TestElement:i},stableName:`Default`,children:`<Flex.Container>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),d=()=>(0,l.jsx)(r,{stableName:`BasicSize`,children:`<Flex.Container>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
</Flex.Container>
`}),f=()=>(0,l.jsx)(r,{hidePreview:!0,stableName:`ResponsiveSize`,children:`<Flex.Container>
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
`}),p=s,m=o;function h(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return c||_(`Examples`,!1),m||_(`Examples.AdvancedSizeExample`,!0),p||_(`Examples.BasicSizeExample`,!0),u||_(`Examples.Default`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Basic `,(0,l.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,l.jsxs)(t.p,{children:[`With the default `,(0,l.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,l.jsx)(p,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Advanced `,(0,l.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,l.jsxs)(t.p,{children:[`The following example has a customized amount of 4 parts (`,(0,l.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,l.jsx)(m,{})]})}function g(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default,c as n,f as r,d as t};