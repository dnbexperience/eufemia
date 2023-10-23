import { TestElement } from '@dnb/eufemia/src/extensions/forms'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Grid } from '@dnb/eufemia/src'

const colors = [
  { background: '#babeee' } as React.CSSProperties,
  { background: '#dfe0ee' } as React.CSSProperties,
  { background: '#90d2c3' } as React.CSSProperties,
  { background: '#ecf4be' } as React.CSSProperties,
]

export const ResponsiveUsage = () => {
  return (
    <ComponentBox
      scope={{ TestElement, colors }}
      data-visual-test="grid-container-responsive"
    >
      <Grid.Container rowGap columnGap>
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
    </ComponentBox>
  )
}

export const CustomColumns = () => {
  return (
    <ComponentBox scope={{ Grid, TestElement, colors }}>
      <Grid.Container
        columns={{ small: 4, medium: false }}
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
    </ComponentBox>
  )
}
