import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r,{n as i,r as a,t as o}from"./demos-CTvmjmBW.js";var s=e(t());function c(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return i||u(`Examples`,!1),o||u(`Examples.BasicSize`,!0),a||u(`Examples.ResponsiveSize`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Import`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'
render(<Flex.Item />)
`})}),`
`,(0,s.jsx)(t.h2,{children:`Description`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`Flex.Item`}),` is a building block for `,(0,s.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout`,children:`CSS flexbox`}),`-based layout of contents and components. Should be used in combination with `,(0,s.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),`.`]}),`
`,(0,s.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx`,children:`Source code`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item`,children:`Docs code`})}),`
`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
  </Flex.Container>
)
`})}),`
`,(0,s.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx`,children:`Source code`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item/`,children:`Docs code`})}),`
`]}),`
`,(0,s.jsx)(t.h3,{children:`Span adjustment`}),`
`,(0,s.jsxs)(t.p,{children:[`You can provide a `,(0,s.jsx)(t.code,{children:`span`}),` property with a number from 1 to 12 (can be changed in `,(0,s.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),` with the `,(0,s.jsx)(t.code,{children:`sizeCount`}),` property).`]}),`
`,(0,s.jsx)(t.p,{children:`The number will be used to set the item span (a part of the container). It sets a percentage unit and applies it on the item via CSS. When the container is filled to 100%, the remaining items will wrap to a new row.`}),`
`,(0,s.jsx)(t.p,{children:`The number 6 results in 50%, while 12 results in 100%.`}),`
`,(0,s.jsx)(o,{}),`
`,(0,s.jsx)(t.h3,{children:`Responsive span`}),`
`,(0,s.jsx)(t.p,{children:`You can also make spans respond to media queries.`}),`
`,(0,s.jsxs)(t.p,{children:[`For doing so, provide a `,(0,s.jsx)(t.code,{children:`span`}),` property with an object containing `,(0,s.jsx)(t.a,{href:`/uilib/layout/media-queries/`,children:`Media Query`}),` types. Each media span should contain a number, like mentioned above.`]}),`
`,(0,s.jsx)(a,{}),`
`,(0,s.jsxs)(t.p,{children:[`You need to ensure that `,(0,s.jsx)(t.code,{children:`flex-wrap: wrap`}),` is set, so the remaining items wrap to a new row when needed. This is enabled by default in the `,(0,s.jsx)(t.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),`.`]})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function d(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{}),`
`,(0,s.jsx)(r,{})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}export{f as default};