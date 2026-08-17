import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{s as r}from"./ToggleButton-EPOyxk36.js";import{t as i}from"./TestElement-B-MJGTyS.js";import{U as a}from"./index-CGxQ8PRe.js";import{t as o}from"./ComponentBox-DOwlXUSS.js";import{c as s,s as c}from"./Examples-BrxCSXS3.js";var l=e({AdvancedSizeExample:()=>g,BasicSize:()=>f,BasicSizeExample:()=>h,Default:()=>d,GapOverrides:()=>m,ResponsiveSize:()=>p}),u=t(n()),d=()=>(0,u.jsx)(o,{scope:{TestElement:i},stableName:`Default`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:r},children:`<Flex.Container>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
  <Flex.Item>
    <TestElement>FlexItem</TestElement>
  </Flex.Item>
</Flex.Container>
`}),f=()=>(0,u.jsx)(o,{stableName:`BasicSize`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:r},children:`<Flex.Container>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
  <Flex.Item span={6}>uses 50% in width</Flex.Item>
</Flex.Container>
`}),p=()=>(0,u.jsx)(o,{hidePreview:!0,stableName:`ResponsiveSize`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:r},children:`<Flex.Container>
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
`}),m=()=>(0,u.jsx)(o,{scope:{TestElement:i},stableName:`GapOverrides`,sourceImports:[`import { Flex } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { HorizontalFlexItemResponsiveSize, HorizontalFlexItemResponsiveSizeCustomColumns } from '../../Examples'`],__buildScope:{Flex:r},children:`<Flex.Horizontal layoutEngine="css" gap="small" wrap={false}>
  <Flex.Item>
    <TestElement>Default gap</TestElement>
  </Flex.Item>
  <Flex.Item gapBefore="large">
    <TestElement>Large gap before</TestElement>
  </Flex.Item>
  <Flex.Item gapAfter="xx-large">
    <TestElement>Large gap after</TestElement>
  </Flex.Item>
  <Flex.Item gapBefore="x-small">
    <TestElement>Small gap before wins</TestElement>
  </Flex.Item>
  <Flex.Item gapBefore={false} left="medium">
    <TestElement>No gap plus medium margin</TestElement>
  </Flex.Item>
</Flex.Horizontal>
`}),h=c,g=s;function _(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return l||y(`Examples`,!1),g||y(`Examples.AdvancedSizeExample`,!0),h||y(`Examples.BasicSizeExample`,!0),d||y(`Examples.Default`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsxs)(t.h3,{children:[`Basic `,(0,u.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,u.jsxs)(t.p,{children:[`With the default `,(0,u.jsx)(t.code,{children:`sizeCount`}),` of 12 parts.`]}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsxs)(t.h3,{children:[`Advanced `,(0,u.jsx)(t.code,{children:`span`}),` usage`]}),`
`,(0,u.jsxs)(t.p,{children:[`The following example has a customized amount of 4 parts (`,(0,u.jsx)(t.code,{children:`sizeCount`}),`) as well as custom breakpoints and media queries.`]}),`
`,(0,u.jsx)(g,{})]})}function v(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default,p as i,l as n,m as r,f as t};