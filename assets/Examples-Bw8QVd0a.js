import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{F as r}from"./Autocomplete-eAFtuLbJ.js";import{t as i}from"./TestElement-CJNwFdUL.js";import{t as a}from"./export-D2BP5X_D.js";import{t as o}from"./ComponentBox-sLMgHvLi.js";var s=e({BasicSpan:()=>l,OrderHorizontal:()=>p,OrderVertical:()=>m,ResponsiveAdvanced:()=>f,ResponsiveSpan:()=>u}),c=t(n()),l=()=>(0,c.jsx)(o,{stableName:`BasicSpan`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Input, Grid } from '@dnb/eufemia'`],__buildScope:{Grid:a},children:`<Grid.Container>
  <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
  <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
</Grid.Container>
`}),u=()=>(0,c.jsx)(o,{stableName:`ResponsiveSpan`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Input, Grid } from '@dnb/eufemia'`],__buildScope:{Grid:a},children:`<Grid.Container>
  <Grid.Item
    span={{
      small: [1, 12],
      large: [1, 6],
    }}
  >
    uses 50% or 100% based on the screen size
  </Grid.Item>
  <Grid.Item
    span={{
      small: [1, 12],
      large: [7, 12],
    }}
  >
    uses 50% or 100% based on the screen size
  </Grid.Item>
</Grid.Container>
`}),d=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],f=()=>(0,c.jsx)(o,{scope:{TestElement:i,colors:d},stableName:`ResponsiveAdvanced`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Input, Grid } from '@dnb/eufemia'`],__buildScope:{Grid:a},children:`<Grid.Container rowGap columnGap>
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
`}),p=()=>(0,c.jsx)(o,{scope:{Item:({children:e})=>(0,c.jsx)(r,{stretch:!0,selectAll:!0,children:e})},stableName:`OrderHorizontal`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Input, Grid } from '@dnb/eufemia'`],__buildScope:{Grid:a},children:`<Grid.Container rowGap columnGap columns={12}>
  <Grid.Item span={[1, 6]}>
    <Item>Left top</Item>
  </Grid.Item>
  <Grid.Item span={[7, 12]}>
    <Item>Right top</Item>
  </Grid.Item>
  <Grid.Item span={[1, 6]}>
    <Item>Left bottom</Item>
  </Grid.Item>
  <Grid.Item span={[7, 12]}>
    <Item>Right bottom</Item>
  </Grid.Item>
</Grid.Container>
`}),m=()=>(0,c.jsx)(o,{scope:{Item:({children:e})=>(0,c.jsx)(r,{stretch:!0,selectAll:!0,children:e})},stableName:`OrderVertical`,sourceImports:[`import { CSSProperties } from 'react'`,`import { TestElement } from '@dnb/eufemia/extensions/forms'`,`import { Input, Grid } from '@dnb/eufemia'`],__buildScope:{Grid:a},children:`<Grid.Container rowGap columnGap columns={12}>
  <Grid.Item span={[1, 6]}>
    <Item>Left top</Item>
  </Grid.Item>
  <Grid.Item span={[1, 6]}>
    <Item>Left bottom</Item>
  </Grid.Item>
  <Grid.Item span={[7, 12]}>
    <Item>Right top</Item>
  </Grid.Item>
  <Grid.Item span={[7, 12]}>
    <Item>Right bottom</Item>
  </Grid.Item>
</Grid.Container>
`});export{f as a,m as i,s as n,u as o,p as r,l as t};