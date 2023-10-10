import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src'
import { TestElement } from '@dnb/eufemia/src/extensions/forms'
import {
  HorizontalFlexItemResponsiveSize,
  HorizontalFlexItemResponsiveSizeCustomColumns,
  HorizontalAutoSize,
} from '../Examples'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement }}>
      <Layout.FlexContainer>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const BasicSize = () => {
  return (
    <ComponentBox>
      <Layout.FlexContainer>
        <Layout.FlexItem size={6}>uses 50% in width</Layout.FlexItem>
        <Layout.FlexItem size={6}>uses 50% in width</Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ResponsiveSize = () => {
  return (
    <ComponentBox hidePreview>
      <Layout.FlexContainer>
        <Layout.FlexItem size={{ small: 12, large: 6 }}>
          uses 50% or 100% based on the screen size
        </Layout.FlexItem>
        <Layout.FlexItem size={{ small: 12, large: 6 }}>
          uses 50% or 100% based on the screen size
        </Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const AutoSize = HorizontalAutoSize
export const BasicSizeExample = HorizontalFlexItemResponsiveSize
export const AdvancedSizeExample =
  HorizontalFlexItemResponsiveSizeCustomColumns
