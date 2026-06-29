import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./TestElement-CJNwFdUL.js";import{t as i}from"./export-D2BP5X_D.js";import{U as a}from"./index-BsJ3GLEw.js";import{t as o}from"./ComponentBox-sLMgHvLi.js";var s=e({CustomColumns:()=>d,ResponsiveUsage:()=>u}),c=t(n()),l=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],u=()=>(0,c.jsx)(o,{scope:{TestElement:r,colors:l},"data-visual-test":`grid-container-responsive`,stableName:`ResponsiveUsage`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Grid } from '@dnb/eufemia'`],__buildScope:{Grid:i},children:`<Grid.Container rowGap columnGap>
  <Grid.Item
    span={{
      small: [1, 2],
      medium: [1, 3],
      large: [1, 12],
    }}
    style={colors[0]}
    element={TestElement}
  >
    Item A
  </Grid.Item>

  <Grid.Item
    span={{
      small: [3, 4],
      medium: [4, 6],
      large: [1, 4],
    }}
    style={colors[1]}
    element={TestElement}
  >
    Item B
  </Grid.Item>

  <Grid.Item
    span={{
      small: [2, 3],
      medium: [4, 6],
      large: [5, 8],
    }}
    style={colors[2]}
    element={TestElement}
  >
    Item C
  </Grid.Item>

  <Grid.Item
    span={{
      small: [1, 4],
      medium: [4, 6],
      large: [9, 12],
    }}
    style={colors[3]}
    element={TestElement}
  >
    Item D
  </Grid.Item>
</Grid.Container>
`}),d=()=>(0,c.jsx)(o,{scope:{Grid:i,TestElement:r,colors:l},stableName:`CustomColumns`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Grid } from '@dnb/eufemia'`],__buildScope:{Grid:i},children:`<Grid.Container
  columns={{
    small: 4,
    medium: false,
  }}
  // columns={12} // only 12
  rowGap
  columnGap
>
  <Grid.Item
    span={{
      small: 'full',
      large: [1, 12],
    }}
    style={colors[0]}
    element={TestElement}
  >
    Item A
  </Grid.Item>

  <Grid.Item
    span={{
      small: [1, 'end'],
      large: [1, 6],
    }}
    style={colors[1]}
    element={TestElement}
  >
    Item B
  </Grid.Item>

  <Grid.Item
    span={{
      small: [1, 2],
      large: [7, 'end'],
    }}
    style={colors[2]}
    element={TestElement}
  >
    Item C
  </Grid.Item>

  <Grid.Item
    span={{
      small: [3, 4],
      large: 'full',
    }}
    style={colors[3]}
    element={TestElement}
  >
    Item D
  </Grid.Item>
</Grid.Container>
`});function f(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return s||m(`Examples`,!1),d||m(`Examples.CustomColumns`,!0),u||m(`Examples.ResponsiveUsage`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Responsive grid usage`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Custom columns`}),`
`,(0,c.jsxs)(t.p,{children:[`When `,(0,c.jsx)(t.code,{children:`medium`}),` CSS Grid is disabled by using `,(0,c.jsx)(t.code,{children:`false`}),`.`]}),`
`,(0,c.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(f,{...e})}):f(e)}function m(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{p as default};