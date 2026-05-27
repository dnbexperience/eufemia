import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./TestElement-C-9nbb_r.js";import{Rr as i,un as a}from"./index-Da-r8F54.js";import{t as o}from"./ComponentBox-DXeEXSK2.js";import{c as s,s as c}from"./Examples-CvLXar7O.js";var l=t({AdvancedSizeExample:()=>h,BasicSize:()=>f,BasicSizeExample:()=>m,Default:()=>d,ResponsiveSize:()=>p}),u=e(n()),d=()=>(0,u.jsx)(o,{scope:{TestElement:r},stableName:`Default`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:a},children:`<Flex.Container>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),f=()=>(0,u.jsx)(o,{stableName:`BasicSize`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:a},children:`<Flex.Container>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
</Flex.Container>
`}),p=()=>(0,u.jsx)(o,{hidePreview:!0,stableName:`ResponsiveSize`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:a},children:`<Flex.Container>
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
`}),m=c,h=s;function g(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return l||v(`Examples`,!1),h||v(`Examples.AdvancedSizeExample`,!0),m||v(`Examples.BasicSizeExample`,!0),d||v(`Examples.Default`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsxs)(t.h3,{children:[`Basic `,(0,u.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,u.jsxs)(t.p,{children:[`With the default `,(0,u.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsxs)(t.h3,{children:[`Advanced `,(0,u.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,u.jsxs)(t.p,{children:[`The following example has a customized amount of 4 parts (`,(0,u.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,u.jsx)(h,{})]})}function _(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default,l as n,p as r,f as t};