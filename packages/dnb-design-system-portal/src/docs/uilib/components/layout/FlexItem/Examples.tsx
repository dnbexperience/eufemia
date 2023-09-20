import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src'
import { TestElement, Field } from '@dnb/eufemia/src/extensions/forms'
import { HorizontalFlexItemResponsiveSizeCustomColumns } from '../Examples'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexItem>Contents</Layout.FlexItem>
    </ComponentBox>
  )
}

export const BasicSize = () => {
  return (
    <ComponentBox hidePreview>
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

export const AdvancedExample =
  HorizontalFlexItemResponsiveSizeCustomColumns
