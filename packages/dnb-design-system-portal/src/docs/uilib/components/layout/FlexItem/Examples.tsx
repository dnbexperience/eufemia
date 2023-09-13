import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'
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
      <Layout.FlexContainer direction="horizontal">
        <Layout.FlexItem size={6}>uses 50% in width</Layout.FlexItem>
        <Layout.FlexItem size={6}>uses 50% in width</Layout.FlexItem>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ResponsiveSize = () => {
  return (
    <ComponentBox hidePreview>
      <Layout.FlexContainer direction="horizontal">
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

export const Widths = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <P>No width (default)</P>
        <Layout.FlexItem>
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
        <P>Small</P>
        <Layout.FlexItem width="small">
          <TestElement>Cont.</TestElement>
        </Layout.FlexItem>
        <P>Medium</P>
        <Layout.FlexItem width="medium">
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
        <P>Large</P>
        <Layout.FlexItem width="large">
          <TestElement>Contents</TestElement>
        </Layout.FlexItem>
      </Layout.Card>
    </ComponentBox>
  )
}
