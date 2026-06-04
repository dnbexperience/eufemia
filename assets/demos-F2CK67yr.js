import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./export-BnZzhjZv.js";import{t as i}from"./TestElement-DmEMnVl4.js";import{W as a}from"./index-D7e1avVt.js";import{t as o}from"./ComponentBox-CE7bpcJy.js";var s=e({ResponsiveGridContainer:()=>u,colors:()=>l}),c=t(n()),l=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],u=()=>(0,c.jsx)(o,{scope:{TestElement:i,colors:l},stableName:`ResponsiveGridContainer`,sourceImports:[`import { CSSProperties } from 'react'`,`import { Grid } from '@dnb/eufemia'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Grid:r},children:`<Grid.Container rowGap columnGap>
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
`});function d(e){let t={h2:`h2`,h3:`h3`,...a(),...e.components};return s||p(`Examples`,!1),u||p(`Examples.ResponsiveGridContainer`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Responsive Grid.Container`}),`
`,(0,c.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};