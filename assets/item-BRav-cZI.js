import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-DHCu7dhB.js";import r,{i,n as a,r as o,t as s}from"./demos-BMlTZNvR.js";var c=e(t());function l(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return a||d(`Examples`,!1),s||d(`Examples.BasicSize`,!0),o||d(`Examples.GapOverrides`,!0),i||d(`Examples.ResponsiveSize`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Import`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'
render(<Flex.Item />)
`})}),`
`,(0,c.jsx)(t.h2,{children:`Description`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`Flex.Item`}),` is a building block for `,(0,c.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout`,children:`CSS flexbox`}),`-based layout of contents and components. Should be used in combination with `,(0,c.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),`.`]}),`
`,(0,c.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx`,children:`Source code`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item`,children:`Docs code`})}),`
`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
  </Flex.Container>
)
`})}),`
`,(0,c.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx`,children:`Source code`})}),`
`,(0,c.jsx)(t.li,{children:(0,c.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item/`,children:`Docs code`})}),`
`]}),`
`,(0,c.jsx)(t.h3,{children:`Per-item gap overrides`}),`
`,(0,c.jsxs)(t.p,{children:[`With `,(0,c.jsx)(t.code,{children:`layoutEngine="css"`}),`, use `,(0,c.jsx)(t.code,{children:`gapBefore`}),` or `,(0,c.jsx)(t.code,{children:`gapAfter`}),` to replace the container gap next to a specific item. They follow the container's main axis: before/after maps to left/right in horizontal layouts and top/bottom in vertical layouts. Use `,(0,c.jsx)(t.code,{children:`false`}),` to remove that gap.`]}),`
`,(0,c.jsxs)(t.p,{children:[`Regular spacing properties such as `,(0,c.jsx)(t.code,{children:`left`}),`, `,(0,c.jsx)(t.code,{children:`right`}),`, `,(0,c.jsx)(t.code,{children:`top`}),`, and `,(0,c.jsx)(t.code,{children:`bottom`}),` are added to the resolved gap. If two adjacent items define the same gap, the following item's `,(0,c.jsx)(t.code,{children:`gapBefore`}),` takes precedence over the previous item's `,(0,c.jsx)(t.code,{children:`gapAfter`}),`.`]}),`
`,(0,c.jsx)(o,{}),`
`,(0,c.jsx)(t.h3,{children:`Span adjustment`}),`
`,(0,c.jsxs)(t.p,{children:[`You can provide a `,(0,c.jsx)(t.code,{children:`span`}),` property with a number from 1 to 12 (can be changed in `,(0,c.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),` with the `,(0,c.jsx)(t.code,{children:`sizeCount`}),` property).`]}),`
`,(0,c.jsx)(t.p,{children:`The number will be used to set the item span (a part of the container). It sets a percentage unit and applies it on the item via CSS. When the container is filled to 100%, the remaining items will wrap to a new row.`}),`
`,(0,c.jsx)(t.p,{children:`The number 6 results in 50%, while 12 results in 100%.`}),`
`,(0,c.jsx)(s,{}),`
`,(0,c.jsx)(t.h3,{children:`Responsive span`}),`
`,(0,c.jsx)(t.p,{children:`You can also make spans respond to media queries.`}),`
`,(0,c.jsxs)(t.p,{children:[`For doing so, provide a `,(0,c.jsx)(t.code,{children:`span`}),` property with an object containing `,(0,c.jsx)(t.a,{href:`/uilib/layout/media-queries/`,children:`Media Query`}),` types. Each media span should contain a number, like mentioned above.`]}),`
`,(0,c.jsx)(i,{}),`
`,(0,c.jsxs)(t.p,{children:[`You need to ensure that `,(0,c.jsx)(t.code,{children:`flex-wrap: wrap`}),` is set, so the remaining items wrap to a new row when needed. This is enabled by default in the `,(0,c.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),`.`]})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function f(e){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(u,{}),`
`,(0,c.jsx)(r,{})]})}function p(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}export{p as default};