import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";import{t as r}from"./TestElement-MT0d0dhJ.js";import{vr as i}from"./index--zEB_f_m.js";var a=e({BasicSpan:()=>s,OrderHorizontal:()=>d,OrderVertical:()=>f,ResponsiveAdvanced:()=>u,ResponsiveSpan:()=>c}),o=t(),s=()=>(0,o.jsx)(n,{children:`<Grid.Container>
  <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
  <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
</Grid.Container>
`}),c=()=>(0,o.jsx)(n,{children:`<Grid.Container>
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
`}),l=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],u=()=>(0,o.jsx)(n,{scope:{TestElement:r,colors:l},children:`<Grid.Container rowGap columnGap>
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
`}),d=()=>(0,o.jsx)(n,{scope:{Item:({children:e})=>(0,o.jsx)(i,{stretch:!0,selectAll:!0,children:e})},children:`<Grid.Container rowGap columnGap columns={12}>
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
`}),f=()=>(0,o.jsx)(n,{scope:{Item:({children:e})=>(0,o.jsx)(i,{stretch:!0,selectAll:!0,children:e})},children:`<Grid.Container rowGap columnGap columns={12}>
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
`});export{u as a,f as i,a as n,c as o,d as r,s as t};