import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{t as r}from"./TestElement-7TlpAKwo.js";import{Rr as i}from"./index-CMgyXmp3.js";var a=e({ResponsiveGridContainer:()=>c,colors:()=>s}),o=t(),s=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],c=()=>(0,o.jsx)(n,{scope:{TestElement:r,colors:s},children:`<Grid.Container rowGap columnGap>
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||d(`Examples`,!1),c||d(`Examples.ResponsiveGridContainer`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Responsive Grid.Container`}),`
`,(0,o.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};