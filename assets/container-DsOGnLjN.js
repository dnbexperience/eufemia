import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import{n as r,t as i}from"./Examples-8clomaI-.js";import a from"./demos-CkFUWgCL.js";var o=e(t());function s(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return r||l(`Examples`,!1),i||l(`Examples.BasicSpan`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Grid } from '@dnb/eufemia'
render(<Grid.Container />)
`})}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/grid/Container.tsx`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/layout/grid/container/`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`Grid.Container`}),` is a building block for `,(0,o.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout`,children:`CSS grid`}),` based layouts.`]}),`
`,(0,o.jsxs)(t.p,{children:[`Use `,(0,o.jsx)(t.a,{href:`/uilib/layout/grid/item`,children:`Grid.Item`}),` for you inner wrappers so you can apply a `,(0,o.jsx)(t.code,{children:`span`}),` to them.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsx`,children:`import { Grid } from '@dnb/eufemia'

render(
  <Grid.Container>
    <Grid.Item span={[1, 6]}>Item A</Grid.Item>
    <Grid.Item span={[7, 12]}>Item B</Grid.Item>
  </Grid.Container>
)
`})}),`
`,(0,o.jsxs)(t.p,{children:[`The columns do change based on what `,(0,o.jsx)(t.a,{href:`/uilib/layout/media-queries/`,children:`breakpoint`}),` the browser is in:`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[`4 columns when `,(0,o.jsx)(t.code,{children:`small`})]}),`
`,(0,o.jsxs)(t.li,{children:[`6 columns when `,(0,o.jsx)(t.code,{children:`medium`})]}),`
`,(0,o.jsxs)(t.li,{children:[`12 columns when `,(0,o.jsx)(t.code,{children:`large`})]}),`
`]}),`
`,(0,o.jsx)(i,{}),`
`,(0,o.jsx)(t.h3,{children:`Gap`}),`
`,(0,o.jsx)(t.p,{children:`By default is no gap given.`})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function u(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(c,{}),`
`,(0,o.jsx)(a,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}export{d as default};