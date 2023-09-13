import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'
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

export const Widths = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <P>No width (default)</P>
        <Layout.FlexContainer>
          <TestElement>Contents</TestElement>
        </Layout.FlexContainer>
        <P>Small</P>
        <Layout.FlexContainer width="small">
          <TestElement>Cont.</TestElement>
        </Layout.FlexContainer>
        <P>Medium</P>
        <Layout.FlexContainer width="medium">
          <TestElement>Contents</TestElement>
        </Layout.FlexContainer>
        <P>Large</P>
        <Layout.FlexContainer width="large">
          <TestElement>Contents</TestElement>
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const HorizontalWithFieldString = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="horizontal">
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" />
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

export const HorizontalWithCard = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="horizontal">
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
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
          <Field.String label="Label" value="Foo" />
          <Field.String label="Label" value="Foo" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const VerticalSpaceDivider = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <Layout.FlexContainer direction="vertical" divider="space">
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const VerticalLineDivider = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <Layout.FlexContainer direction="vertical" divider="line">
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const LayoutVerticalDefault = () => {
  return (
    <ComponentBox>
      <Layout.Vertical>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.Vertical>
    </ComponentBox>
  )
}

export const LayoutHorizontalDefault = () => {
  return (
    <ComponentBox>
      <Layout.Horizontal>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.Horizontal>
    </ComponentBox>
  )
}

export const LayoutHorizontalFlexGrowItems = () => {
  return (
    <ComponentBox>
      <Layout.Horizontal>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem grow>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem size={3}>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem size={4}>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
        <Layout.FlexItem size={5}>
          <Layout.Card>Card contents</Layout.Card>
        </Layout.FlexItem>
      </Layout.Horizontal>
    </ComponentBox>
  )
}
