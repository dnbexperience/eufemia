import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout } from '@dnb/eufemia/src'
import { TestElement, Field } from '@dnb/eufemia/src/extensions/forms'

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

export const HorizontalWithFieldString = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="horizontal" wrap={false}>
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" width="medium" />
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const HorizontalWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="horizontal">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
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

export const HorizontalWithFlexItemJustifyCenter = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="horizontal" justify="center">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
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

export const HorizontalWithFlexItemJustifyFlexEnd = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="horizontal" justify="flex-end">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
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

export const VerticalWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="vertical">
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
        <Layout.FlexItem>
          <TestElement>FlexItem</TestElement>
        </Layout.FlexItem>
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

export const VerticalWithCard = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="vertical">
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const VerticalWithFieldString = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <Layout.FlexContainer direction="vertical">
          <Field.String label="Label" value="Foo" />
          <Field.String label="Label" value="Foo" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const VerticalSpaceDivider = () => {
  return (
    <ComponentBox
      scope={{ TestElement, Field }}
      data-visual-test="layout-flex-container-divider"
    >
      <Layout.Card>
        <Layout.FlexContainer direction="vertical" divider="space">
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const LayoutHorizontalFlexGrowItems = () => {
  return (
    <ComponentBox>
      <Layout.Horizontal>
        <Layout.FlexItem size={3}>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem size={4}>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem size={5}>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
      </Layout.Horizontal>
    </ComponentBox>
  )
}
