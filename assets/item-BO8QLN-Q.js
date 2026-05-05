import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{n,o as r,t as i}from"./Examples-CTST4f97.js";import a from"./demos-D_GR74-D.js";var o=e();function s(e){let a={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return n||l(`Examples`,!1),i||l(`Examples.BasicSpan`,!0),r||l(`Examples.ResponsiveSpan`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a.h2,{children:`Import`}),`
`,(0,o.jsx)(a.pre,{children:(0,o.jsx)(a.code,{className:`language-tsx`,children:`import { Grid } from '@dnb/eufemia'
render(<Grid.Item />)
`})}),`
`,(0,o.jsx)(a.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(a.ul,{children:[`
`,(0,o.jsx)(a.li,{children:(0,o.jsx)(a.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/grid/Item.tsx`,children:`Source code`})}),`
`,(0,o.jsx)(a.li,{children:(0,o.jsx)(a.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/grid/item/`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(a.h2,{children:`Description`}),`
`,(0,o.jsxs)(a.p,{children:[(0,o.jsx)(a.code,{children:`Grid.Item`}),` is a building block for `,(0,o.jsx)(a.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout`,children:`CSS grid`}),` based layout of contents and components. Should be used in combination with `,(0,o.jsx)(a.a,{href:`/uilib/layout/grid/container/`,children:`Grid.Container`}),`.`]}),`
`,(0,o.jsxs)(a.p,{children:[`The columns do change based on what `,(0,o.jsx)(a.a,{href:`/uilib/usage/layout/media-queries/`,children:`breakpoint`}),` the browser is in:`]}),`
`,(0,o.jsxs)(a.ul,{children:[`
`,(0,o.jsxs)(a.li,{children:[`4 columns when `,(0,o.jsx)(a.code,{children:`small`})]}),`
`,(0,o.jsxs)(a.li,{children:[`6 columns when `,(0,o.jsx)(a.code,{children:`medium`})]}),`
`,(0,o.jsxs)(a.li,{children:[`12 columns when `,(0,o.jsx)(a.code,{children:`large`})]}),`
`]}),`
`,(0,o.jsx)(a.h3,{children:`Span`}),`
`,(0,o.jsxs)(a.p,{children:[`You need to provide a `,(0,o.jsx)(a.code,{children:`span`}),` property with a number from 1 to 12 (can be changed in `,(0,o.jsx)(a.a,{href:`/uilib/layout/grid/container/`,children:`Grid.Container`}),` with the `,(0,o.jsx)(a.code,{children:`columns`}),` property).`]}),`
`,(0,o.jsx)(a.p,{children:`The span will be used to specify where the item is placed in the grid columns.`}),`
`,(0,o.jsx)(a.p,{children:`A span needs always two numbers – from and to.`}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsx)(a.p,{children:`Example of spans:`}),`
`,(0,o.jsxs)(a.ul,{children:[`
`,(0,o.jsx)(a.li,{children:(0,o.jsx)(a.code,{children:`span={[1, 'end']}`})}),`
`,(0,o.jsx)(a.li,{children:(0,o.jsx)(a.code,{children:`span={{ small: [1, 4], medium: [1, 6], large: [1, 12]}}`})}),`
`]}),`
`,(0,o.jsx)(a.h3,{children:`Responsive spans`}),`
`,(0,o.jsx)(a.p,{children:`You can also make spans respond to media queries.`}),`
`,(0,o.jsxs)(a.p,{children:[`For doing so, provide a `,(0,o.jsx)(a.code,{children:`span`}),` property with an object containing `,(0,o.jsx)(a.a,{href:`/uilib/usage/layout/media-queries/`,children:`Media Query`}),` types. Each media size should contain a span, like mentioned above.`]}),`
`,(0,o.jsx)(r,{})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(a,{})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};