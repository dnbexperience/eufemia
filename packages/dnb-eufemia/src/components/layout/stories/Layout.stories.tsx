/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import { Layout } from '../..'
import '../style'

export default {
  title: 'Eufemia/Components/Layout',
}

const Grid = Layout.Grid
const Item = Layout.Grid.Item
// const { GridContainer: Grid, GridItem: Item } = Layout

export const colors = [
  { background: '#babeee' } as React.CSSProperties,
  { background: '#dfe0ee' } as React.CSSProperties,
  { background: '#90d2c3' } as React.CSSProperties,
  { background: '#ecf4be' } as React.CSSProperties,
]

export const GridLayout = () => {
  return (
    <Grid
      // columns={12}
      // columns={{ small: 4, medium: false }}
      rowGap
      columnGap
    >
      <Item
        span={{
          small: [1, 6],
          medium: [1, 2],
          large: [1, 12],
        }}
        style={colors[0]}
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
      >
        Item D
      </Item>
    </Grid>
  )
}
