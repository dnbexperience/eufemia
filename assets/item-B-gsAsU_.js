import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n,{n as r,r as i,t as a}from"./demos-38ZY4RQ3.js";var o=e();function s(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return r||l(`Examples`,!1),a||l(`Examples.BasicSize`,!0),i||l(`Examples.ResponsiveSize`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{children:`Import`}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-tsx`,children:`import { Flex } from '@dnb/eufemia'
render(<Flex.Item />)
`})}),`
`,(0,o.jsx)(n.h2,{children:`Description`}),`
`,(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:`Flex.Item`}),` is a building block for `,(0,o.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout`,children:`CSS flexbox`}),` based layout of contents and components. Should be used in combination with `,(0,o.jsx)(n.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),`.`]}),`
`,(0,o.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx`,children:`Source code`})}),`
`,(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:`language-jsx`,children:`import { Flex } from '@dnb/eufemia'

render(
  <Flex.Container>
    <Flex.Item>content</Flex.Item>
  </Flex.Container>
)
`})}),`
`,(0,o.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(n.ul,{children:[`
`,(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/flex/Item.tsx`,children:`Source code`})}),`
`,(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/flex/item/`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(n.h3,{children:`Span adjustment`}),`
`,(0,o.jsxs)(n.p,{children:[`You can provide a `,(0,o.jsx)(n.code,{children:`span`}),` property with a number from 1 to 12 (can be changed in `,(0,o.jsx)(n.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),` with the `,(0,o.jsx)(n.code,{children:`sizeCount`}),` property).`]}),`
`,(0,o.jsx)(n.p,{children:`The number will be used to set the item span (a part of the container). It set a percentage unit and apply it on the item via CSS. When the container is tilled to 100%, the remaining items will wrap to a new row.`}),`
`,(0,o.jsx)(n.p,{children:`The number 6 results in 50%, while 12 results in 100%.`}),`
`,(0,o.jsx)(a,{}),`
`,(0,o.jsx)(n.h3,{children:`Responsive span`}),`
`,(0,o.jsx)(n.p,{children:`You can also make spans respond to media queries.`}),`
`,(0,o.jsxs)(n.p,{children:[`For doing so, provide a `,(0,o.jsx)(n.code,{children:`span`}),` property with an object containing `,(0,o.jsx)(n.a,{href:`/uilib/usage/layout/media-queries/`,children:`Media Query`}),` types. Each media span should contain number, like mentioned above.`]}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsxs)(n.p,{children:[`You need to ensure that `,(0,o.jsx)(n.code,{children:`flex-wrap: wrap`}),` is set, so the remaining items wrap to a new row when needed. This is enabled by default in the `,(0,o.jsx)(n.a,{href:`/uilib/layout/flex/container/`,children:`Flex.Container`}),`.`]})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(n,{})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};