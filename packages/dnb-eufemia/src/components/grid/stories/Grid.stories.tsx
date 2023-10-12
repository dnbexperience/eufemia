/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'

import { Grid } from '../..'
import '../style'

export default {
  title: 'Eufemia/Components/Layout',
}

export const colors = [
  { background: '#babeee' } as React.CSSProperties,
  { background: '#dfe0ee' } as React.CSSProperties,
  { background: '#90d2c3' } as React.CSSProperties,
  { background: '#ecf4be' } as React.CSSProperties,
]

export const GridLayout = () => {
  return (
    <Grid.Container
      // columns={12}
      // columns={{ small: 4, medium: false }}
      rowGap
      columnGap
    >
      <Grid.Item
        span={{
          small: 'full',
          medium: [1, 2],
          large: [1, 12],
        }}
        style={colors[0]}
      >
        Item A
      </Grid.Item>

      <Grid.Item
        span={{
          small: [2, 4],
          medium: 'full',
          large: [1, 4],
        }}
        style={colors[1]}
      >
        Item B
      </Grid.Item>

      <Grid.Item
        span={{
          small: [3, 4],
          medium: [3, 6],
          large: [5, 8],
        }}
        style={colors[2]}
      >
        Item C
      </Grid.Item>

      <Grid.Item
        span={{
          small: [4, 'end'],
          medium: [3, 6],
          large: [9, 12],
        }}
        style={colors[3]}
      >
        Item D
      </Grid.Item>
    </Grid.Container>
  )
}
