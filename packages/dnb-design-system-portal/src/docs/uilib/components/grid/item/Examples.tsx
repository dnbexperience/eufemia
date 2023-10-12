import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { TestElement } from '@dnb/eufemia/src/extensions/forms'
import { Input, Grid } from '@dnb/eufemia/src'

export const BasicSpan = () => {
  return (
    <ComponentBox>
      <Grid.Container>
        <Grid.Item span={[1, 6]}>uses 50% in width</Grid.Item>
        <Grid.Item span={[7, 12]}>uses 50% in width</Grid.Item>
      </Grid.Container>
    </ComponentBox>
  )
}

export const ResponsiveSpan = () => {
  return (
    <ComponentBox>
      <Grid.Container>
        <Grid.Item span={{ small: [1, 12], large: [1, 6] }}>
          uses 50% or 100% based on the screen size
        </Grid.Item>
        <Grid.Item span={{ small: [1, 12], large: [7, 12] }}>
          uses 50% or 100% based on the screen size
        </Grid.Item>
      </Grid.Container>
    </ComponentBox>
  )
}

const colors = [
  { background: '#babeee' } as React.CSSProperties,
  { background: '#dfe0ee' } as React.CSSProperties,
  { background: '#90d2c3' } as React.CSSProperties,
  { background: '#ecf4be' } as React.CSSProperties,
]

export const ResponsiveAdvanced = () => {
  return (
    <ComponentBox scope={{ TestElement, colors }}>
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

export const OrderHorizontal = () => {
  const Item = ({ children }) => {
    return (
      <Input stretch selectall>
        {children}
      </Input>
    )
  }
  return (
    <ComponentBox scope={{ Item }}>
      <Grid.Container rowGap columnGap columns={12}>
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
    </ComponentBox>
  )
}

export const OrderVertical = () => {
  const Item = ({ children }) => {
    return (
      <Input stretch selectall>
        {children}
      </Input>
    )
  }
  return (
    <ComponentBox scope={{ Item }}>
      <Grid.Container rowGap columnGap columns={12}>
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
    </ComponentBox>
  )
}
