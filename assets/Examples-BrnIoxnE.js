import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{t as i}from"./TestElement-CGrmu8xx.js";import{_r as a}from"./index-DqqByKA2.js";var o=t({BasicSpan:()=>c,OrderHorizontal:()=>f,OrderVertical:()=>p,ResponsiveAdvanced:()=>d,ResponsiveSpan:()=>l}),s=e(n()),c=()=>(0,s.jsx)(r,{stableName:`BasicSpan`,children:`<Grid.Container>
  <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
  <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
</Grid.Container>
`}),l=()=>(0,s.jsx)(r,{stableName:`ResponsiveSpan`,children:`<Grid.Container>
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
`}),u=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],d=()=>(0,s.jsx)(r,{scope:{TestElement:i,colors:u},stableName:`ResponsiveAdvanced`,children:`<Grid.Container rowGap columnGap>
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
`}),f=()=>(0,s.jsx)(r,{scope:{Item:({children:e})=>(0,s.jsx)(a,{stretch:!0,selectAll:!0,children:e})},stableName:`OrderHorizontal`,children:`<Grid.Container rowGap columnGap columns={12}>
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
`}),p=()=>(0,s.jsx)(r,{scope:{Item:({children:e})=>(0,s.jsx)(a,{stretch:!0,selectAll:!0,children:e})},stableName:`OrderVertical`,children:`<Grid.Container rowGap columnGap columns={12}>
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