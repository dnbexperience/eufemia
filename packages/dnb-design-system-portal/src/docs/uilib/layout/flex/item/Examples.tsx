import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { TestElement } from '@dnb/eufemia/src/extensions/forms'
import {
  HorizontalFlexItemResponsiveSize,
  HorizontalFlexItemResponsiveSizeCustomColumns,
} from '../../Examples'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Flex.Container>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
        <Flex.Item>
          <TestElement>FlexItem</TestElement>
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const BasicSize = () => {
  return (
    <ComponentBox>
      <Flex.Container>
        <Flex.Item size={6}>uses 50% in width</Flex.Item>
        <Flex.Item size={6}>uses 50% in width</Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const ResponsiveSize = () => {
  return (
    <ComponentBox hidePreview>
      <Flex.Container>
        <Flex.Item size={{ small: 12, large: 6 }}>
          uses 50% or 100% based on the screen size
        </Flex.Item>
        <Flex.Item size={{ small: 12, large: 6 }}>
          uses 50% or 100% based on the screen size
        </Flex.Item>
      </Flex.Container>
    </ComponentBox>
  )
}

export const BasicSizeExample = HorizontalFlexItemResponsiveSize
export const AdvancedSizeExample =
  HorizontalFlexItemResponsiveSizeCustomColumns
