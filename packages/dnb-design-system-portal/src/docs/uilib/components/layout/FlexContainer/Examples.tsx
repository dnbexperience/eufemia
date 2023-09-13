import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { Layout, P } from '@dnb/eufemia/src'
import { TestElement, Field } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
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
      </Layout.Card>
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

export const RowWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="row">
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

export const RowWithFlexItemJustifyCenter = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="row" justify="center">
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

export const RowWithFlexItemJustifyFlexEnd = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="row" justify="flex-end">
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

export const RowWithCard = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="row">
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
        <Layout.Card>FlexItem</Layout.Card>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const RowWithFieldString = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="row">
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" />
        <Field.String label="Label" value="Foo" />
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ColumnWithFlexItem = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="column">
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

export const ColumnWithCard = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.FlexContainer direction="column">
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
        <Layout.Card>Card contents</Layout.Card>
      </Layout.FlexContainer>
    </ComponentBox>
  )
}

export const ColumnWithFieldString = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <Layout.FlexContainer direction="column">
          <Field.String label="Label" value="Foo" />
          <Field.String label="Label" value="Foo" />
          <Field.String label="Label" value="Foo" />
          <Field.String label="Label" value="Foo" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const ColumnSpaceDivider = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <Layout.FlexContainer direction="column" divider="space">
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}

export const ColumnLineDivider = () => {
  return (
    <ComponentBox scope={{ TestElement, Field }}>
      <Layout.Card>
        <Layout.FlexContainer direction="column" divider="line">
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
          <Field.String label="Label" value="Value" />
        </Layout.FlexContainer>
      </Layout.Card>
    </ComponentBox>
  )
}
