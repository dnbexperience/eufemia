import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-geTEYZ7b.js";import{t as i}from"./TestElement-7TlpAKwo.js";import{Gn as a}from"./index-CMgyXmp3.js";var o=e({BasicSpan:()=>c,OrderHorizontal:()=>f,OrderVertical:()=>p,ResponsiveAdvanced:()=>d,ResponsiveSpan:()=>l});t();var s=n(),c=()=>(0,s.jsx)(r,{children:`<Grid.Container>
  <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
  <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
</Grid.Container>
`}),l=()=>(0,s.jsx)(r,{children:`<Grid.Container>
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
`}),u=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],d=()=>(0,s.jsx)(r,{scope:{TestElement:i,colors:u},children:`<Grid.Container rowGap columnGap>
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
`}),f=()=>(0,s.jsx)(r,{scope:{Item:({children:e})=>(0,s.jsx)(a,{stretch:!0,selectAll:!0,children:e})},children:`<Grid.Container rowGap columnGap columns={12}>
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
`}),p=()=>(0,s.jsx)(r,{scope:{Item:({children:e})=>(0,s.jsx)(a,{stretch:!0,selectAll:!0,children:e})},children:`<Grid.Container rowGap columnGap columns={12}>
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
`});export{d as a,p as i,o as n,l as o,f as r,c as t};