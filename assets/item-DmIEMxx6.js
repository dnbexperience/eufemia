import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import{n as r,o as i,t as a}from"./Examples-Yy_80DYT.js";import o from"./demos-cIM-kxIp.js";var s=e(t());function c(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return r||u(`Examples`,!1),a||u(`Examples.BasicSpan`,!0),i||u(`Examples.ResponsiveSpan`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Import`}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-tsx`,children:`import { Grid } from '@dnb/eufemia'
render(<Grid.Item />)
`})}),`
`,(0,s.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/grid/Item.tsx`,children:`Source code`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/grid/item/`,children:`Docs code`})}),`
`]}),`
`,(0,s.jsx)(t.h2,{children:`Description`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`Grid.Item`}),` is a building block for `,(0,s.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout`,children:`CSS grid`}),` based layout of contents and components. Should be used in combination with `,(0,s.jsx)(t.a,{href:`/uilib/layout/grid/container/`,children:`Grid.Container`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`The columns do change based on what `,(0,s.jsx)(t.a,{href:`/uilib/layout/media-queries/`,children:`breakpoint`}),` the browser is in:`]}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[`4 columns when `,(0,s.jsx)(t.code,{children:`small`})]}),`
`,(0,s.jsxs)(t.li,{children:[`6 columns when `,(0,s.jsx)(t.code,{children:`medium`})]}),`
`,(0,s.jsxs)(t.li,{children:[`12 columns when `,(0,s.jsx)(t.code,{children:`large`})]}),`
`]}),`
`,(0,s.jsx)(t.h3,{children:`Span`}),`
`,(0,s.jsxs)(t.p,{children:[`You need to provide a `,(0,s.jsx)(t.code,{children:`span`}),` property with a number from 1 to 12 (can be changed in `,(0,s.jsx)(t.a,{href:`/uilib/layout/grid/container/`,children:`Grid.Container`}),` with the `,(0,s.jsx)(t.code,{children:`columns`}),` property).`]}),`
`,(0,s.jsx)(t.p,{children:`The span will be used to specify where the item is placed in the grid columns.`}),`
`,(0,s.jsx)(t.p,{children:`A span needs always two numbers – from and to.`}),`
`,(0,s.jsx)(a,{}),`
`,(0,s.jsx)(t.p,{children:`Example of spans:`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.code,{children:`span={[1, 'end']}`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.code,{children:`span={{ small: [1, 4], medium: [1, 6], large: [1, 12]}}`})}),`
`]}),`
`,(0,s.jsx)(t.h3,{children:`Responsive spans`}),`
`,(0,s.jsx)(t.p,{children:`You can also make spans respond to media queries.`}),`
`,(0,s.jsxs)(t.p,{children:[`For doing so, provide a `,(0,s.jsx)(t.code,{children:`span`}),` property with an object containing `,(0,s.jsx)(t.a,{href:`/uilib/layout/media-queries/`,children:`Media Query`}),` types. Each media size should contain a span, like mentioned above.`]}),`
`,(0,s.jsx)(i,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function d(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{}),`
`,(0,s.jsx)(o,{})]})}function f(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}export{f as default};