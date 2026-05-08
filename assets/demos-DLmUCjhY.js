import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{U as n,t as r}from"./ComponentBox-DPdYTeDv.js";import{t as i}from"./TestElement-MT0d0dhJ.js";import{Lr as a}from"./index--zEB_f_m.js";var o=e({CustomColumns:()=>u,ResponsiveUsage:()=>l}),s=t(),c=[{background:`#babeee`},{background:`#dfe0ee`},{background:`#90d2c3`},{background:`#ecf4be`}],l=()=>(0,s.jsx)(r,{scope:{TestElement:i,colors:c},"data-visual-test":`grid-container-responsive`,children:`<Grid.Container rowGap columnGap>
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
`}),u=()=>(0,s.jsx)(r,{scope:{Grid:n,TestElement:i,colors:c},children:`<Grid.Container
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
`});function d(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...a(),...e.components};return o||p(`Examples`,!1),u||p(`Examples.CustomColumns`,!0),l||p(`Examples.ResponsiveUsage`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Responsive grid usage`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Custom columns`}),`
`,(0,s.jsxs)(t.p,{children:[`When `,(0,s.jsx)(t.code,{children:`medium`}),` CSS Grid is disabled by using `,(0,s.jsx)(t.code,{children:`false`}),`.`]}),`
`,(0,s.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};