import { TestElement } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src'

const Grid = Layout.Grid
const Item = Layout.Grid.Item
const colors = [
  { background: '#babeee' } as React.CSSProperties,
  { background: '#dfe0ee' } as React.CSSProperties,
  { background: '#90d2c3' } as React.CSSProperties,
  { background: '#ecf4be' } as React.CSSProperties,
]

export const ResponsiveUsage = () => {
  return (
    <ComponentBox
      scope={{ Grid, Item, TestElement, colors }}
      data-visual-test="layout-grid-container-responsive"
    >
      <Grid rowGap columnGap>
        <Item
          span={{
            small: [1, 6],
            medium: [1, 2],
            large: [1, 12],
          }}
          style={colors[0]}
          element={TestElement}
        >
          Item A
        </Item>

        <Item
          span={{
            small: [7, 12],
            medium: [3, 4],
            large: [1, 4],
          }}
          style={colors[1]}
          element={TestElement}
        >
          Item B
        </Item>

        <Item
          span={{
            small: [2, 11],
            medium: [3, 4],
            large: [5, 8],
          }}
          style={colors[2]}
          element={TestElement}
        >
          Item C
        </Item>

        <Item
          span={{
            small: [1, 12],
            medium: [3, 4],
            large: [9, 12],
          }}
          style={colors[3]}
          element={TestElement}
        >
          Item D
        </Item>
      </Grid>
    </ComponentBox>
  )
}

export const CustomColumns = () => {
  return (
    <ComponentBox scope={{ Grid, Item, TestElement, colors }}>
      <Grid
        columns={{ small: 4, medium: false }}
        // columns={12} // only 12
        rowGap
        columnGap
      >
        <Item
          span={{
            small: [1, 6],
            large: [1, 12],
          }}
          style={colors[0]}
          element={TestElement}
        >
          Item A
        </Item>

        <Item
          span={{
            small: [7, 12],
            large: [1, 4],
          }}
          style={colors[1]}
          element={TestElement}
        >
          Item B
        </Item>

        <Item
          span={{
            small: [2, 11],
            large: [5, 8],
          }}
          style={colors[2]}
          element={TestElement}
        >
          Item C
        </Item>

        <Item
          span={{
            small: [1, 12],
            large: [9, 12],
          }}
          style={colors[3]}
          element={TestElement}
        >
          Item D
        </Item>
      </Grid>
    </ComponentBox>
  )
}
