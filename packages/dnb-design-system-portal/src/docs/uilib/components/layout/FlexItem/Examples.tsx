import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, Slider } from '@dnb/eufemia/src'
import {
  TestElement,
  Field,
  FieldBlock,
} from '@dnb/eufemia/src/extensions/forms'
import {
  HorizontalFlexItemResponsiveSize,
  HorizontalFlexItemResponsiveSizeCustomColumns,
} from '../Examples'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
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

export const AutoSize = () => {
  return (
    <ComponentBox
      scope={{
        Field,
        FieldBlock,
      }}
    >
      <FieldBlock label="Label">
        <Layout.FlexContainer>
          <Layout.FlexItem size={{ small: 12, large: 'auto' }}>
            <Field.String
              path="/firstName"
              label="First name"
              width="medium"
              minLength={2}
            />
          </Layout.FlexItem>
          <Layout.FlexItem size={{ small: 12, large: 'auto' }}>
            <Field.String
              path="/lastName"
              label="Last name"
              width="medium"
              required
            />
          </Layout.FlexItem>
          <Layout.FlexItem size={{ small: 12, large: 'auto' }}>
            <FieldBlock width="large">
              <Slider
                min={1900}
                max={new Date().getFullYear()}
                step={1}
                value={2010}
                label="Birth year"
                label_direction="vertical"
                tooltip
                alwaysShowTooltip
              />
            </FieldBlock>
          </Layout.FlexItem>
        </Layout.FlexContainer>
      </FieldBlock>
    </ComponentBox>
  )
}

export const BasicSizeExample = HorizontalFlexItemResponsiveSize

export const AdvancedSizeExample =
  HorizontalFlexItemResponsiveSizeCustomColumns
